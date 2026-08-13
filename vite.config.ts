import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/newton-fisica/',
  plugins: [
    react(),
    VitePWA({
      // public/manifest.webmanifest já é servido estaticamente e referenciado no index.html.
      manifest: false,
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'fonts/*.woff2', 'icons/*.webp'],
      workbox: {
        // Roteamento é feito por hash (HashRouter), então todo deep-link já
        // aponta para index.html — não é preciso de navigateFallback de SPA.
        globPatterns: ['**/*.{js,css,html,woff2,webp,svg,png,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
