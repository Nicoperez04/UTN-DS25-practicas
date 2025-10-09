import React, { useState } from 'react';
import BloqueTema from './BloqueTema';

/**
 * Componente Catalogo que agregue
 * Recibe al catalogo: array con todos los libros
 * Permite buscar por título o autor
 * Muestra los libros filtrado
 */
// src/Componentes/Catalogo.jsx

export default function Catalogo({ catalogo }) {
  // Estado para el texto de búsqueda
  const [busqueda, setBusqueda] = useState('');

  const q = busqueda.toLowerCase().trim();

  const filtrados = catalogo.filter((libro) => {
    const t = (libro.titulo ?? '').toLowerCase();
    const a = (libro.autor ?? '').toLowerCase();
    const s = (libro.seccion ?? libro.genero ?? '').toLowerCase(); // por si tu schema usa 'genero'
    return !q || t.includes(q) || a.includes(q) || s.includes(q);
  });

  return (
    <main className="contenido-principal">
      {/* Input de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar libros por título, autor o sección..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Resultados filtrados */}
      <section className="seccion-libros">
        {filtrados.length > 0 ? (
          filtrados.map(libro => (
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
          <p>No se encontraron libros para “{busqueda}”.</p>
        )}
      </section>
    </main>
  );
}

