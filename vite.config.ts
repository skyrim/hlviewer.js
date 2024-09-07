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
    },
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          if (assetInfo.name === 'style.css') {
            return 'hlviewer.css'
          }
          return assetInfo.name || ''
        }
      }
    }
  },
  define: {
    VERSION: `'${require('./package.json').version}'`
  }
})
