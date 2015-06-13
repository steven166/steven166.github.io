importScripts('js/serviceworker-cache-polyfill.js');

self.addEventListener('install', function (event) {
    // pre cache a load of stuff:
    event.waitUntil(
        cachesPolyfill.open('myapp-static-v1').then(function (cache) {
            return cache.addAll([
                '/'
                //'/activities/',
                //'/js/_app.js',
                //'/js/_init.js',
                //'/images/',
                //'../../shared/images/icons/',
                //'../../shared/css/icons/',
                //'../../shared/css/paper-bundle.css',
                //'../../shared/js/jquery.min.js',
                //'../../shared/js/paper-bundle.js'
            ]);
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        cachesPolyfill.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});