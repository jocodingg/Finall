const CACHE_NAME = 'story-app-cache-v1';
const STATIC_ASSETS = [
  '/Deploy/index.html',
  '/Deploy/manifest.webmanifest',
  '/Deploy/favicon.png',
  '/Deploy/images/icon-192x192.png',
  '/Deploy/images/icon-512x512.png',
  '/Deploy/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(err => {
      console.error('Gagal install cache:', err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/Deploy/index.html');
      });
    })
  );
});

self.addEventListener('push', function (event) {
  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'Notifikasi',
      options: { body: 'Push message received.' }
    };
  }

  const { title, options } = data;

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/Deploy/')
  );
});
