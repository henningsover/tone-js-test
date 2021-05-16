import React, { useEffect, useState, createContext } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateUsername = (username ) => {
    return currentUser.updateProfile({
      displayName: username
    })
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  const toggleUpdateUserModal = () => {
    setShowUpdateUserModal((prev) => !prev);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={
      {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        loading,
        resetPassword,
        showUpdateUserModal,
        setShowUpdateUserModal,
        toggleUpdateUserModal,
        updateUsername,
        updatePassword
      }
    }>
      {!loading && children}
    </AuthContext.Provider>
  );
}
