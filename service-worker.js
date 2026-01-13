self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("tradeup-cache").then(cache => {
      return cache.addAll([
        "/phonetreadeup/",
        "/phonetreadeup/index.html",
        "/phonetreadeup/styles.css",
        "/phonetreadeup/app.js",
        "/phonetreadeup/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
