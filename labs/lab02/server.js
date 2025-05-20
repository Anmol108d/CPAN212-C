const express = require('express');
const app = express();
const port = 8000;

// Import routes
const routes = require('./routes');

// Use the imported routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
