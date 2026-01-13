"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { I18nProvider } from "@/lib/i18n-context";
import { LangWrapper } from "@/components/lang-wrapper";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes pour les données IPFS
            gcTime: 10 * 60 * 1000, // 10 minutes de cache (anciennement cacheTime)
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
      })
  );

  return (
    <I18nProvider>
      <LangWrapper>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster 
              position="top-right" 
              richColors 
              closeButton
              toastOptions={{
                classNames: {
                  toast: "bg-card border border-border/30 text-foreground",
                  title: "text-foreground",
                  description: "text-muted-foreground",
                  error: "bg-destructive/10 border-destructive/30",
                  success: "bg-green-500/10 border-green-500/30",
                  warning: "bg-yellow-500/10 border-yellow-500/30",
                  info: "bg-blue-500/10 border-blue-500/30",
                },
              }}
            />
          </QueryClientProvider>
        </WagmiProvider>
      </LangWrapper>
    </I18nProvider>
  );
}
