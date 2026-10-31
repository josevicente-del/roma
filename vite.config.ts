import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para nuestra PWA de Roma
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vercel/analytics/next': '@vercel/analytics/react'
    }
  }
})

