import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// This part replaces __dirname (not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.join(__dirname, 'pages', filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'pages', '404.html'), (error, notFoundData) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFoundData || '404 Not Found');
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
