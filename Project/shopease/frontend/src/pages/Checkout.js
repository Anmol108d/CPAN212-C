import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/orders', {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(`Order placed! ID: ${res.data.orderId}`);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      setMessage('Error placing order.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button onClick={handleCheckout} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? 'Processing...' : 'Place Order (Simulated)'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
