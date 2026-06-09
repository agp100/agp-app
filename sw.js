const CACHE = "agp-v3";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "./agp-logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Install: cache all core assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
