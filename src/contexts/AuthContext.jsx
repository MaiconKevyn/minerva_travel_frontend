
import React, { createContext, useState, useEffect, useContext } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(pb.authStore.model);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    // Subscribe to auth store changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
      setIsAuthenticated(pb.authStore.isValid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      return { success: true, data: authData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login falhou. Verifique suas credenciais.' };
    }
  };

  const signup = async (email, password, name) => {
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name
      }, { $autoCancel: false });

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Falha ao criar conta.' };
    }
  };

  const logout = () => {
    pb.authStore.clear();
    toast.success('Desconectado com sucesso!');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
