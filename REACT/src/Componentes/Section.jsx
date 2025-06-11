import React from 'react';
import BloqueTema from './BloqueTema';

export default function Section({ libros }) {
  return (
    <main id="contenidoPrincipal">
      <section className="seccion-libros">
        {libros.map(libro => (
          <BloqueTema
            key={libro.id}
            id={libro.id}
            titulo={libro.titulo}
            portada={libro.portada}
            autor={libro.autor}
            enlace={`#${libro.id}`}
          >
          </BloqueTema>
        ))}
      </section>
    </main>
  );
}
