import { createContext, useContext, useState } from 'react';

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

  const setAndStoreUserName = (newUserName) => {
    setUserName(newUserName);
    // You can add additional logic here to store the userName, like in localStorage or a state management system
  };

  const setAndStoreUserType = (newUserType) => {
    setUserType(newUserType);
    // You can add additional logic here to store the userType, like in localStorage or a state management system
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
