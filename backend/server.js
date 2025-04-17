import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/:proxyPath(*)', async (req, res) => {
    const proxyPath = req.params.proxyPath || '';
    const url = `https://www.carqueryapi.com/${proxyPath}${req.url.split(proxyPath).slice(1).join('')}`;
  
    try {
      const response = await fetch(url);
      const data = await response.text();
      res.send(data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).send('Error fetching data from external API');
    }
  });  

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
