/**
 * Service Worker para la PWA "Roma: Guía & Álbum de Viaje"
 * Estrategia Offline-First completa:
 * - Pre-caché de App Shell, manifest e iconos PNG/SVG.
 * - Caché dedicada para teselas de OpenStreetMap (con soporte tanto para respuestas CORS como opacas).
 * - Stale-While-Revalidate para JS, CSS y tipografías autoalojadas.
 */

const CACHE_NAME = 'roma-pwa-v2.0';
const TILE_CACHE_NAME = 'roma-map-tiles-v2';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== TILE_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Caché dedicada para teselas de OpenStreetMap (permite ver el mapa offline)
  if (url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('basemaps.cartocdn.com')) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Navegación HTML: Network-First con fallback a index.html en caché
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Archivos estáticos, fuentes y recursos: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (
            response &&
            (response.status === 200 || response.type === 'opaque') &&
            (response.type === 'basic' || response.type === 'cors')
          ) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkFetch;
    })
  );
});
