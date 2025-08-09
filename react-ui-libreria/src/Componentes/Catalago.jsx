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

  // Filtrado por título, autor o sección (ignorando mayúsculas/minúsculas)
  const filtrados = catalogo.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.seccion.toLowerCase().includes(busqueda.toLowerCase())
  );

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
              // 🔹 Esto asegura que la ruta de la imagen sea correcta.
              // Si la imagen ya es una URL completa, se usa tal cual.
              // Si es solo un nombre o ruta parcial, se le antepone el backend.
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

