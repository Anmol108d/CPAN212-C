import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map(item => (
            <div key={item.productId} className="flex items-center mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-grow">
                <div className="font-semibold">{item.name}</div>
                <div>Price: ${item.price.toFixed(2)}</div>
                <div>
                  Quantity:
                  <input type="number" value={item.quantity} min="1"
                    onChange={e => updateCartItem(item.productId, parseInt(e.target.value))} className="ml-2 w-16" />
                </div>
              </div>
              <button onClick={() => removeFromCart(item.productId)} className="ml-4 text-red-500">Remove</button>
            </div>
          ))}
          <div className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</div>
          <button onClick={() => navigate('/checkout')} className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
