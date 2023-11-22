// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/style/reset.css',
    '~/assets/style/main.scss',
  ],
  modules: [
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Plus Jakarta Sans': {
        wght: [500, 700],
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/style/config/index.scss";',
        },
      },
    },
  },
})
