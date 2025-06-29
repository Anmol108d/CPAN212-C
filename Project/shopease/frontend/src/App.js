import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { useUser } from './context/UserContext';

function App() {
  const { token, logout } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-green-600 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">ShopEase</Link>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/products" className="mr-4">Products</Link>
          <Link to="/cart" className="mr-4">Cart</Link>
          {token ? (
            <>
              <Link to="/profile" className="mr-4">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;