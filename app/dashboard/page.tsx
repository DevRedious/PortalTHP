"use client";

import { useAccount } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@/components/wallet/connect-button";
import { SiweButton } from "@/components/wallet/siwe-button";
import { ProfileForm } from "@/components/profile/profile-form";
import { useReadContract } from "wagmi";
import { fetchProfile } from "@/lib/ipfs";
import { useEffect, useState } from "react";
import type { Profile } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: profileData } = useReadContract({
    address: getContractAddress(),
    abi: THP_PROFILE_REGISTRY_ABI,
    functionName: "getProfile",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    // Vérifier l'authentification SIWE
    if (typeof window !== "undefined" && address) {
      const auth = localStorage.getItem(`siwe_${address}`);
      if (!auth) {
        // Rediriger vers la page d'accueil si non authentifié
        router.push("/");
      }
    }
  }, [address, router]);

  useEffect(() => {
    async function loadProfile() {
      if (!address || !profileData?.profileURI) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedProfile = await fetchProfile(profileData.profileURI);
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      }
      setLoading(false);
    }

    loadProfile();
  }, [address, profileData]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Connexion requise</CardTitle>
            <CardDescription className="text-muted-foreground">
              Veuillez connecter votre wallet pour accéder au dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!address) {
    return null;
  }

  // Vérifier l'authentification SIWE
  const isAuthenticated =
    typeof window !== "undefined" && !!localStorage.getItem(`siwe_${address}`);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Authentification requise</CardTitle>
            <CardDescription className="text-muted-foreground">
              Veuillez vous authentifier avec SIWE pour accéder au dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SiweButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="container mx-auto px-4 py-8">
        <header 
          role="banner"
          className="flex justify-between items-center mb-6 border-b border-border/30 pb-3"
        >
          <div>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground mb-1 inline-flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1.5" />
              Retour
            </Link>
            <h1 className="text-lg font-light text-foreground tracking-tight">Mon Profil</h1>
            <p className="text-xs text-muted-foreground">
              Gérez votre carte profil décentralisée
            </p>
          </div>
          <ConnectButton />
        </header>

        <Card className="bg-card border-border/30">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="text-sm font-normal text-foreground">Informations du profil</CardTitle>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-3 w-3 mr-1.5" />
                  Retour
                </Button>
              </Link>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              Votre profil est stocké sur IPFS et lié à votre adresse Ethereum
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              <ProfileForm initialData={profile || undefined} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
