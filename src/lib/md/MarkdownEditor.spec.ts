import { render, screen, fireEvent } from '@testing-library/svelte'
import { describe, test, expect } from 'vitest'
import MarkdownEditor from './MarkdownEditor.svelte'

describe('MarkdownEditor.svelte', () => {
  test('入力するとマークダウンからHTMLへ変換され、レンダリング', async () => {
    render(MarkdownEditor)
    const textareaElements = screen.getAllByPlaceholderText('markdown text')

    // あることを確認
    expect(textareaElements).toBeTruthy()

    const textareaElement = textareaElements[0]

    await fireEvent.input(textareaElement, { target: { value: 'preview test' } })

    // NOTE: debounceを考慮
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve('ok')
      }, 850)
    )

    const previewElement = screen.getByText('preview test')

    // あることを確認
    expect(previewElement).toBeTruthy()
  })
})
