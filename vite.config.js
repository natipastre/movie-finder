import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Exporta a configuração do Vite
export default defineConfig({
  plugins: [react()] // Ativa o plugin React (JSX, Fast Refresh, etc.)
})
