const CACHE_NAME = 'story-app-cache-v1';
const STATIC_ASSETS = [
  '/Finall/index.html',
  '/Finall/app.webmanifest',
  '/Finall/favicon.png',
  '/Finall/images/icon-192x192.png',
  '/Finall/images/icon-512x512.png',
  '/Finall/images/logo.png'
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
        return caches.match('/Finall/index.html');
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
    clients.openWindow('/Finall/')
  );
});
