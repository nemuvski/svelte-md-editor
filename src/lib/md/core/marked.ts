import { marked } from 'marked'
import { removeTagText, escapeText } from './helpers'
import { customHighlight } from './highlight'

/**
 * マークダウンからHTMLへ変換する際に、pre,code要素の言語情報部分を分割するときの区切り文字
 */
const RENDERER_CODE_INFO_SPLIT_DELIMITER = ':'

/**
 * マークダウンからHTMLへ変換する際に、pre,code要素のその他情報を結合するときの区切り文字
 */
const RENDERER_CODE_INFO_JOIN_DELIMITER = ','

/**
 * レンダラーのカスタマイズ
 */
const customRenderer = new marked.Renderer()
// アンカータグに外部リンク用の属性を付与
customRenderer.link = (href, title, text) => {
  const url = (href ?? '').trim()
  const trimmedText = text.trim()
  let label = `<span>${trimmedText}</span>`
  // ラベルが文字で記された時(※1)は、URLを出力する
  // ※1 [サンプル](https://example.com) といったケース
  if (trimmedText !== url) {
    label = `${label}<small>(${url})</small>`
  }
  return `<a rel="noopener nofollow noreferrer" target="_blank" href="${url}">${label}</a>`
}

// デフォルトだと見出しタグにid属性が付与されるため、カスタムで定義
customRenderer.heading = (text, level) => {
  return `<h${level}>${text}</h${level}>`
}

// インラインのcode要素に属性を付与
customRenderer.codespan = (code) => {
  return `<code translate="no">${code}</code>`
}
// pre、またはcode要素に属性、クラスを付与
/** @see {@link https://github.com/markedjs/marked/blob/master/src/Renderer.js} をベースにオーバーライド */
customRenderer.code = function (code, info) {
  // 途中で空白が入っていない文字列を対象とする
  const targetInfoMatched = (info || '').match(/\S+/)
  const targetInfo = targetInfoMatched && targetInfoMatched.length ? targetInfoMatched[0] : ''

  // コードブロックで、言語情報以外にファイル名等を含めるようにする
  const splitInfo = targetInfo.split(RENDERER_CODE_INFO_SPLIT_DELIMITER)
  const lang = splitInfo.shift() || ''

  // 出力する内容を決定
  let outputText: string
  const highlightOutText = customHighlight(code, lang)
  if (highlightOutText != null && highlightOutText !== code) {
    outputText = highlightOutText
  } else {
    outputText = escapeText(highlightOutText)
  }

  // code要素のクラスを決定
  let codeClass = 'hljs '
  if (lang) {
    codeClass += `language-${escapeText(lang)}`
  }

  // 言語以外の箇所は結合して1つにまとめる
  const otherInfo = splitInfo.join(RENDERER_CODE_INFO_JOIN_DELIMITER)
  let otherInfoElement = ''
  if (otherInfo) {
    otherInfoElement = `<div class="code-frame-tips">${escapeText(otherInfo)}</div>`
  }

  return `<div class="code-frame" translate="no">${otherInfoElement}<pre class="code-frame-content js-code-content"><code class="js-code-content-body ${codeClass}">${outputText}</code></pre></div>`
}

/**
 * トークンツリーの後処理を定義
 *
 * @param token
 */
function customWalkTokens(token: marked.Token) {
  // HTMLの直打ちは空文字にする（内容を削除する）
  if (token.type === 'html') {
    if (token.text) {
      const textStrippedTag = removeTagText(token.text).trim()
      token.text = textStrippedTag
      token.raw = textStrippedTag
    }
  }
}

/**
 * markedの共通設定
 */
marked.setOptions({
  silent: true,
  renderer: customRenderer,
  walkTokens: customWalkTokens,

  // 1行の改行にbrタグを入れる
  breaks: true,
})

function markdownToHTMLText(mdText: string) {
  // NOTE: 末尾に改行コードが入るので、trim()で削除する
  return marked(mdText).trim()
}

export { markdownToHTMLText }
