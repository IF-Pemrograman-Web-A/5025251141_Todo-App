self.addEventListener('install', (event) => {
    console.log('Service Worker terinstal.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker aktif.');
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