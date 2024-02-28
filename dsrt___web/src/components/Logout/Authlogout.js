import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const Authlogout = ({ children }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log('handleLogout');
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    console.log('confirmLogout');
    setShowLogoutModal(false);
    navigate('/');
    // Note: Do not use useNavigate directly here, as it should be used within components.
  };

  const cancelLogout = () => {
    console.log('cancelLogout');
    setShowLogoutModal(false);
  };

  const navigate = useNavigate(); // Move useNavigate outside of the component

  return (
    <AuthContext.Provider value={{ showLogoutModal, handleLogout, confirmLogout, cancelLogout, navigate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
