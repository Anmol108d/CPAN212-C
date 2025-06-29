// File: backend/seed.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('shopease.db');

const TOTAL_PRODUCTS = 2000;

db.serialize(() => {
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO Products (name, description, price, image) VALUES (?, ?, ?, ?)'
  );

  for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
    const name = `Product ${i}`;
    const description = `Description for ${name}`;
    const price = (Math.random() * 95 + 5).toFixed(2);
    const image = `https://via.placeholder.com/300?text=Product+${i}`;

    stmt.run(name, description, price, image);
  }

  stmt.finalize();
});

db.close();
console.log(`Seeded ${TOTAL_PRODUCTS} products to shopease.db`);

