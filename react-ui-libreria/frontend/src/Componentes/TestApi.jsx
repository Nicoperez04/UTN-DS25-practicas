// src/Componentes/TestApi.jsx
import React, { useState } from 'react';
import { http } from '../api/http';

export default function TestApi() {
  const [out, setOut] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function call(path) {
    setErr(''); setOut(null); setLoading(true);
    try {
      const data = await http(path); // si hay token en localStorage, se manda solo
      setOut(data);
    } catch (e) {
      setErr(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="contenidoPrincipal" style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Pruebas de API</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button onClick={() => call('/ficcion')} disabled={loading}>
          GET /ficcion (pública)
        </button>
        <button onClick={() => call('/users')} disabled={loading}>
          GET /users (segura)
        </button>
      </div>
      {loading && <p>Cargando…</p>}
      {err && <p style={{ color: 'crimson' }}>Error: {err}</p>}
      {out && <pre style={{ background:'#f6f6f6', padding:12 }}>{JSON.stringify(out, null, 2)}</pre>}
    </main>
  );
}
