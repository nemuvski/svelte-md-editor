import { describe, test, expect } from 'vitest'
import { escapeText, removeTagText } from './helpers'

describe('helpers.ts', () => {
  test('escapeText()', () => {
    expect(escapeText('test')).toBe('test')
    expect(escapeText("'test'")).toBe('&#39;test&#39;')
    expect(escapeText('&test')).toBe('&amp;test')
    expect(escapeText('<test>')).toBe('&lt;test&gt;')
    expect(escapeText('"test')).toBe('&quot;test')
  })

  test('removeTagText()', () => {
    expect(removeTagText('test')).toBe('test')
    expect(removeTagText('<button onclick="alert()">test</button>')).toBe('test')
    expect(removeTagText('<p aria-label="test"><script>console.log()</script></p>')).toBe('console.log()')
    expect(removeTagText('<BODY     ><div>he<br />llo</div>\nte<br>st</BODY     >')).toBe('hello\ntest')
    expect(removeTagText('<B_O_D_Y><d-i-v>test</d-i-v>test</B_O_D_Y>')).toBe('testtest')
    expect(removeTagText('<p data-html=hello>test</p>')).toBe('test')
    expect(removeTagText("<p data-html='<div><span>hello</span></div>'>test</p>")).toBe('test')
    expect(removeTagText('<p>test<div aria-label="<script>alert();</script>">test</div></p>')).toBe('testtest')
    expect(removeTagText("<p>test<div aria-label='<script>alert();</script>'>test</div></p>")).toBe('testtest')
  })
})
