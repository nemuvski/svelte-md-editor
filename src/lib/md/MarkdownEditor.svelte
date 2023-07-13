<script lang="ts">
  import debounce from 'just-debounce-it'
  import { sanitizeHTMLText, marked } from './core'

  let previewValue = ''

  const textareaInputHandler = debounce((e) => {
    previewValue = sanitizeHTMLText(marked(e.target.value))
  }, 800)
</script>

<div class="md">
  <textarea class="md__textarea" placeholder="markdown text" on:input={textareaInputHandler}></textarea>
  <div class="md__preview">
    <!-- NOTE: サニタイズした値を出力しているため、eslintの警告は無視 -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html previewValue}
  </div>
</div>

<style>
  .md {
    display: flex;
    min-height: 100vh;
  }

  .md__textarea {
    flex: 1;
    padding: 1rem;
    resize: none;
    border: none;
    background-color: var(--theme-color--textarea);
  }

  .md__preview {
    flex: 1;
    padding: 1rem;
  }
</style>
