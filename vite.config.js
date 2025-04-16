// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://www.carqueryapi.com',  // External API URL
        changeOrigin: true,  // Adjust headers if needed
        secure: true,
      }
    }
  }
});
