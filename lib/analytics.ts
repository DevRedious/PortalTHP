/**
 * Système d'analytics pour le Portail THP
 * Supporte Plausible Analytics et Google Analytics
 */

type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean>;
};

/**
 * Envoie un événement analytics
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const { name, props } = event;

  // Plausible Analytics
  if (window.plausible) {
    window.plausible(name, { props });
  }

  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", name, props);
  }

  // Log pour développement
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, props);
  }
}

/**
 * Track la création d'un profil
 */
export function trackProfileCreated(address: string): void {
  trackEvent({
    name: "profile_created",
    props: {
      address: address.slice(0, 10), // Anonymisé
    },
  });
}

/**
 * Track une recherche dans l'annuaire
 */
export function trackSearch(query: string, resultsCount: number): void {
  trackEvent({
    name: "search",
    props: {
      query_length: query.length,
      results_count: resultsCount,
    },
  });
}

/**
 * Track la visualisation d'un profil
 */
export function trackProfileView(address: string): void {
  trackEvent({
    name: "profile_view",
    props: {
      address: address.slice(0, 10), // Anonymisé
    },
  });
}

/**
 * Track la connexion wallet
 */
export function trackWalletConnect(connector: string): void {
  trackEvent({
    name: "wallet_connect",
    props: {
      connector,
    },
  });
}

/**
 * Track l'authentification SIWE
 */
export function trackSiweAuth(address: string): void {
  trackEvent({
    name: "siwe_auth",
    props: {
      address: address.slice(0, 10), // Anonymisé
    },
  });
}

// Types pour les objets globaux
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}
