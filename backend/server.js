// backend/server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());

// Proxy all requests to CarQuery API
app.get('/api/*', async (req, res) => {
  const carQueryUrl = `https://www.carqueryapi.com${req.originalUrl.replace('/api', '')}`;
  try {
    const response = await fetch(carQueryUrl);
    const text = await response.text();
    res.send(text); // Forward raw text
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', detail: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
