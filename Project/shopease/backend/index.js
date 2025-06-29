// File: backend/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('shopease.db');

// Middleware
app.use(cors());
app.use(express.json());

// Serve local images (if using local assets)
// Ensure you have a ./public/images folder with your files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Get all products (including image URLs)
app.get('/api/products', (req, res) => {
  db.all(
    'SELECT id, name, description, price, image FROM Products',
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  db.get(
    'SELECT id, name, description, price, image FROM Products WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Product not found' });
      res.json(row);
    }
  );
});

// Your cart and order routes remain unchanged
// ...

// Start server
thePort = process.env.PORT || 5000;
app.listen(thePort, () => console.log(`Server running on port ${thePort}`));
