const allFormatAndLintFiles = '*.{ts,tsx,mts,js,jsx,mjs,json,html}'

export default {
  '*.{ts,tsx,mts,js,jsx,mjs,json,html}': ['yarn format:file', 'yarn lint:file --fix'],
  [`!${allFormatAndLintFiles}`]: ['yarn format:file'],
  '*.{ts,tsx}': () => 'yarn tsc --noEmit',
}
