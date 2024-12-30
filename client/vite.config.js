import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envCompatible from 'vite-plugin-env-compatible'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
=======
  envPrefix: "REACT_APP_",
  plugins: [react(),envCompatible()],
  server: {
    port: 3001, // Set a specific port for Vite
    open: true, // Optional: Automatically open the browser
  },
   build: {
    outDir: 'build', // Specify the output directory for the build
>>>>>>> e4c8242f518cb722d5311dc5d71f82d378751978
  },
})
