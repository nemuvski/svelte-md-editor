module.exports = {
  useTabs: false,
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  arrowParens: 'always',
  endOfLine: 'lf',

  // Svelte-specific options
  plugins: ['prettier-plugin-svelte'],
  // pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
