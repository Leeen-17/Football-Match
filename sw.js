
const CACHE_NAME = 'game-creator-v0.18-shell';

const APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key =>
              key.startsWith('game-creator-') &&
              key !== CACHE_NAME
            )
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Handle page navigation
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put('./index.html', copy));
          }

          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match('./index.html');

          if (cachedPage) return cachedPage;

          return new Response('Game Creator is offline.', {
            status: 503,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            }
          });
        })
    );

    return;
  }

  // Handle static resources
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;

        return fetch(request).then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, copy));
          }

          return response;
        });
      })
  );
});

