import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Evaporation Rate',
        short_name: 'Evaporation Rate',
        theme_color: '#333',
        icons: [
          {
            src: '/icons/evaporation.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/evaporation.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
