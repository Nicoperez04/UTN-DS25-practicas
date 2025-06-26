import React, { useState } from 'react';
import BloqueTema from './BloqueTema';

/**
 * Componente Catalogo que agregue
 * Recibe al catalogo: array con todos los libros
 * Permite buscar por título o autor
 * Muestra los libros filtrado
 */
export default function Catalogo({ catalogo }) {
  // Estado para controlar el texto del input de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Filtra por título o autor o seccion (ambos en minúsculas para ignorar mayúsculas)
  const filtrados = catalogo.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.seccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="contenido-principal">
      {/* El filtro en si para la busqueda que pone la persona que usa la pagina */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar libros por título o autor o seccion..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Grid de resultados */}
      <section className="seccion-libros">
        {filtrados.length > 0 ? (
          filtrados.map(libro => (
            <BloqueTema key={libro.id} {...libro} />
          ))
        ) : (
          <p>No se encontraron libros para “{busqueda}”.</p>
        )}
      </section>
    </main>
  );
}
