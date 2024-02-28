import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  // Load user details from storage when component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserType = localStorage.getItem('userType');
    if (storedUserName && storedUserType) {
      setUserName(storedUserName);
      setUserType(storedUserType);
    }
  }, []);

  const setAndStoreUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  const setAndStoreUserType = (newUserType) => {
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
  };

  const value = {
    userName,
    setAndStoreUserName,
    userType,
    setAndStoreUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserDetails = () => {
  const context = useUser();
  return context;
};