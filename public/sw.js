/**
 * Service Worker pour le cache offline
 * Cache les ressources statiques et les profils IPFS récemment consultés
 */

const CACHE_NAME = 'portal-thp-v1';
const STATIC_CACHE = 'portal-thp-static-v1';
const IPFS_CACHE = 'portal-thp-ipfs-v1';

// Ressources à mettre en cache au démarrage
const STATIC_ASSETS = [
  '/',
  '/directory',
  '/dashboard',
  '/offline', // Page de fallback offline
];

// Installer le service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activer le service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== IPFS_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

// Intercepter les requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ne pas mettre en cache les requêtes vers les APIs analytics
  if (
    url.hostname.includes('plausible.io') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com')
  ) {
    return;
  }

  // Cache pour les ressources IPFS (gateways)
  if (
    url.hostname.includes('ipfs') ||
    url.hostname.includes('pinata.cloud') ||
    url.hostname.includes('w3s.link') ||
    url.hostname.includes('dweb.link')
  ) {
    event.respondWith(
      caches.open(IPFS_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              // Mettre en cache uniquement les réponses réussies
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // En cas d'erreur, retourner une réponse par défaut
              return new Response('Ressource non disponible hors ligne', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
              });
            });
        });
      })
    );
    return;
  }

  // Cache pour les ressources statiques
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request)
          .then((response) => {
            // Ne pas mettre en cache les réponses non réussies
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // En cas d'erreur réseau, retourner la page offline
            if (request.mode === 'navigate') {
              return caches.match('/offline');
            }
            return new Response('Ressource non disponible hors ligne', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      })
    );
  }
});
