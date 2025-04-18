import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
// This configuration sets up a proxy for the Vite development server to forward requests to the backend server running on port 3000.
// The `rewrite` function modifies the path of the request to remove the `/api` prefix before forwarding it to the backend server.