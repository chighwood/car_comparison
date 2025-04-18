// Import dependencies
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// === Proxy Route ===
app.get('/api/0.3', async (req, res) => {
  const { cmd, make, model, year, sold_in_us } = req.query;

  if (!cmd || !sold_in_us) {
    return res.status(400).send('Missing required query parameters');
  }

  // Construct the API URL with query params
  let apiUrl = `https://www.carqueryapi.com/api/0.3/?cmd=${cmd}&sold_in_us=${sold_in_us}`;
  
  if (make) apiUrl += `&make=${make}`;
  if (model) apiUrl += `&model=${model}`;
  if (year) apiUrl += `&year=${year}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(response.status).send('Error with CarQuery API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error during API request:', error);
    res.status(500).send('Server error');
  }
});


// === Serve Frontend ===

// Set __dirname with ESM 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../dist')));

// SPA Fallback: redirect all unmatched routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

console.log("Setting route: /api/:") // or log all your route definitions


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// This server will now handle API requests to the CarQuery API and serve the frontend files from the dist directory.