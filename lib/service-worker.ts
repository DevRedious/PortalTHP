/**
 * Utilitaires pour gérer le Service Worker
 */

/**
 * Enregistre le Service Worker
 */
export function registerServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("[SW] Service Worker enregistré:", registration.scope);
      })
      .catch((error) => {
        console.error("[SW] Erreur lors de l'enregistrement:", error);
      });
  });
}

/**
 * Vérifie si le Service Worker est actif
 */
export function isServiceWorkerSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
}
