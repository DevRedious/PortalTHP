"use client";

import Script from "next/script";

/**
 * Composant pour charger les scripts analytics
 * Supporte Plausible Analytics et Google Analytics
 */
export function AnalyticsScript() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* Plausible Analytics */}
      {plausibleDomain && (
        <Script
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}

      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
