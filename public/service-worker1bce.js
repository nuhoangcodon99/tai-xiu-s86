var mapFileUrl = 'https://play.s86.club/files.json';

fetch(mapFileUrl, {
  headers: {
    'Accept': 'application/json'
  }
})
  .then(function (data) {
    data.json()        
    .then(function(json) {
      var CACHE_NAME = 'assets-game-cache';
    
      self.addEventListener('install', function (event) {
        // Perform install steps
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(function (cache) {
              return cache.addAll(json);
            })
        );
      });
      
      self.addEventListener('fetch', function (event) {
        console.log(event);
        event.respondWith(
          caches.match(event.request)
            .then(function (response) {
              // Cache hit - return response
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
            )
        );
      });
    })
    .catch(function(e){
      console.log(e);
    });

  })
  .catch(function (error) {
    console.log('Request failed', error);
  });