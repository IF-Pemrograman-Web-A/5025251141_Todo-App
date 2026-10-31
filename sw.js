const CACHE_NAME = 'todo-pwa-v6';
const ASSETS_TO_CACHE = [
    './index.php',
    './offline.php',
    './style.css',
    './script.js'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker terinstal.');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS_TO_CACHE.map((path) => {
                    return cache.add(path).catch((err) => {
                        console.log('Gagal cache:', path, err);
                    });
                })
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker aktif.');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if(!url.protocol.startsWith('http')){
        return;
    }

    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match('./offline.php') || caches.match('offline.php');
                })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {});
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data) {
        const { type, judul, desc } = event.data;
        
        let title = '';
        let options = {};

        if (type === 'NEW_TODO') {
            title = 'Todo Baru telah ditambahkan!';
            options = {
                body: `Judul: ${judul}\n${desc ? 'Deskripsi: ' + desc : 'Segera selesaikan tugasmu.'}`
            };
        } else if (type === 'REMINDER') {
            title = `Pengingat Tugas: ${judul}`;
            options = {
                body: desc || 'Waktunya mengerjakan tugas ini sesuai jadwal!'
            };
        }

        self.registration.showNotification(title, options);
    }
});