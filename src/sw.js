const { assets } = global.serviceWorkerOption;

const CACHE_NAME = 'cache-v1'
const urlsToCache = [
  "/build.js",
]

function handleEventMessage (event) {

  if (event.type == 'install') {
    console.log('Servie Worker installed')
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      })
  } else if (event.type == 'activate') {
    console.log('Servie Worker actived')
  } else if (event.type == 'message') {
    console.log(event.data);
  }
}

self.addEventListener('install', handleEventMessage);
self.addEventListener('actived', handleEventMessage);
self.addEventListener('message', handleEventMessage);





