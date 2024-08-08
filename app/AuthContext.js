import React, { createContext, useContext, useState } from 'react';

import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [confirm, setConfirm] = useState(null);

  const signOut = async () => {
    try {
      await auth().signOut();
      setConfirm(null); // Reset confirm state on sign out
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ confirm, setConfirm, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
