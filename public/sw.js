if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3zYGGL2qLJagZ81UwDkCk/_buildManifest.js",revision:"59ae6546ed014725f7d1ca5a13afebaa"},{url:"/_next/static/3zYGGL2qLJagZ81UwDkCk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/228-9ffdc83a1dcb6bfc.js",revision:"9ffdc83a1dcb6bfc"},{url:"/_next/static/chunks/664-8af8765c6fed5950.js",revision:"8af8765c6fed5950"},{url:"/_next/static/chunks/74-525b1db6095e0da9.js",revision:"525b1db6095e0da9"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-a0e24809ce57b885.js",revision:"a0e24809ce57b885"},{url:"/_next/static/chunks/pages/_app-8c0b3d45966e919b.js",revision:"8c0b3d45966e919b"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/area/%5Barea%5D-57c7fd494ed726da.js",revision:"57c7fd494ed726da"},{url:"/_next/static/chunks/pages/area/%5Barea%5D/genre/%5Bgenre%5D-d4316b932b811d39.js",revision:"d4316b932b811d39"},{url:"/_next/static/chunks/pages/genre/%5Bgenre%5D-58123d6a7eb10e30.js",revision:"58123d6a7eb10e30"},{url:"/_next/static/chunks/pages/index-f2162ec6e66e42e0.js",revision:"f2162ec6e66e42e0"},{url:"/_next/static/chunks/pages/login-9d4fb7e12d97af4b.js",revision:"9d4fb7e12d97af4b"},{url:"/_next/static/chunks/pages/mypage-fac023ccd2292ba1.js",revision:"fac023ccd2292ba1"},{url:"/_next/static/chunks/pages/search-7cf28ac0a1ed3830.js",revision:"7cf28ac0a1ed3830"},{url:"/_next/static/chunks/pages/signup-b4898b977060469b.js",revision:"b4898b977060469b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6ef43a8d4a395f49.js",revision:"6ef43a8d4a395f49"},{url:"/_next/static/css/26dcb44a877a1d41.css",revision:"26dcb44a877a1d41"},{url:"/android-chrome-192x192.png",revision:"4bfa43683340e1e7b9339dba241e0e30"},{url:"/apple-touch-icon.png",revision:"59189f616c4873536b5f2e4f40f24841"},{url:"/favicon.ico",revision:"d10fa7d8a5bb1e91c17566efda47d017"},{url:"/icon-192x192.png",revision:"21ece4864e36060229eff3f3530481b4"},{url:"/icon-384x384.png",revision:"ed6c93186aa70be17296a626e4146166"},{url:"/icon-512x512.png",revision:"afcf42aaca05abb705bb5c09578dfae5"},{url:"/manifest.json",revision:"325e57b0fff78799741349902d385dd2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/ogp_large.png",revision:"0965f284e96c3e4b30c7a7331edfdd76"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
