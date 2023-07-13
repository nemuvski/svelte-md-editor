import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    // disabling Svelte's hot module reload when tests are running
    svelte({ hot: !process.env.VITEST }),
  ],
  test: {
    environment: 'jsdom',
    globals: false,
    passWithNoTests: false,
    include: ['**/*.spec.{ts,js}'],
  },
})
