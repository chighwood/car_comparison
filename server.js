// server.js (Node/Express)
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());

app.get('/api/*', async (req, res) => {
  const carQueryUrl = `https://www.carqueryapi.com/${req.originalUrl.replace('/api/', '')}`;
  try {
    const response = await fetch(carQueryUrl);
    const text = await response.text();
    res.send(text); // send it back as-is
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', detail: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
