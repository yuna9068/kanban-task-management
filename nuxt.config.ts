import process from 'node:process'

const path = process.env.NODE_ENV === 'development' ? '/' : '/kanban-task-management/'

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
          additionalData: `
            @use "sass:math";
            @import "~/assets/style/config/index.scss";
          `,
        },
      },
    },
  },
  app: {
    baseURL: path,
    buildAssetsDir: '/static/',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: `${path}favicon.ico`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: `${path}favicon-32x32.png`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: `${path}favicon-16x16.png`,
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: `${path}apple-touch-icon.png`,
        },
        {
          rel: 'manifest',
          href: 'manifest.json',
        },
        {
          rel: 'canonical',
          href: 'https://yuna9068.github.io/kanban-task-management/',
        },
      ],
      meta: [
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: '#FFFFFF',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#2B2C37',
        },
        {
          name: 'description',
          content: 'This is a solution to the Kanban task management web app challenge on Frontend Mentor.',
        },
        {
          name: 'keywords',
          content: 'Kanban, Task, Management, Frontend Mentor',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:description',
          content: 'This is a solution to the Kanban task management web app challenge on Frontend Mentor.',
        },
        {
          property: 'og:image',
          content: 'https://raw.githubusercontent.com/yuna9068/kanban-task-management/main/docs/screenshot/index-light.png',
        },
        {
          property: 'og:url',
          content: 'https://yuna9068.github.io/kanban-task-management/',
        },
      ],
    },
  },
})
