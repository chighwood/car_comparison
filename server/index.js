import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', async (req, res) => {
  const apiUrl = `https://www.carqueryapi.com/api${req.url}`;
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

