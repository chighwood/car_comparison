import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5500;

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Proxy
app.use('/api', async (req, res) => {
    try {
      console.log('Proxying request to:', req.originalUrl);
  
      const apiUrl = `https://www.carqueryapi.com${req.originalUrl.replace(/^\/api/, '')}`;
      const response = await fetch(apiUrl);
      const data = await response.text();
      res.send(data);
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
  });
  

// Catch-all Route (modified)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
