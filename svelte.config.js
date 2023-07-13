import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

const isProductionMode = process.env.NODE_ENV === 'production'
const packageVersion = process.env.npm_package_version
/**
 * @see app.html バージョンのスタンプ
 */
process.env.PUBLIC_APP_VERSION = isProductionMode ? packageVersion : `${packageVersion}-${process.env.NODE_ENV}`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
  },

  trailingSlash: 'always',
}

export default config
