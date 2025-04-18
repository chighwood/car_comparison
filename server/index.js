// Import dependencies
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Initialize the Express app
const app = express();
const port = 3000;

// Enable CORS for all requests (you may want to configure this for more security)
app.use(cors());

// Serve the root path with a simple message
app.get('/', (req, res) => {
  res.send('Welcome to the Proxy Server!');
});

// Middleware to parse JSON bodies (if needed)
app.use(express.json());

// Proxy route for fetching data from the CarQuery API
app.get('/api/0.3', async (req, res) => {
  const { cmd, make, model, year, sold_in_us } = req.query;

  // Construct the URL to forward to the CarQuery API
  let apiUrl = `https://www.carqueryapi.com/api/0.3/?cmd=${cmd}&sold_in_us=${sold_in_us}`;
  
  if (make) apiUrl += `&make=${make}`;
  if (model) apiUrl += `&model=${model}`;
  if (year) apiUrl += `&year=${year}`;

  try {
    // Forward the request to the CarQuery API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).send('Error with CarQuery API');
    }

    // Parse the response as JSON
    const data = await response.json();

    // Send the data back to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error during API request:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
// This server will now listen for requests on port 3000 and forward them to the CarQuery API.