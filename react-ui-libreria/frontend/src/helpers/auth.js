// src/helpers/auth.js

/** Guarda el token de sesión (y opcionalmente datos del usuario para cache UI). */
export function setToken(token, userData = null) {
  if (!token) return;
  localStorage.setItem('token', token);                
  localStorage.setItem('auth', JSON.stringify({        
    token,
    user: userData,
  }));
}

/** Devuelve el token si existe. */
export function getToken() {
  const t1 = localStorage.getItem('token');
  if (t1) return t1;
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

/** Elimina la sesión del storage. */
export function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('auth');
}

/** Decodifica el payload de un JWT (sin verificar firma; uso UI). */
export function parseJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/** Devuelve los datos del usuario (payload) si hay token válido. */
export function getUserData() {
  const token = getToken();
  return token ? parseJWT(token) : null;
}

/** Retorna true si no hay token o si exp está vencido. */
export function isTokenExpired() {
  const userData = getUserData();
  if (!userData?.exp) return true;
  return userData.exp * 1000 < Date.now();
}

export function hasRole(requiredRole) {
  if (!requiredRole) return true;
  const user = getUserData();
  return user?.role === requiredRole;
}
