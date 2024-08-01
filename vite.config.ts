import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'dist',
  manifest: {
    name: 'gratitude note',
    short_name: 'gratitude note',
    description: 'simple gratitude note app',
    theme_color: '#1E293C',
    icons: [
      {
        src: '/assets/pwa/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/pwa/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/pwa/pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/assets/pwa/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  workbox: {
    globDirectory: 'dist/',
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
    swDest: 'dist/sw.js',
  },
})

export default defineConfig({
  plugins: [react(), vitePWA],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
