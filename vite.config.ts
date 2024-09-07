import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'HLViewer',
      fileName: (format) => (format === 'es' ? 'hlviewer.js' : 'hlviewer.min.js'),
      formats: ['es', 'umd']
    }
  },
  define: {
    VERSION: `'${require('./package.json').version}'`
  }
})
