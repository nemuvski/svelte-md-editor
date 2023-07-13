import { sanitize } from 'isomorphic-dompurify'
import type { Config } from 'isomorphic-dompurify'

const config: Config = {
  WHOLE_DOCUMENT: false,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  // 許可する属性
  ALLOWED_ATTR: ['rel', 'target', 'href', 'class', 'translate'],
  // 許可するタグ
  ALLOWED_TAGS: [
    'span',
    'div',
    'p',
    'br',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'hr',
    'del',
    'strong',
    'em',
    'ul',
    'ol',
    'li',
    'blockquote',
    'code',
    'pre',
    'small',
  ],
  // aria属性は許可しない
  ALLOW_ARIA_ATTR: false,
  // data属性は許可しない
  ALLOW_DATA_ATTR: false,
  // カスタム要素は許可しない
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: null,
    attributeNameCheck: null,
    allowCustomizedBuiltInElements: false,

  },
  /**
   * @see {@link https://github.com/cure53/DOMPurify/issues/288}
   */
  IN_PLACE: true,
}

/**
 * 引数のHTML文字列をサニタイジングした結果を返却する
 *
 * @param dirtyHtmlText
 * @returns string
 */
function sanitizeHTMLText(dirtyHtmlText: string) {
  return sanitize(dirtyHtmlText, config) as string
}

export { sanitizeHTMLText }
