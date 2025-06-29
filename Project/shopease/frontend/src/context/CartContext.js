import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useUser();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!token) return;
    const res = await axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
    setCart(res.data);
  };

  const addToCart = async (productId, quantity=1) => {
    await axios.post('/api/cart', { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  const updateCartItem = async (productId, quantity) => {
    await axios.put(`/api/cart/${productId}`, { quantity }, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await axios.delete(`/api/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);