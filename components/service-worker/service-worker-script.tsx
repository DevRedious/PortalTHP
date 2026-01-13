"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/service-worker";

/**
 * Composant pour enregistrer le Service Worker
 */
export function ServiceWorkerScript() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
