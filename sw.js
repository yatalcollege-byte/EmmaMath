const CACHE = 'squishy-math-v10';
const FILES = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))); });
self.addEventListener('activate', event => event.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))])));
self.addEventListener('fetch', event => { if(event.request.mode === 'navigate'){event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));return;} event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
