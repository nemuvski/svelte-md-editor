import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isProductionMode = mode === 'production'
  const esbuildPure = isProductionMode ? ['console.log', 'console.info', 'console.debug', 'console.trace'] : undefined

  return {
    esbuild: {
      pure: esbuildPure,
    },
    plugins: [sveltekit()],
  }
})
