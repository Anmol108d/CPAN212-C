import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => {
          // Compute the image URL, falling back if needed
          const imgUrl = p.image
            ? p.image
            : `https://via.placeholder.com/300x300?text=${encodeURIComponent(p.name)}`;

          return (
            <Link
              to={`/products/${p.id}`}
              key={p.id}
              className="border p-2 hover:shadow"
            >
              <img
                src={imgUrl}
                alt={p.name}
                className="w-full h-32 object-cover mb-2"
              />
              <div className="font-semibold">{p.name}</div>
              <div>${p.price.toFixed(2)}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
