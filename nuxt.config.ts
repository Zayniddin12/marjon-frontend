// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,

  app: {
    pageTransition: { name: 'page-change-page', mode: 'out-in' },
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'W2WKcmup0fPKjkcYazZKkTF3eYbFNScG8SbJFJAyaLs',
        },
        {
          name: 'yandex-verification',
          content: '1b04e105fc6d00c9',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Marjon',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/favicon.svg`,
        },
        {
          rel: 'canonical',
          href: 'https://marjon.uz',
        },
      ],
      script: [
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5NBVW8LZ');`,
        },
      ],
    },
  },

  css: [
    '~/assets/fonts/fonts.css',
    '~/assets/style.css',
    '~/assets/_transitions.css',
    '~/assets/tailwind.css',
    '~/assets/icommon/style.css',
    '~/assets/toastofication.css',
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    'nuxt-gtag',
    'vue-yandex-maps/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  sitemap: [
    {
      path: '/sitemap.xml',
      hostname: 'https://marjon.uz',
      gzip: true,
      exclude: ['/about', '/news/**'],
      defaults: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      },
    },
  ],

  robots: {
    mergeWithRobotsTxtPath: '/robots.txt',
  },

  i18n: {
    langDir: 'locales',
    baseUrl: 'https://marjon.uz/',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru',
        name: 'Русский',
        flag: '/images/svg/flag/russian.svg',
      },
      {
        code: 'uz',
        iso: 'uz-UZ',
        file: 'uz',
        name: "O'zbekcha",
        flag: '/images/svg/flag/uz.svg',
      },
    ],
    lazy: true,
    useCookie: true,
    cookieKey: 'i18n_redirected',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'uz',
      cookieCrossOrigin: true,
    },
    defaultLocale: 'uz',
    strategy: 'prefix_except_default',
  },

  yandexMaps: {
    apikey: process.env.YANDEX_API_KEY,
  },

  nitro: {
    serveStatic: true,
    compressPublicAssets: true,
  },

  build: {
    transpile: ['vue-toastification'],
  },

  devServer: {
    port: 3003,
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },

  gtag: {
    id: 'GTM-5NBVW8LZ',
  },

  compatibilityDate: '2024-08-02'
})