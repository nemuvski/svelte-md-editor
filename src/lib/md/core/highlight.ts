import hljs from 'highlight.js'

/**
 * highlight.jsを適用する
 *
 * @param code
 * @param lang
 */
function customHighlight(code: string, lang: string): string {
  return hljs.highlightAuto(code, [lang]).value
}

export { customHighlight }
