import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async (email, password) => {
    const res = await axios.post('/api/login', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  const register = async (email, password) => {
    const res = await axios.post('/api/register', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ token, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);