// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  testDir: './vitest-test', // テストディレクトリを指定
  test: {
    globals: true,          // Jest の `global` API をサポート
    environment: 'jsdom',   // DOM 環境をエミュレート
  },
})

