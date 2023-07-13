# Svelte Markdown Editor

Svelteで、簡単なマークダウンエディタを作ってみたサンプルプログラム。

以下のライブラリを用いた。

- `marked`
  - マークダウンからHTMLに変換
- `isomorphic-dompurify`
  - HTMLをサニタイズ

スタイリングは最低限にしかしていない。


## チェックポイント

- `src/lib/md/`
  - マークダウン関連の関数、コンポーネントを格納している。
  - テストコードも同梱している。
- `src/lib/md/core/`
  - コア部分は、マークダウンからHTML文字列への変換、サニタイズ等のコードがある。
  - ここは、Svelteに依存しないコードなので他のプロジェクトでも流用できる。（依存するサードパーティパッケージは導入する必要はある）
- `src/lib/md/core/marked.ts`
  - `marked`を使って、マークダウンからHTML文字列への変換をする際に、カスタムのレンダラーを定義している。（具体的な内容はコードを参照されたし）
    - `<a>` に `target="_blank"` を付与したり、 `rel` 属性をつけている。
    - `<code>` に `highlight.js` のために `class="language-xxx"` を付与している。（※`pre > code` コードブロックのみ対象）


## 確認方法

```bash
npm install
npm run dev
```
