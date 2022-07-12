const CACHE_NAME = "mac_inifinity_1.0.0";

self.addEventListener("fetch", function (event) {
  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request);
        var cache = await caches.open("cache");
        cache.put(event.request.url, res.clone());
        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});

const URLS = [
  // Add URL you want to cache in this list.
  // '/',                     // If you have separate JS/CSS files, add path to those files here
  // "/index.html",
  // "/assets/index/css/main.css",
  // "/assets/index/js/main.js",
  // "/coupon.html",
  // "/assets/coupon/reset.css",
  // "/assets/coupon/coupon.css",
  // "/assets/coupon/coupon.js",
  // "/assets/favicon.png",
  // "/assets/manifest.json",
];

// Cache resources
/* self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log("installing cache : " + CACHE_NAME);
        return cache.addAll(URLS);
      })
      .then((_) => {
        return self.skipWaiting();
      })
  );
}); */

// Respond with cached resources
/* self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
}); */

// Delete outdated caches
/* self.addEventListener("activate", function (e) {
  self.caches.keys().then((keys) => {
    keys.forEach((key) => console.log(key));
  });

  e.waitUntil(
    caches
      .keys()
      .then(function (keyList) {
        // `keyList` contains all cache names under your username.github.io
        // filter out ones that has this app prefix to create white list
        var cacheWhitelist = keyList.filter(function (key) {
          return key.indexOf("mac_inifinity");
        });
        // add current cache name to white list

        return Promise.all(
          keyList.map(function (key, i) {
            if (cacheWhitelist.indexOf(key) === -1) {
              console.log("deleting cache : " + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
      .then(function () {
        clients.claim();
      })
  );
});
 */
