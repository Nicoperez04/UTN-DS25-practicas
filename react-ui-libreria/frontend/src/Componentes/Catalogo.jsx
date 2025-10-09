// src/Componentes/Catalogo.jsx
import React, { useState, useMemo } from 'react';
import BloqueTema from './BloqueTema';

// Acepta catalogo y por defecto un array vacío (evita crash si no se pasa)
export default function Catalogo({ catalogo = [] }) {
  const [busqueda, setBusqueda] = useState('');
  const q = busqueda.toLowerCase().trim();

  const filtrados = useMemo(() => {
    return (catalogo || [])
      .filter(Boolean)
      .filter((libro) => {
        const t = (libro.titulo ?? '').toLowerCase();
        const a = (libro.autor ?? '').toLowerCase();
        const s = (libro.seccion ?? libro.genero ?? '').toLowerCase();
        return !q || t.includes(q) || a.includes(q) || s.includes(q);
      });
  }, [catalogo, q]);

  return (
    <main className="contenido-principal">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título, autor o sección..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <section className="seccion-libros">
        {filtrados.length > 0 ? (
          filtrados.map((libro) => (
            <BloqueTema
              key={libro.id}
              {...libro}
              portada={
                libro.portada?.startsWith('http')
                  ? libro.portada
                  : `http://localhost:3001${libro.portada}`
              }
            />
          ))
        ) : (
          <p>No se encontraron libros {q ? `para “${busqueda}”` : 'en el catálogo'}.</p>
        )}
      </section>
    </main>
  );
}
