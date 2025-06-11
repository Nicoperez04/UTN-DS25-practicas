import React from 'react';
import BloqueTema from './BloqueTema';

import ficcionImg   from '../Imagenes/Resto/ficcion.jpg';
import deporteImg   from '../Imagenes/Resto/deportes.jpg';
import infantilImg  from '../Imagenes/Resto/infantil.jpg';
import historiaImg  from '../Imagenes/Resto/historia.jpg';

export default function Main() {
  const temas = [
    { id: 'ficcion',   titulo: 'Ficción',  portada: ficcionImg,  autor: 'Cixin Liu',     enlace: '#ficcion' },
    { id: 'deporte',   titulo: 'Deporte',  portada: deporteImg,  autor: 'Antoni Daimiel', enlace: '#deporte' },
    { id: 'infantil',  titulo: 'Infantil', portada: infantilImg, autor: 'Bella George',  enlace: '#infantil' },
    { id: 'historia',  titulo: 'Historia', portada: historiaImg, autor: 'Teresa Eggers', enlace: '#historia' },
  ];

  return (
    <main id="contenidoPrincipal">
      <section className="seccion-libros">
        {temas.map(t => (
          <BloqueTema key={t.id} {...t} />
        ))}
      </section>
    </main>
  );
}
