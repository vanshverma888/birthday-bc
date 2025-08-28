import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['96821a51-1562-4fb2-99d7-e23e84b5ece6-00-ljzv86xujzhb.pike.replit.dev']
  }
})
