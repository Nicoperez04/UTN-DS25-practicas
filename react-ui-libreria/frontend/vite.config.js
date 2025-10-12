import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Explicación: plugin react habilita Fast Refresh y JSX.
// base:'./' evita paths rotos si servís estático desde subcarpetas.
export default defineConfig({
  plugins: [react()],
  base: './',
})
