"use client";

import { useAccount, useSignMessage } from "wagmi";
import { Button } from "@/components/ui/button";
import { createSiweMessage } from "@/lib/siwe";
import { useI18n } from "@/lib/i18n-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackSiweAuth } from "@/lib/analytics";

export function SiweButton() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem(`siwe_${address}`);
      setIsAuthenticated(!!auth);
    }
  }, [address]);

  const handleSignIn = async () => {
    if (!address || !isConnected) return;

    setIsLoading(true);
    try {
      const domain = window.location.host;
      const origin = window.location.origin;
      const statement = locale === 'fr' 
        ? "Connectez-vous au Portail THP avec votre wallet Ethereum"
        : "Sign in to THP Portal with your Ethereum wallet";

      const message = createSiweMessage(address, statement, domain, origin);
      const messageToSign = message.prepareMessage();

      const signature = await signMessageAsync({
        message: messageToSign,
      });

      // Stocker la session localement
      localStorage.setItem(`siwe_${address}`, JSON.stringify({
        message: messageToSign,
        signature,
        address,
        timestamp: Date.now(),
      }));

      setIsAuthenticated(true);
      
      // Track l'authentification SIWE
      if (address) {
        trackSiweAuth(address);
      }
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la signature:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Button variant="outline" disabled size="sm">
        {locale === 'fr' ? 'Authentifié' : 'Authenticated'}
      </Button>
    );
  }

  return (
    <Button onClick={handleSignIn} disabled={isLoading} size="sm">
      {isLoading ? t.siwe.signing : t.siwe.signIn}
    </Button>
  );
}
