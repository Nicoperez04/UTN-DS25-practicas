import React from 'react';

export default function BloqueTema({ id, titulo, portada, autor, enlace }) {
  return (
    <article className="bloque-tema" id={id}>
      <h3>{titulo}</h3>
      <img src={portada} alt={`Portada de ${titulo}`} />
      <p><strong>Título:</strong> {titulo}</p>
      <p><strong>Autor:</strong> {autor}</p>
      <a href={enlace}>Ver más</a>
    </article>
  );
}
