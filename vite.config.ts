import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local', // Ensures styles are scoped to components
      generateScopedName: '[name]__[local]___[hash:base64:5]', // Custom class name format
    },
  },
})
