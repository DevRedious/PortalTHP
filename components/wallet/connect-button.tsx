"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { LogOut } from "lucide-react";
import { MetaMaskLogo } from "@/components/ui/metamask-logo";

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

  // Filtrer les connecteurs pour éviter les doublons (priorité à MetaMask)
  const seenNames = new Set<string>();
  const uniqueConnectors = connectors.filter((connector) => {
    // Si MetaMask existe déjà, ignorer les autres instances
    if (connector.name === "MetaMask") {
      if (seenNames.has("MetaMask")) {
        return false;
      }
      seenNames.add("MetaMask");
      return true;
    }
    // Pour les autres connecteurs, vérifier les doublons par nom
    if (seenNames.has(connector.name)) {
      return false;
    }
    seenNames.add(connector.name);
    return true;
  });

  return (
    <div className="flex gap-1.5">
      {uniqueConnectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          size="sm"
        >
          {connector.name === "MetaMask" ? (
            <>
              <MetaMaskLogo className="h-3 w-3 mr-1" />
              MetaMask
            </>
          ) : (
            <>
              <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.common.connect}
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
