import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/:proxyPath*', async (req, res) => {
  const proxyPath = req.params.proxyPath;
  const extraQuery = req.url.split(proxyPath)[1] || '';
  const carQueryUrl = `https://www.carqueryapi.com/${proxyPath}${extraQuery}`;

  try {
    const response = await fetch(carQueryUrl);
    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', detail: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
