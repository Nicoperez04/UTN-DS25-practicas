// src/services/auth.js
import { http } from '../api/http';

/**
 * Inicia sesion en el backend.
 * - Recibe email y password
 * - Devuelve { token, user }
 */
export async function login(email, password) {
  return http('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}
