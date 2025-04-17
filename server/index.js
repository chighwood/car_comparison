import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '../dist')));

// Proxy route - using exact route string (no pattern regex issue)
app.get('/api/*', async (req, res) => {
  const apiUrl = `https://www.carqueryapi.com/api${req.originalUrl.replace('/api', '')}`;
  console.log('Proxying request to:', apiUrl);
  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    console.error('API Proxy Error:', err);
    res.status(500).send('Proxy error');
  }
});

// Catch-all route for SPA support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
