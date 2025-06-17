import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      host: '0.0.0.0',
      open: '.',
   },
   build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
         output: {
            manualChunks(id) {
               if (id.includes('node_modules')) {
                  return 'vendor'
               }
            },
         },
      },
   },
})
