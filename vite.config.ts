import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
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
