import adapter from '@sveltejs/adapter-static'
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
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true,
    }),
  },
}

export default config
