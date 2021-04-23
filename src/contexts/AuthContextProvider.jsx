import React, { useEffect, useState, createContext } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login =  async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
