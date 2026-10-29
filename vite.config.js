import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // listen di semua network interface supaya bisa dibuka dari device lain di jaringan yang sama
    host: true,
  },
})
