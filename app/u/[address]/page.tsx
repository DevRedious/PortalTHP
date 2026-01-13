"use client";

import { useParams } from "next/navigation";
import { useReadContract } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@/components/wallet/connect-button";
import { fetchProfile, getIPFSUrl } from "@/lib/ipfs";
import { useEffect, useState } from "react";
import type { ProfileIPFS } from "@/lib/schemas";
import { truncateAddress, formatDate } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Github, Linkedin, MessageCircle, Copy, Check } from "lucide-react";
import Link from "next/link";
import { isAddress } from "viem";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";
import { generateProfileSchema } from "@/lib/seo";
import { trackProfileView } from "@/lib/analytics";
import { toast } from "sonner";

export default function ProfilePage() {
  const params = useParams();
  const address = params.address as string;
  const [profile, setProfile] = useState<ProfileIPFS | null>(null);
  const [loading, setLoading] = useState(true);
  const [discordCopied, setDiscordCopied] = useState(false);

  const isValidAddress = isAddress(address);

  const { data: profileData } = useReadContract({
    address: getContractAddress(),
    abi: THP_PROFILE_REGISTRY_ABI,
    functionName: "getProfile",
    args: isValidAddress ? [address as `0x${string}`] : undefined,
    query: {
      enabled: isValidAddress,
    },
  });

  useEffect(() => {
    async function loadProfile() {
      if (!isValidAddress || !profileData?.profileURI) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedProfile = await fetchProfile(profileData.profileURI);
      setProfile(fetchedProfile);
      setLoading(false);

      // Track la visualisation du profil
      if (fetchedProfile) {
        trackProfileView(address);
      }
    }

    loadProfile();
  }, [address, profileData, isValidAddress]);

  if (!isValidAddress) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Adresse invalide</CardTitle>
            <CardDescription className="text-muted-foreground">
              L&apos;adresse Ethereum fournie n&apos;est pas valide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/directory">
              <Button>Retour à l&apos;annuaire</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avatarUrl = profile?.avatarCID
    ? getIPFSUrl(profile.avatarCID)
    : null;

  // Générer le Schema.org JSON-LD
  const schemaJson = profile
    ? generateProfileSchema(profile, address)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      )}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="container mx-auto px-4 py-8">
        <header 
          role="banner"
          className="flex justify-between items-center mb-6 border-b border-border/30 pb-3"
        >
          <Link
            href="/directory"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5" />
            Retour à l&apos;annuaire
          </Link>
          <ConnectButton />
        </header>

        <main id="main-content" role="main" aria-label="Profil utilisateur">
          {loading ? (
            <div 
              className="text-center py-12"
              aria-busy="true"
              aria-live="polite"
              role="status"
            >
              <p className="text-muted-foreground">Chargement du profil...</p>
            </div>
          ) : !profile ? (
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Profil non trouvé</CardTitle>
              <CardDescription className="text-muted-foreground">
                Aucun profil n&apos;a été trouvé pour cette adresse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Adresse: {truncateAddress(address)}
              </p>
              <Link href="/directory">
                <Button>Retour à l&apos;annuaire</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto bg-card border-border/30">
            <CardHeader className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border border-border/30">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="text-lg bg-secondary/50 text-foreground">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg font-light mb-1 text-foreground tracking-tight">
                    {profile.firstName} {profile.lastName}
                  </CardTitle>
                  <CardDescription className="text-xs mb-3 text-muted-foreground">
                    {profile.department}
                    {profile.age && ` • ${profile.age} ans`}
                  </CardDescription>
                  <div className="flex gap-1.5">
                    {profile.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {profile.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile.discord && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (!profile.discord) return;
                          try {
                            await navigator.clipboard.writeText(profile.discord);
                            setDiscordCopied(true);
                            toast.success("Discord copié !", {
                              description: `${profile.discord} a été copié dans le presse-papier`,
                            });
                            setTimeout(() => setDiscordCopied(false), 2000);
                          } catch (error) {
                            toast.error("Erreur", {
                              description: "Impossible de copier le texte Discord",
                            });
                          }
                        }}
                        aria-label={`Copier ${profile.discord} dans le presse-papier`}
                      >
                        {discordCopied ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {profile.discord}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div>
                <h3 className="text-xs font-normal mb-1.5 text-foreground">À propos</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{profile.bio}</p>
              </div>

              {profile.stackTags.length > 0 && (
                <div>
                  <h3 className="text-xs font-normal mb-1.5 text-foreground">Stack technique</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.stackTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground rounded text-xs border border-border/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-normal mb-1.5 text-foreground">Disponibilité</h3>
                <span
                  className={`px-2 py-0.5 rounded text-xs border ${
                    profile.availability === "available"
                      ? "bg-secondary/30 text-muted-foreground border-border/20"
                      : profile.availability === "busy"
                      ? "bg-secondary/20 text-muted-foreground border-border/20"
                      : "bg-secondary/10 text-muted-foreground border-border/20"
                  }`}
                >
                  {profile.availability === "available"
                    ? "Disponible"
                    : profile.availability === "busy"
                    ? "Occupé"
                    : "Indisponible"}
                </span>
              </div>

              <div className="pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground/60">
                  Adresse Ethereum: {truncateAddress(address)}
                </p>
                {profile.updatedAt && (
                  <p className="text-xs text-muted-foreground/60">
                    Dernière mise à jour: {formatDate(new Date(profile.updatedAt))}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          )}
        </main>
      </div>
    </div>
  );
}
