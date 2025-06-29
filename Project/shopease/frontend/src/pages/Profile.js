import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { token } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data));
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map(o => (
            <li key={o.id} className="mb-4 border p-2">
              <div>Order ID: {o.id}</div>
              <div>Date: {new Date(o.orderDate).toLocaleString()}</div>
              <div>Details: {o.orderDetails}</div>
              <div>Total: ${o.totalAmount.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
