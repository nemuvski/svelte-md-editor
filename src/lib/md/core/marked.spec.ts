import { describe, test, expect } from 'vitest'
import { markdownToHTMLText } from './marked'

describe('marked.ts', () => {
  describe('markdownToHTMLText()', () => {
    test('pタグ', () => {
      expect(markdownToHTMLText('test')).toBe('<p>test</p>')
      expect(markdownToHTMLText('test\n\ntest')).toBe('<p>test</p>\n<p>test</p>')
      expect(markdownToHTMLText('<p>test</p>')).toBe('test')
      expect(markdownToHTMLText('<p>hello<div aria-label="<i>test</i>">test</div></p>')).toBe('hellotest')
    })

    test('spanタグ', () => {
      expect(markdownToHTMLText('<span>test</span>')).toBe('<p>test</p>')
    })

    test('brタグ', () => {
      expect(markdownToHTMLText('test\ntest')).toBe('<p>test<br>test</p>')
      expect(markdownToHTMLText('test\r\ntest')).toBe('<p>test<br>test</p>')
    })

    test('h1タグ', () => {
      expect(markdownToHTMLText('# test')).toBe('<h1>test</h1>')
      expect(markdownToHTMLText('<h1>test</h1>')).toBe('test')
    })

    test('h2タグ', () => {
      expect(markdownToHTMLText('## test')).toBe('<h2>test</h2>')
      expect(markdownToHTMLText('<h2>test</h2>')).toBe('test')
    })

    test('h3タグ', () => {
      expect(markdownToHTMLText('### test')).toBe('<h3>test</h3>')
      expect(markdownToHTMLText('<h3>test</h3>')).toBe('test')
    })

    test('h4タグ', () => {
      expect(markdownToHTMLText('#### test')).toBe('<h4>test</h4>')
      expect(markdownToHTMLText('<h4>test</h4>')).toBe('test')
    })

    test('h5タグ', () => {
      expect(markdownToHTMLText('##### test')).toBe('<h5>test</h5>')
      expect(markdownToHTMLText('<h5>test</h5>')).toBe('test')
    })

    test('h6タグ', () => {
      expect(markdownToHTMLText('###### test')).toBe('<h6>test</h6>')
      expect(markdownToHTMLText('<h6>test</h6>')).toBe('test')
    })

    test('aタグ', () => {
      expect(markdownToHTMLText('[  test  ](  https://example.com/  )')).toBe(
        '<p><a rel="noopener nofollow noreferrer" target="_blank" href="https://example.com/"><span>test</span><small>(https://example.com/)</small></a></p>'
      )
      expect(markdownToHTMLText('*[test](https://example.com/)*')).toBe(
        '<p><em><a rel="noopener nofollow noreferrer" target="_blank" href="https://example.com/"><span>test</span><small>(https://example.com/)</small></a></em></p>'
      )
      expect(markdownToHTMLText('https://example.com/')).toBe(
        '<p><a rel="noopener nofollow noreferrer" target="_blank" href="https://example.com/"><span>https://example.com/</span></a></p>'
      )
      expect(markdownToHTMLText('<a onclick="alert()">test</a>')).toBe('<p>test</p>')
    })

    test('hrタグ', () => {
      expect(markdownToHTMLText('---')).toBe('<hr>')
      expect(markdownToHTMLText('***')).toBe('<hr>')
      expect(markdownToHTMLText('------')).toBe('<hr>')
      expect(markdownToHTMLText('--- ---')).toBe('<hr>')
      expect(markdownToHTMLText('- ---')).toBe('<hr>')
      expect(markdownToHTMLText('-')).toBe('<ul>\n<li></li>\n</ul>')
      expect(markdownToHTMLText('--')).toBe('<p>--</p>')
      expect(markdownToHTMLText('- a ---')).toBe('<ul>\n<li>a ---</li>\n</ul>')
      expect(markdownToHTMLText('<hr>')).toBe('')
    })

    test('delタグ', () => {
      expect(markdownToHTMLText('~~test~~')).toBe('<p><del>test</del></p>')
      expect(markdownToHTMLText('<p>~~test~~</p>')).toBe('~~test~~')
      expect(markdownToHTMLText('<del>test</del>')).toBe('<p>test</p>')
    })

    test('strongタグ', () => {
      expect(markdownToHTMLText('**test**')).toBe('<p><strong>test</strong></p>')
      expect(markdownToHTMLText('***test***')).toBe('<p><em><strong>test</strong></em></p>')
      expect(markdownToHTMLText('__test__')).toBe('<p><strong>test</strong></p>')
      expect(markdownToHTMLText('___test___')).toBe('<p><em><strong>test</strong></em></p>')
      expect(markdownToHTMLText('____test____')).toBe('<p><strong><strong>test</strong></strong></p>')
      expect(markdownToHTMLText('<p>**test**</p>')).toBe('**test**')
      expect(markdownToHTMLText('<strong>test</strong>')).toBe('<p>test</p>')
    })

    test('emタグ', () => {
      expect(markdownToHTMLText('*test*')).toBe('<p><em>test</em></p>')
      expect(markdownToHTMLText('_test_')).toBe('<p><em>test</em></p>')
      expect(markdownToHTMLText('<em>test</em>')).toBe('<p>test</p>')
    })

    test('ulタグ & liタグ', () => {
      expect(markdownToHTMLText('- test\n- ok')).toBe('<ul>\n<li>test</li>\n<li>ok</li>\n</ul>')
      expect(markdownToHTMLText('- test\nok')).toBe('<ul>\n<li>test<br>ok</li>\n</ul>')
      expect(markdownToHTMLText('- test\n  - ok')).toBe('<ul>\n<li>test<ul>\n<li>ok</li>\n</ul>\n</li>\n</ul>')
    })

    test('olタグ & liタグ', () => {
      expect(markdownToHTMLText('1. test\n2. ok')).toBe('<ol>\n<li>test</li>\n<li>ok</li>\n</ol>')
      expect(markdownToHTMLText('1. test\nok')).toBe('<ol>\n<li>test<br>ok</li>\n</ol>')
      expect(markdownToHTMLText('1. test\n  - ok')).toBe('<ol>\n<li>test</li>\n</ol>\n<ul>\n<li>ok</li>\n</ul>')
    })

    test('blockquoteタグ', () => {
      expect(markdownToHTMLText('> test')).toBe('<blockquote>\n<p>test</p>\n</blockquote>')
      expect(markdownToHTMLText('> test\n>> hello')).toBe(
        '<blockquote>\n<p>test</p>\n<blockquote>\n<p>hello</p>\n</blockquote>\n</blockquote>'
      )
    })

    test('codeタグ', () => {
      expect(markdownToHTMLText('hello `world`')).toBe('<p>hello <code translate="no">world</code></p>')
      expect(markdownToHTMLText('hello **`world`**')).toBe(
        '<p>hello <strong><code translate="no">world</code></strong></p>'
      )
    })

    test('preタグ', () => {
      expect(markdownToHTMLText('```\nconst hello = "world"\n```')).toBe(
        '<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs ">const hello = &quot;world&quot;</code></pre></div>'
      )

      // highlight.jsが反映されているかを確認する
      expect(markdownToHTMLText('```js\nconst hello = "world"\n```')).toBe(
        `<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js"><span class="hljs-keyword">const</span> hello = <span class="hljs-string">&quot;world&quot;</span></code></pre></div>`
      )
      expect(markdownToHTMLText('```js:sample.js\nhello\n```')).toBe(
        `<div class="code-frame" translate="no"><div class="code-frame-tips">sample.js</div><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js">hello</code></pre></div>`
      )
      expect(markdownToHTMLText('```js :sample.js\nhello\n```')).toBe(
        `<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js">hello</code></pre></div>`
      )
      expect(markdownToHTMLText('```  js :sample.js\nhello\n```')).toBe(
        `<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js">hello</code></pre></div>`
      )
      expect(markdownToHTMLText('```  js:sample.js\nhello\n```')).toBe(
        '<div class="code-frame" translate="no"><div class="code-frame-tips">sample.js</div><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js">hello</code></pre></div>'
      )
      expect(markdownToHTMLText('```  js&sample.js\nhello\n```')).toBe(
        '<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js&amp;sample.js">hello</code></pre></div>'
      )
      expect(markdownToHTMLText('```  js"sample.js"\nhello\n```')).toBe(
        '<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-js&quot;sample.js&quot;">hello</code></pre></div>'
      )
      expect(markdownToHTMLText('```ts\nconst hello: string | null = "world"\n```')).toBe(
        `<div class="code-frame" translate="no"><pre class="code-frame-content js-code-content"><code class="js-code-content-body hljs language-ts"><span class="hljs-keyword">const</span> <span class="hljs-attr">hello</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> = <span class="hljs-string">&quot;world&quot;</span></code></pre></div>`
      )
    })

    test('buttonタグ & onclick属性', () => {
      expect(markdownToHTMLText('<button onclick="alert()">test</button>')).toBe('<p>test</p>')
    })

    test('imgタグ', () => {
      expect(markdownToHTMLText('<img src="/test.png" alt="test">')).toBe('')
      expect(markdownToHTMLText('![test](/test.png)')).toBe('<p><img src="/test.png" alt="test"></p>')
    })

    test('divタグ', () => {
      expect(markdownToHTMLText('<div>test</div>')).toBe('test')
    })

    test('inputタグ', () => {
      expect(markdownToHTMLText('<input type="text" />')).toBe('')
    })

    test('textareaタグ', () => {
      expect(markdownToHTMLText('<textarea></textarea>')).toBe('')
    })

    test('scriptタグ', () => {
      expect(markdownToHTMLText('<sript type="javascript">test</sript>')).toBe('<p>test</p>')
    })

    test('aria属性', () => {
      expect(markdownToHTMLText('<p aria-label="test">test</p>')).toBe('test')
    })

    test('data属性', () => {
      expect(markdownToHTMLText('<p data-hoge="test">test</p>')).toBe('test')
    })
  })
})
