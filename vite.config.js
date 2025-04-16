// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://www.carqueryapi.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
});
