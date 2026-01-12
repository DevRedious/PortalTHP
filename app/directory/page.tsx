"use client";

import { useReadContract } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@/components/wallet/connect-button";
import Link from "next/link";
import { fetchProfile, getIPFSUrl } from "@/lib/ipfs";
import { useEffect, useState } from "react";
import type { ProfileIPFS } from "@/lib/schemas";
import { truncateAddress } from "@/lib/utils";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";

interface ProfileWithAddress {
  address: string;
  profile: ProfileIPFS | null;
  updatedAt: number;
}

export default function DirectoryPage() {
  const [profiles, setProfiles] = useState<ProfileWithAddress[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: profilesData } = useReadContract({
    address: getContractAddress(),
    abi: THP_PROFILE_REGISTRY_ABI,
    functionName: "getAllProfiles",
  });

  useEffect(() => {
    async function loadProfiles() {
      if (!profilesData) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const loadedProfiles = await Promise.all(
        profilesData.map(async (profileData: any) => {
          if (!profileData.isPublic || !profileData.profileURI) {
            return null;
          }

          const profile = await fetchProfile(profileData.profileURI);
          return {
            address: profileData.owner,
            profile,
            updatedAt: Number(profileData.updatedAt),
          };
        })
      );

      setProfiles(
        loadedProfiles.filter(
          (p): p is ProfileWithAddress => p !== null && p.profile !== null
        )
      );
      setLoading(false);
    }

    loadProfiles();
  }, [profilesData]);

  const filteredProfiles = profiles.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const profile = p.profile;
    if (!profile) return false;
    return (
      profile.firstName.toLowerCase().includes(query) ||
      profile.lastName.toLowerCase().includes(query) ||
      profile.department.toLowerCase().includes(query) ||
      profile.stackTags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-6 border-b border-border/30 pb-3">
          <div>
            <h1 className="text-lg font-light mb-1 text-foreground tracking-tight">Annuaire</h1>
            <p className="text-xs text-muted-foreground">
              Découvrez les développeurs de la promo THP
            </p>
          </div>
          <ConnectButton />
        </header>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground/60" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-7 text-xs"
            />
          </div>
        </div>

        {loading ? (
          <div 
            className="text-center py-12"
            aria-busy="true"
            aria-live="polite"
          >
            <p className="text-muted-foreground">Chargement des profils...</p>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery
                ? "Aucun profil ne correspond à votre recherche"
                : "Aucun profil disponible pour le moment"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map(({ address, profile }) => {
              if (!profile) return null;

              const avatarUrl = profile.avatarCID
                ? getIPFSUrl(profile.avatarCID)
                : null;

              return (
                <Link key={address} href={`/u/${address}`}>
                  <Card className="bg-card border-border/30 hover:border-border/50 transition-all cursor-pointer">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border/30">
                          <AvatarImage src={avatarUrl || undefined} />
                          <AvatarFallback className="bg-secondary/50 text-foreground text-xs">
                            {profile.firstName[0]}
                            {profile.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm font-normal text-foreground">
                            {profile.firstName} {profile.lastName}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">{profile.department}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {profile.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {profile.stackTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 bg-secondary/30 text-secondary-foreground rounded text-xs border border-border/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {profile.stackTags.length > 3 && (
                          <span className="px-1.5 py-0.5 text-xs text-muted-foreground/60">
                            +{profile.stackTags.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground/60">
                        {truncateAddress(address)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
