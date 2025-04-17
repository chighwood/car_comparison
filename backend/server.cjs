const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to the root of the project
const rootDir = path.join(__dirname, '..');

app.use(express.static(rootDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
