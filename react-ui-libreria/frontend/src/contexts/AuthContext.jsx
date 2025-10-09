// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { setToken, getToken, clearToken, getUserData, isTokenExpired } from '../helpers/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar: si hay token y no venció, setear user; si venció, limpiar
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired()) {
      setUser(getUserData());
    } else if (token) {
      clearToken();
    }
    setLoading(false);
  }, []);

  // Login de DEMO (frontend) – reemplazar luego por service real
  async function login(email, password) {
    if (email === 'admin@libreria.test' && password === 'admin123') {
      const fakeJwtPayload = {
        email,
        role: 'ADMIN',
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hora
      };
      const payload = btoa(JSON.stringify(fakeJwtPayload));
      const token = `xxx.${payload}.yyy`; // form válido para parsear
      setToken(token, fakeJwtPayload);
      setUser(fakeJwtPayload);
      return { success: true };
    }
    return { success: false, error: 'Credenciales inválidas' };
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
