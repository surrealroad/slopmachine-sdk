import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'demo',
  base: '/slopmachine-sdk/',
  plugins: [react()],
  server: {
    port: 3001,
    fs: {
      allow: ['..']
    }
  }
})
