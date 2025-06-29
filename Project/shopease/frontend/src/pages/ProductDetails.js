import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="mb-4">{product.description}</p>
      <div className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</div>
      <button
        onClick={() => {
          addToCart(product.id);
          navigate('/cart');
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
