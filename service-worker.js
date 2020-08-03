importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
    console.log(`Workbox success loaded`);
}
else {
    console.log(`Workbox error`);
}

workbox.precaching.precacheAndRoute([
    { url: 'manifest.json', revision: '1' },
    { url: 'index.html', revision: '1' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/assets/scripts/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'scripts'
    })
);

workbox.routing.registerRoute(
    new RegExp('/assets/images'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'images'
    })
);

workbox.routing.registerRoute(
    new RegExp('/assets/styles'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'styles'
    })
);

workbox.routing.registerRoute(
    new RegExp('/component/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'component'
    })
);