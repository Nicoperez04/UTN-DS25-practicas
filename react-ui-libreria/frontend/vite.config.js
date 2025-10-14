// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fast Refresh + JSX. base:'./' evita paths rotos si servís estático desde subcarpetas.
// Agrego proxy para /api en desarrollo: Vite reenvía a tu backend local en 3000.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Si tu backend NO usa el prefijo /api internamente, destapá la siguiente línea:
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
