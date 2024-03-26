
let chacheData = 'appV1'

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(chacheData).then((cache) => {
            cache.addAll([
                '/',
                '/static/js/bundle.js',
                'scipts/main.js',
                '/static/js/0.chunk.js',
                'index.html',
                '/styles/main.css',
                '/scripts/main.js',
            ])
        })
    )
})


this.addEventListener('fetch', (event) => {
   if (!navigator.onLine) {
    event.respondWith(
        caches.match(event.request).then((result) => {
            if (result) {
                return result
            }

        })
    )
   }
})






