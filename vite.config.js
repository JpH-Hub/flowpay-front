import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8', 
      reporter: ['text', 'json', 'html'], 
      exclude: [
        'node_modules/',
        'src/main.jsx',
        '**/*.test.{js,jsx}',
        '**/__tests__/**'
      ]
    }
  }
})