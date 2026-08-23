const CACHE_NAME = 'energy-diary-v2';
const ASSETS = [
  './',
  './index.html',
  './index.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  const requestUrl = event.request.url;
  if (event.request.method !== 'GET' || requestUrl.includes('/api/data')) {
    return;
  }
  event.respondWith(
    fetch(event.request).then(function (response) {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});
