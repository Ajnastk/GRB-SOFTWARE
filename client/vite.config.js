import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // This is the port Vite will run on
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Proxy target
        changeOrigin: true,
        secure: false,
      },
    },
  },
})