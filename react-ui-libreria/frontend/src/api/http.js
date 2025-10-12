// src/api/http.js
import { getToken } from '../helpers/auth';

// Normalizamos la URL base: sin barra final
const RAW_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = RAW_BASE.replace(/\/$/, '');

// Aseguramos que path empiece con / (si el caller manda "libros", lo convertimos a "/libros")
const joinPath = (p) => (p.startsWith('/') ? p : `/${p}`);

/**
 * Envolvemos fetch para headers, JSON y manejo de errores.
 * Por qué: centraliza la lógica HTTP y evita repetir código en servicios.
 */
export async function http(path, { method = 'GET', body, token, headers = {} } = {}) {
  const auth = token ?? getToken();
  const res = await fetch(`${BASE_URL}${joinPath(path)}`, {
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
