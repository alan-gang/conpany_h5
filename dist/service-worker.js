"use strict";var precacheConfig=[["index.html","e6ff8e0ea83377ee250e21c6ec7de784"],["service-worker.js","7ef67970b1ddaa449faf036a08e22d9f"],["static/cb.js","6722a16cbe0d1d26b9d849cdff2f2397"],["static/js/0.48b136c3df74faf1393a.js","332f5c6529f2c44e9fd219dcae109d5d"],["static/js/1.e0d282a0b29ea3b735d6.js","e48dac4a4560f4f15a91b942e8fa56b3"],["static/js/2.3d7d2893f11c0fdabdb8.js","724927026862e658e06025ffa700c3f3"],["static/js/3.9888b39df54da9de15dd.js","ff8e760e1e6bad5c73640cf5288cf818"],["static/js/4.df187d188236086e9a7f.js","b83e849e61394801fa00599bca13189a"],["static/js/5.93607c2f70ebea5305a2.js","c3c18a920a99d627a76a081facae3af4"],["static/js/app.825a97fb1b6899846c59.js","17129135e7951d055ba04a83e07bb730"],["static/js/manifest.6f8b55ed30d18754b479.js","0eb1add228a0b526b5be35af11dd5cc5"],["static/r1.html","69bab935b3edada4ae700b41c060885d"],["static/register.html","c694aa495a8b02840543ffdc71a9b7c3"]],cacheName="sw-precache-v3-vue.xy.h5.pwa-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});