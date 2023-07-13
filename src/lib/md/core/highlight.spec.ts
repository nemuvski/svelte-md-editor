import { describe, test, expect } from 'vitest'
import { customHighlight } from './highlight'

describe('helpers.ts', () => {
  test('customHighlight()', () => {
    expect(customHighlight(`const hoge = 'me too'`, 'ts')).toBe(
      `<span class="hljs-keyword">const</span> hoge = <span class="hljs-string">&#x27;me too&#x27;</span>`
    )
  })
})
