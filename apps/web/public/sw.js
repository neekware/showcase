if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    a[s] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[n]) return;
    let t = {};
    const f = (e) => s(e, n),
      d = { module: { uri: n }, exports: t, require: f };
    a[n] = Promise.all(i.map((e) => d[e] || f(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-d25a3628'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'd58113a364e68ccf26a1e837c421ab6d' },
        {
          url: '/_next/static/3G4s2JJA3ygp469I-5n5X/_buildManifest.js',
          revision: '5c0169e3b2397975e45a264d48066bb7',
        },
        {
          url: '/_next/static/3G4s2JJA3ygp469I-5n5X/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/0b99b5de-898ff18bf7cb652d.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        { url: '/_next/static/chunks/349-4c77d00cad537678.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        { url: '/_next/static/chunks/440-8167fe15d9f8ecd3.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        { url: '/_next/static/chunks/623-fcd0364ebdd646ab.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        { url: '/_next/static/chunks/657-ec946c9f82b48dbc.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        { url: '/_next/static/chunks/72-4233920517f262e6.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        {
          url: '/_next/static/chunks/a55dab97-c2d885575980816a.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-1bc1d586a47ae4c4.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/about/page-2a003069e11de630.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-a29f92cac393161e.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/dash/page-5b574c1b71da0f88.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/layout-cb1fa555efe6c552.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/more/page-82907c28ada824df.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/not-found-3565ab7982228d4d.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/page-5e4dc851587d8337.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/app/products/page-4c7f668db56807dd.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/framework-bef83a85c94ff7de.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        { url: '/_next/static/chunks/main-8fb645cf365c00de.js', revision: '3G4s2JJA3ygp469I-5n5X' },
        {
          url: '/_next/static/chunks/main-app-0da28deb24afc063.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/pages/_app-c979557f9163ea0b.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/pages/_error-f2430dab87781a20.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-17efdb9d3d8ecfd5.js',
          revision: '3G4s2JJA3ygp469I-5n5X',
        },
        { url: '/_next/static/css/9dff97656f14197a.css', revision: '9dff97656f14197a' },
        {
          url: '/_next/static/media/03b685511c0eaac3-s.woff2',
          revision: '46fec8ec22bfe84a9182cfecb0fe3fb6',
        },
        {
          url: '/_next/static/media/04fe87c30c4f76ea-s.woff2',
          revision: '472e8a7f3368235d9d26d7d10f094ff2',
        },
        {
          url: '/_next/static/media/05a31a2ca4975f99-s.woff2',
          revision: 'f1b44860c66554b91f3b1c81556f73ca',
        },
        {
          url: '/_next/static/media/0e4fe491bf84089c-s.p.woff2',
          revision: '5e22a46c04d947a36ea0cad07afcc9e1',
        },
        {
          url: '/_next/static/media/101c7b68f2d8b610-s.woff2',
          revision: 'b5808b612c74810455a8c3b0575bf540',
        },
        {
          url: '/_next/static/media/1c57ca6f5208a29b-s.woff2',
          revision: '491a7a9678c3cfd4f86c092c68480f23',
        },
        {
          url: '/_next/static/media/1e8103c5d17beb1d-s.woff2',
          revision: '6e5e6b35f2164d0e19ba31634d926ae5',
        },
        {
          url: '/_next/static/media/34dd45dcdd6d47ee-s.woff2',
          revision: '4061e1fa6aa9a45d49aa1737d2826560',
        },
        {
          url: '/_next/static/media/3a04115668d8070d-s.p.woff2',
          revision: 'd83f1599340e8afa7a36461059a80b81',
        },
        {
          url: '/_next/static/media/3dbd163d3bb09d47-s.woff2',
          revision: '93dcb0c222437699e9dd591d8b5a6b85',
        },
        {
          url: '/_next/static/media/513657b02c5c193f-s.woff2',
          revision: 'c4eb7f37bc4206c901ab08601f21f0f2',
        },
        {
          url: '/_next/static/media/51ed15f9841b9f9d-s.woff2',
          revision: 'bb9d99fb9bbc695be80777ca2c1c2bee',
        },
        {
          url: '/_next/static/media/5647e4c23315a2d2-s.woff2',
          revision: 'e64969a373d0acf2586d1fd4224abb90',
        },
        {
          url: '/_next/static/media/699512af39861afa-s.p.woff2',
          revision: 'd998caa1048cad4c89e26a9d3fcab2ee',
        },
        {
          url: '/_next/static/media/7be645d133f3ee22-s.woff2',
          revision: '3ba6fb27a0ea92c2f1513add6dbddf37',
        },
        {
          url: '/_next/static/media/7c53f7419436e04b-s.woff2',
          revision: 'fd4ff709e3581e3f62e40e90260a1ad7',
        },
        {
          url: '/_next/static/media/86fdec36ddd9097e-s.p.woff2',
          revision: '1a5f20725a57243f64429b25b5f24075',
        },
        {
          url: '/_next/static/media/8fb72f69fba4e3d2-s.woff2',
          revision: '7a2e2eae214e49b4333030f789100720',
        },
        {
          url: '/_next/static/media/912a9cfe43c928d9-s.woff2',
          revision: '376ffe2ca0b038d08d5e582ec13a310f',
        },
        {
          url: '/_next/static/media/91a88e0c5dd21dfa-s.woff2',
          revision: '9663a3dcc4d93b27554c25c2c537a6f0',
        },
        {
          url: '/_next/static/media/934c4b7cb736f2a3-s.p.woff2',
          revision: '1f6d3cf6d38f25d83d95f5a800b8cac3',
        },
        {
          url: '/_next/static/media/9b67ab375515cd6f-s.woff2',
          revision: '0ded8b4ff2f6a2b1f0a8420b92a6b969',
        },
        {
          url: '/_next/static/media/9cf7d128be063d32-s.woff2',
          revision: 'bcc892f3fa0e651a3a2795103f72d85b',
        },
        {
          url: '/_next/static/media/9e58c89b9633dcad-s.woff2',
          revision: '566f7796dca987bfa0ca16389bbcfb4d',
        },
        {
          url: '/_next/static/media/a1ab2e69d2f53384-s.woff2',
          revision: 'c73422f422632560946874b11671ded7',
        },
        {
          url: '/_next/static/media/a3c201c07e8eb753-s.woff2',
          revision: 'fb08c969e6d9dd50cfd2645eb60ac166',
        },
        {
          url: '/_next/static/media/b6db722c6886c2cd-s.woff2',
          revision: '1019108d9fe09d5ae4b3affb185f8656',
        },
        {
          url: '/_next/static/media/baf12dd90520ae41-s.woff2',
          revision: '8096f9b1a15c26638179b6c9499ff260',
        },
        {
          url: '/_next/static/media/bbdb6f0234009aba-s.woff2',
          revision: '5756151c819325914806c6be65088b13',
        },
        {
          url: '/_next/static/media/c4a41ea065a0023c-s.woff2',
          revision: '06e8ee29490189c118050515c65e7d20',
        },
        {
          url: '/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2',
          revision: '74c3556b9dad12fb76f84af53ba69410',
        },
        {
          url: '/_next/static/media/cff529cd86cc0276-s.woff2',
          revision: 'c2b2c28b98016afb2cb7e029c23f1f9f',
        },
        {
          url: '/_next/static/media/d6b16ce4a6175f26-s.woff2',
          revision: 'dd930bafc6297347be3213f22cc53d3e',
        },
        {
          url: '/_next/static/media/de2ba2ebf355004e-s.woff2',
          revision: '207eff257cb1b3c0007a30cda723a750',
        },
        {
          url: '/_next/static/media/e195dd2ded485df3-s.woff2',
          revision: '920bd6d4ea896998f763e38d705bedb7',
        },
        {
          url: '/_next/static/media/e25729ca87cc7df9-s.woff2',
          revision: '9a74bbc5f0d651f8f5b6df4fb3c5c755',
        },
        {
          url: '/_next/static/media/e35c7314ac518ddc-s.woff2',
          revision: 'ea21fa4f9e2ee9025409672d7750c45b',
        },
        {
          url: '/_next/static/media/ec159349637c90ad-s.woff2',
          revision: '0e89df9522084290e01e4127495fae99',
        },
        {
          url: '/_next/static/media/ee7e17a7bdd8636b-s.woff2',
          revision: '47403e44df9ec7ef982ce9249b195f64',
        },
        {
          url: '/_next/static/media/f06116e890b3dadb-s.woff2',
          revision: '2855f7c90916c37fe4e6bd36205a26a8',
        },
        {
          url: '/_next/static/media/fd4db3eb5472fc27-s.woff2',
          revision: '71f3fcaf22131c3368d9ec28ef839831',
        },
        { url: '/android-chrome-192x192.png', revision: 'ded746ddacbcaf4b046bc92b41f95667' },
        { url: '/android-chrome-512x512.png', revision: 'f24037fe22dadc7eb63b13ff3e9f2d18' },
        { url: '/apple-touch-icon.png', revision: 'a1e91c1fa5e99b4777c1667fe86514d4' },
        { url: '/browserconfig.xml', revision: 'a493ba0aa0b8ec8068d786d7248bb92c' },
        { url: '/favicon-16x16.png', revision: '3816a732debb874adcdd17e96a3c945c' },
        { url: '/favicon-32x32.png', revision: '75786b95378b9fa29becb2a08adc7c67' },
        { url: '/favicon.ico', revision: '0608a5239e11732d884e4f25084037b1' },
        { url: '/favicon.png', revision: '75786b95378b9fa29becb2a08adc7c67' },
        { url: '/icon-192x192.png', revision: 'cd66c8e094053c395669767cae909b96' },
        { url: '/icon-256x256.png', revision: '84efb689d719c2ba4b46d36180e41d10' },
        { url: '/icon-384x384.png', revision: 'b792c54bb08f12ec15fe5d41182db39f' },
        { url: '/icon-512x512.png', revision: '940a29fb820353cb2f9a73ef8c7531fb' },
        { url: '/manifest.webmanifest', revision: '07b77c889d99272af0a5eee30b333e7a' },
        { url: '/mstile-150x150.png', revision: '3fe0b713939e4e4dbe033a2207d1aa22' },
        { url: '/safari-pinned-tab.svg', revision: '70fad668a7ba590ed629cc17f41e60c1' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: i }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
