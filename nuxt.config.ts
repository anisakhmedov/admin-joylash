// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/index.css'],
  app: {
    head: {
      title: 'Joylash,uz', // default fallback title
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  modules: [],
  plugins: ['~/plugins/axios.ts'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:6000/',
    }
  }
})