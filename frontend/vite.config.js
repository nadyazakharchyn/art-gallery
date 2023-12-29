import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
base:'/';
export default defineConfig({
  plugins: [react()],
})
