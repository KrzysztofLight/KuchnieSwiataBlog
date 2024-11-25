import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User found in local storage');
      console.log(storedUser);
      console.log(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const userEmail = user?.email;
  const userName = user?.name;
  console.log(userEmail, userName);
  console.log(user);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, userEmail, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};