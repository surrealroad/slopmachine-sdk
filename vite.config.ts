import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'demo',
  base: '/slopmachine-sdk/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
