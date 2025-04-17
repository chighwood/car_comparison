const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to the root of the project
const rootDir = path.join(__dirname, '..');

// Serve static files from the 'dist' folder and its subfolders (assets)
app.use(express.static(path.join(rootDir, 'dist')));

// Serve static files from the 'dist/assets' folder (for CSS/JS images, etc.)
app.use('/assets', express.static(path.join(rootDir, 'dist', 'assets')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
