const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Proxy all API calls to CarQuery API
app.use('/api', async (req, res) => {
  const carQueryBaseURL = 'https://www.carqueryapi.com/api/0.3/';

  try {
    // Rebuild query string and full target URL
    const queryParams = new URLSearchParams(req.query).toString();
    const fullUrl = `${carQueryBaseURL}?${queryParams}`;

    console.log('Proxying to:', fullUrl);
    const response = await axios.get(fullUrl);

    res.setHeader('Content-Type', 'application/json');
    res.send(response.data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
