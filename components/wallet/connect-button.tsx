"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { LogOut } from "lucide-react";
import { trackWalletConnect } from "@/lib/analytics";
import { useMemo } from "react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { t } = useI18n();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground">{truncateAddress(address)}</span>
        <Button variant="ghost" size="sm" onClick={() => disconnect()}>
          <LogOut className="h-3 w-3 mr-1" />
          {t.common.disconnect}
        </Button>
      </div>
    );
  }

  // Filtrer les connecteurs pour éviter les doublons
  // Utiliser useMemo pour éviter les recalculs et garantir la stabilité
  const uniqueConnectors = useMemo(() => {
    const seenUids = new Set<string>();
    const seenNames = new Set<string>();
    const seenIds = new Set<string>();
    
    return connectors.filter((connector) => {
      // Exclure MetaMask
      if (connector.name === "MetaMask" || connector.name.toLowerCase().includes("metamask")) {
        return false;
      }
      
      // Vérifier les doublons par UID (plus fiable)
      if (seenUids.has(connector.uid)) {
        return false;
      }
      
      // Vérifier aussi par nom pour éviter les connecteurs avec le même nom mais UID différent
      // (cas où Brave pourrait détecter plusieurs instances du même wallet)
      const normalizedName = connector.name.toLowerCase().trim();
      if (seenNames.has(normalizedName)) {
        return false;
      }
      
      // Vérifier aussi par ID si disponible (certains connecteurs peuvent avoir un ID)
      if (connector.id && seenIds.has(connector.id)) {
        return false;
      }
      
      seenUids.add(connector.uid);
      seenNames.add(normalizedName);
      if (connector.id) {
        seenIds.add(connector.id);
      }
      
      return true;
    });
  }, [connectors]);

  // Si aucun connecteur unique, ne rien afficher
  if (uniqueConnectors.length === 0) {
    return null;
  }

  // Prendre seulement le premier connecteur pour éviter les doublons dans Brave
  // Si plusieurs connecteurs uniques sont détectés, on prend le premier
  const connectorToUse = uniqueConnectors[0];

  return (
    <Button
      key={connectorToUse.uid}
      onClick={() => {
        connect({ connector: connectorToUse });
        trackWalletConnect(connectorToUse.name);
      }}
      disabled={isPending}
      size="sm"
    >
      <>
        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {t.common.connect}
      </>
    </Button>
  );
}
