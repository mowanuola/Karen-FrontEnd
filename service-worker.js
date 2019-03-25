let staticCacheName = 'karen-static-v1';
let contentImgsCache = 'karen-content-imgs';
let allCaches = [staticCacheName, contentImgsCache];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'about',
        'bmicalc',
        'dcc',
        'mealplanner',
        'profile',
        'signup',
        'login',
        'js/app.js',
        'js/bmi.js',
        'js/dci.js',
        'js/login.js',
        'js/mealplanner.js',
        'js/profile.js',
        'js/register.js',
        'css/styles.css',
        'images/icons/icon-128x128.png',
        'images/icons/icon-72x72.png',
        'images/icons/icon-96x96.png',
        'font/Montserrat-Medium.ttf',
      ]);
    }),
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName.startsWith('karen-') && !allCaches.includes(cacheName);
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
});

self.addEventListener('fetch', function(event) {
  let requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/img/')) {
      event.respondWith(servePhoto(event.request));
      return;
    } else {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        }),
      );
    }
  } else {
    event.respondWith(fetch(event.request));
  }
});

function servePhoto(request) {
  let storageUrl = request.url;

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}
