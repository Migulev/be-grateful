import path from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/config/vitest-setup.js'],
    coverage: {
      include: ['src/**/*'],
      exclude: [
        '**/__tests__/**',
        '**/*.d.ts',
        '**/index.ts',
        '**/main.tsx',
        '**/app-loader.tsx',
        '**/shared/**',
      ],
      ignoreEmptyLines: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
