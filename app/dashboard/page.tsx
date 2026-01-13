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
import { ArrowLeft, X } from "lucide-react";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";
import { useI18n } from "@/lib/i18n-context";

export default function DashboardPage() {
  const { t } = useI18n();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
    // Vérifier l'authentification SIWE après le premier rendu
    if (typeof window !== "undefined") {
      setIsCheckingAuth(false);
    }
  }, []);

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

  // Attendre que la vérification d'authentification soit terminée
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t.common.loading}</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card border-border relative">
          <CardHeader className="pr-10">
            <CardTitle className="text-foreground">{t.dashboard.connectionRequired}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t.dashboard.connectionRequiredDescription}
            </CardDescription>
          </CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-6 w-6 p-0"
            onClick={() => router.push("/")}
            aria-label={t.common.cancel}
          >
            <X className="h-4 w-4" />
          </Button>
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
        <Card className="max-w-md bg-card border-border relative">
          <CardHeader className="pr-10">
            <CardTitle className="text-foreground">{t.dashboard.authRequired}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t.dashboard.authRequiredDescription}
            </CardDescription>
          </CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-6 w-6 p-0"
            onClick={() => router.push("/")}
            aria-label={t.common.cancel}
          >
            <X className="h-4 w-4" />
          </Button>
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
        {t.common.skipToContent}
      </a>
      <div className="container mx-auto px-4 py-8">
        <header 
          role="banner"
          className="flex justify-between items-center mb-6 border-b border-border/30 pb-3"
        >
          <div>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground mb-1 inline-flex items-center">
              <ArrowLeft className="h-3 w-3 mr-1.5" />
              {t.common.back}
            </Link>
            <h1 className="text-lg font-light text-foreground tracking-tight">{t.dashboard.myProfile}</h1>
            <p className="text-xs text-muted-foreground">
              {t.dashboard.manageProfile}
            </p>
          </div>
          <ConnectButton />
        </header>

        <Card className="bg-card border-border/30">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="text-sm font-normal text-foreground">{t.dashboard.profileInfo}</CardTitle>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-3 w-3 mr-1.5" />
                  {t.common.back}
                </Button>
              </Link>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              {t.dashboard.profileInfoDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">{t.common.loading}</p>
            ) : (
              <ProfileForm initialData={profile || undefined} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
