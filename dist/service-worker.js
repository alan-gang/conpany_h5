"use strict";var precacheConfig=[["index.html","d3bdc9292b21a989793d231b6559132b"],["service-worker.js","fac5564097b68f74163b2281a92c9923"],["static/cb.js","6722a16cbe0d1d26b9d849cdff2f2397"],["static/js/0.df4c31ffb15315b8beba.js","61748fe011fae12fde87f6def88c300a"],["static/js/1.e0d282a0b29ea3b735d6.js","e48dac4a4560f4f15a91b942e8fa56b3"],["static/js/2.e7ef7ec07aa4b148567a.js","cad00e8a7014a07874ae3606656d0d20"],["static/js/3.9888b39df54da9de15dd.js","ff8e760e1e6bad5c73640cf5288cf818"],["static/js/4.df187d188236086e9a7f.js","b83e849e61394801fa00599bca13189a"],["static/js/5.93607c2f70ebea5305a2.js","c3c18a920a99d627a76a081facae3af4"],["static/js/app.55034c62ebcf76fd286c.js","bb5dbca0b94ed83819d22702ea8b884f"],["static/js/manifest.d7d17eec6a44ec33d2a2.js","b0be62d0202b35755b9fb0ed53d6d244"],["static/r1.html","69bab935b3edada4ae700b41c060885d"],["static/register.html","c694aa495a8b02840543ffdc71a9b7c3"]],cacheName="sw-precache-v3-vue.xy.h5.pwa-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,!1);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});