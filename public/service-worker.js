const cacheName = "DudesPWA";
const resouses = [
  "/",
  "/dashboard",
  "/settings",
  "index.html",
  "offline.html",
  "offline.js",
  "bundle.js",
  "bundle.css",
  "assets/icons/icon-512x512.png",
  "assets/icons/icon-192x192.png",
  "assets/icons/icon-256x256.png",
  "assets/icons/icon-384x384.png",
  "favicon/apple-icon-144x144.png",
  "manifest.json"
];

const handleProductsReqest = (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(r);
      console.log('[Service Worker] Fetching resource: '+e.request.url);

      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });

    })
  );
}

self.addEventListener('install', (e) => {
  console.log(`Service worker installing`);

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resouses);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e =>{
  if (e.request.url === "http://localhost:8000/api/products") {
    return handleProductsReqest(e)
  } else if (e.request.url === "http://localhost:8000/api/products") {
    return handleProductsReqest(e);
  }
});