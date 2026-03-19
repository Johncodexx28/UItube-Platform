import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get('/auth/profile');
        setUser(data);
      } catch {
        console.log('No active session found.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    // If user needs verification, don't set user — return the flag
    if (data.needsVerification) {
      return data;
    }
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await api.post('/auth/register', userData);
    // Registration now returns { needsVerification, email, message }
    return data;
  };

  const verifyEmail = async (email, code) => {
    const data = await api.post('/auth/verify-email', { email, code });
    setUser(data);
    return data;
  };

  const resendVerification = async (email) => {
    return await api.post('/auth/resend-verification', { email });
  };

  const forgotPassword = async (email) => {
    return await api.post('/auth/forgot-password', { email });
  };

  const resetPassword = async (email, code, newPassword) => {
    return await api.post('/auth/reset-password', { email, code, newPassword });
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null); // Local force logout
    }
  };

  const updateUser = async (data) => {
    const updatedUser = await api.put('/auth/profile', data);
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, register, logout, updateUser,
      verifyEmail, resendVerification,
      forgotPassword, resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
