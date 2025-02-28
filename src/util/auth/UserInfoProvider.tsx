import React, { createContext, useContext, useMemo, useState } from 'react';
import { UserInfo } from '../../pages/auth/login/Login.model';
import LocalStorageUtil from '../useLocalStorage';

// Define a type for the context value
type UserContextValue = {
    userInfo: UserInfo; // Assuming you have a type UserInfo defined somewhere
    updateUser: (newUserInfo: UserInfo) => void;
  };
  
  // Create the context with an initial value
  const UserContext = createContext<UserContextValue>({
    userInfo: LocalStorageUtil.getItem('userInfo'),
    updateUser: () => {},
  });
  

export const UserProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(LocalStorageUtil.getItem('userInfo'));

  const updateUser = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const contextValue = useMemo(() => ({
    userInfo,
    updateUser
}), [userInfo, updateUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
