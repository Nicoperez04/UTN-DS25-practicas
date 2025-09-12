// src/api/http.js
import { getToken } from '../helpers/auth';

// Soporta Vite (VITE_API_URL) y CRA (REACT_APP_API_URL)
const viteUrl =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_URL;

const BASE_URL = viteUrl || process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Adjunta Authorization si hay token en localStorage.
 * Lo que hace basicamente es envolver fetch para manejar errores y agregar headers automáticamente
 * osea mas claro lo que hace es una función que facilita hacer solicitudes HTTP a una API.
 */
export async function http(path, { method = 'GET', body, token, headers = {} } = {}) {
  const auth = token ?? getToken(); // lee token por defecto

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail = null;
    try { detail = await res.json(); } catch {}
    const msg = detail?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return res.json();
}
