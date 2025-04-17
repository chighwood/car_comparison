import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 5500;

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Proxy
app.use('/api', createProxyMiddleware({
  target: 'https://www.carqueryapi.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  secure: true
}));

// Catch-all Route (modified)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
