"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConnectButton } from "@/components/wallet/connect-button";
import Link from "next/link";
import { getIPFSUrl } from "@/lib/ipfs";
import { truncateAddress } from "@/lib/utils";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { trackSearch } from "@/lib/analytics";
import { generateDirectorySchema } from "@/lib/seo";
import { useI18n } from "@/lib/i18n-context";
import { useProfileRefs, type ProfileWithAddress } from "@/lib/use-profiles";
import { Filters, type FilterState } from "@/components/directory/filters";
import { filterAndSortProfiles, extractDepartments, extractStackTags } from "@/lib/profile-filters";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/lib/ipfs";

const BATCH_SIZE = 20; // Nombre de profils à charger par batch
const INITIAL_BATCHES = 2; // Nombre de batches à charger initialement

interface ProfileCardProps {
  profile: ProfileWithAddress;
}

function ProfileCard({ profile }: ProfileCardProps) {
  const { t } = useI18n();
  
  if (!profile.profile) return null;

  const avatarUrl = profile.profile.avatarCID
    ? getIPFSUrl(profile.profile.avatarCID)
    : null;

  return (
    <article>
      <Link href={`/u/${profile.address}`} className="block">
        <Card className="bg-card border-border/30 hover:border-border/50 transition-all cursor-pointer h-full">
          <CardHeader className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border/30">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-secondary/50 text-foreground text-xs">
                  {profile.profile.firstName[0]}
                  {profile.profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-normal text-foreground">
                  {profile.profile.firstName} {profile.profile.lastName}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {profile.profile.department}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {profile.profile.bio}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {profile.profile.stackTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-secondary/30 text-secondary-foreground rounded text-xs border border-border/20"
                >
                  {tag}
                </span>
              ))}
              {profile.profile.stackTags.length > 3 && (
                <span className="px-1.5 py-0.5 text-xs text-muted-foreground/60">
                  +{profile.profile.stackTags.length - 3}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground/60">
              {truncateAddress(profile.address)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}

export default function DirectoryPage() {
  const { t, locale } = useI18n();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: "",
    availability: "",
    stackTag: "",
    sort: "updated-desc",
  });

  const [loadedBatches, setLoadedBatches] = useState<number>(INITIAL_BATCHES);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Charger les références de profils
  const { data: profileRefs = [], isLoading: refsLoading } = useProfileRefs();

  // Charger les profils par batch avec React Query
  const batchesToLoad = Math.min(loadedBatches, Math.ceil(profileRefs.length / BATCH_SIZE));
  
  const batchQueries = useQuery({
    queryKey: ["profiles-batch", profileRefs, batchesToLoad],
    queryFn: async () => {
      const batches = [];
      for (let i = 0; i < batchesToLoad; i++) {
        const startIndex = i * BATCH_SIZE;
        const endIndex = Math.min(startIndex + BATCH_SIZE, profileRefs.length);
        const batch = profileRefs.slice(startIndex, endIndex);

        const profilesPromises = batch.map(async (ref) => {
          try {
            const profile = await fetchProfile(ref.profileURI);
            return {
              address: ref.address,
              profile,
              updatedAt: ref.updatedAt,
              profileURI: ref.profileURI,
            } as ProfileWithAddress;
          } catch {
            return null;
          }
        });

        const profiles = (await Promise.all(profilesPromises)).filter(
          (p): p is ProfileWithAddress => p !== null && p.profile !== null
        );
        batches.push(...profiles);
      }
      return batches;
    },
    enabled: profileRefs.length > 0 && !refsLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Mémoriser loadedProfiles pour éviter les nouvelles références à chaque rendu
  const loadedProfiles = useMemo(() => {
    return batchQueries.data || [];
  }, [batchQueries.data]);

  // Filtrer et trier les profils
  const filteredProfiles = useMemo(() => {
    return filterAndSortProfiles(loadedProfiles, filters);
  }, [loadedProfiles, filters]);

  // Extraire les départements et tags disponibles
  const availableDepartments = useMemo(
    () => extractDepartments(loadedProfiles),
    [loadedProfiles]
  );
  const availableStackTags = useMemo(
    () => extractStackTags(loadedProfiles),
    [loadedProfiles]
  );

  // Observer pour charger plus de profils au scroll
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !batchQueries.isLoading) {
          const totalBatches = Math.ceil(profileRefs.length / BATCH_SIZE);
          if (loadedBatches < totalBatches) {
            setLoadedBatches((prev) => Math.min(prev + 1, totalBatches));
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [batchQueries.isLoading, profileRefs.length, loadedBatches]);

  // Track les recherches
  useEffect(() => {
    if (filters.search && !refsLoading) {
      trackSearch(filters.search, filteredProfiles.length);
    }
  }, [filters.search, filteredProfiles.length, refsLoading]);

  // Générer le Schema.org JSON-LD
  const schemaJson = generateDirectorySchema(filteredProfiles.length);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <a href="#main-content" className="skip-link">
        {t.common.skipToContent}
      </a>
      <div className="container mx-auto px-4 py-8">
        <header
          role="banner"
          className="flex justify-between items-center mb-6 border-b border-border/30 pb-3"
        >
          <div>
            <h1 className="text-lg font-light mb-1 text-foreground tracking-tight">
              {t.directory.title}
            </h1>
            <p className="text-xs text-muted-foreground">{t.directory.subtitle}</p>
          </div>
          <ConnectButton />
        </header>

        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          availableDepartments={availableDepartments}
          availableStackTags={availableStackTags}
        />

        <main id="main-content" role="main" aria-label="Liste des profils">
          {refsLoading || batchQueries.isLoading ? (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-busy="true"
              aria-live="polite"
              role="status"
              aria-label={t.directory.loadingProfiles}
            >
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card border-border/30">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <div className="flex gap-1.5">
                      <Skeleton className="h-5 w-16 rounded" />
                      <Skeleton className="h-5 w-20 rounded" />
                      <Skeleton className="h-5 w-14 rounded" />
                    </div>
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="text-center py-12" role="status">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
              <p className="text-muted-foreground">
                {filters.search || filters.department || filters.availability || filters.stackTag
                  ? t.directory.noResults
                  : t.directory.noProfiles}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-xs text-muted-foreground">
                {filteredProfiles.length}{" "}
                {filteredProfiles.length > 1
                  ? t.directory.profilesFoundPlural
                  : t.directory.profilesFound}
              </div>
              <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
                aria-label={`${filteredProfiles.length} ${filteredProfiles.length > 1 ? t.directory.profilesFoundPlural : t.directory.profilesFound}`}
              >
                {filteredProfiles.map((profile) => (
                  <div key={profile.address} role="listitem">
                    <ProfileCard profile={profile} />
                  </div>
                ))}
              </div>
              {/* Observer target pour charger plus de profils */}
              {loadedBatches * BATCH_SIZE < profileRefs.length && (
                <div ref={observerTarget} className="h-20 flex items-center justify-center">
                  {batchQueries.isLoading && (
                    <div className="text-xs text-muted-foreground">
                      {t.directory.loading || t.common.loading}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
