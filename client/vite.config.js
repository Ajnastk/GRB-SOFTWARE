import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import envCompatible from 'vite-plugin-env-compatible'
// https://vite.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [react(),envCompatible()],
  server: {
    port: 3001, // Set a specific port for Vite
    open: true, // Optional: Automatically open the browser
  },
})