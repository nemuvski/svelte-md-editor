import { describe, test, expect } from 'vitest'
import { sanitizeHTMLText } from './dompurify'

describe('dompurify.ts', () => {
  test('sanitizeHTMLText()', () => {
    expect(sanitizeHTMLText(`<script>alert("test")</script>`)).toBe('')
    expect(sanitizeHTMLText(`<unknown></unknown>`)).toBe('')

    expect(sanitizeHTMLText(`<span></span>`)).toBe(`<span></span>`)
    expect(sanitizeHTMLText(`<div></div>`)).toBe(`<div></div>`)
    expect(sanitizeHTMLText(`<p></p>`)).toBe(`<p></p>`)
    expect(sanitizeHTMLText(`<br />`)).toBe(`<br>`)
    expect(sanitizeHTMLText(`<br>`)).toBe(`<br>`)
    expect(sanitizeHTMLText(`<h1></h1><h2></h2><h3></h3><h4></h4><h5></h5><h6></h6>`)).toBe(
      `<h1></h1><h2></h2><h3></h3><h4></h4><h5></h5><h6></h6>`
    )
    expect(sanitizeHTMLText(`<a rel="noopener" target="_blank" href="https://example.com/"></a>`)).toBe(
      `<a href="https://example.com/" target="_blank" rel="noopener"></a>`
    )
    expect(sanitizeHTMLText(`<hr />`)).toBe(`<hr>`)
    expect(sanitizeHTMLText(`<hr>`)).toBe(`<hr>`)
    expect(sanitizeHTMLText(`<del></del>`)).toBe(`<del></del>`)
    expect(sanitizeHTMLText(`<strong></strong>`)).toBe(`<strong></strong>`)
    expect(sanitizeHTMLText(`<em></em>`)).toBe(`<em></em>`)
    expect(sanitizeHTMLText(`<ul><li></li></ul>`)).toBe(`<ul><li></li></ul>`)
    expect(sanitizeHTMLText(`<ol><li></li></ol>`)).toBe(`<ol><li></li></ol>`)
    expect(sanitizeHTMLText(`<blockquote></blockquote>`)).toBe(`<blockquote></blockquote>`)
    expect(sanitizeHTMLText(`<pre><code></code></pre>`)).toBe(`<pre><code></code></pre>`)
    expect(sanitizeHTMLText(`<small></small>`)).toBe(`<small></small>`)

    expect(sanitizeHTMLText(`<p translate="no"></p>`)).toBe(`<p translate="no"></p>`)
    expect(sanitizeHTMLText(`<p class="test"></p>`)).toBe(`<p class="test"></p>`)

    expect(sanitizeHTMLText(`<p data-test="test"></p>`)).toBe(`<p></p>`)
  })
})
