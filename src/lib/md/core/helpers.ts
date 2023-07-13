/**
 * エスケープする文字を判定する正規表現
 */
const regexpEscape = /[&<>"']/

/**
 * テキストのエスケープで利用
 *
 * @see {escapeText()}
 */
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}
type EscapeReplacementsKey = keyof typeof escapeReplacements

/**
 * テキストのエスケープ
 *
 * @param text
 * @see {@link https://github.com/markedjs/marked/blob/master/src/helpers.js} escape()
 */
function escapeText(text: string) {
  if (regexpEscape.test(text)) {
    return text.replace(
      new RegExp(regexpEscape.source, 'g'),
      (key: string) => escapeReplacements[key as EscapeReplacementsKey]
    )
  }
  return text
}

/**
 *
 *
 * @param str
 */
function removeTagText(str: string) {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
}

export { removeTagText, escapeText }
