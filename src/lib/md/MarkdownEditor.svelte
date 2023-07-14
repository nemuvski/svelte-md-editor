<script lang="ts">
  import 'highlight.js/styles/hybrid.css'
  import './styles/article.scss'
  import debounce from 'just-debounce-it'
  import { sanitizeHTMLText, markdownToHTMLText } from './core'

  let previewValue = ''

  const textareaInputHandler = debounce((event: Event) => {
    const { value } = event.target as HTMLTextAreaElement
    previewValue = sanitizeHTMLText(markdownToHTMLText(value))
  }, 800)
</script>

<div class="md">
  <textarea class="md__textarea" placeholder="markdown text" on:input={textareaInputHandler} />
  <div class="md__preview article" role="article">
    <!-- NOTE: サニタイズした値を出力しているため、eslintの警告は無視 -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html previewValue}
  </div>
</div>

<style lang="scss">
  .md {
    display: flex;
    height: 100vh;
  }

  .md__textarea {
    flex-grow: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
    resize: none;
    border: none;
    background-color: var(--theme-color--textarea);
  }

  .md__preview {
    flex-grow: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
