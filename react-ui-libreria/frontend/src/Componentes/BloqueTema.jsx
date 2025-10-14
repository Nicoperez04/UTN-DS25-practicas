import React from 'react';

export default function BloqueTema({ 
  id, 
  titulo, 
  portada, 
  autor, 
  enlace, 
  categoria, 
  descripcion,
  authorId 
}) {
  return (
    <article className="bloque-tema" id={id}>
      <div className="card h-100">
        <div className="card-img-top-container">
          <img 
            src={portada} 
            alt={`Portada de ${titulo}`} 
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = '/Imagenes/Resto/fondo.jpg';
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text"><strong>Autor:</strong> {autor}</p>
          {categoria && (
            <p className="card-text">
              <small className="text-muted">
                <strong>Categoría:</strong> {categoria}
              </small>
            </p>
          )}
          {descripcion && (
            <p className="card-text">
              <small>{descripcion}</small>
            </p>
          )}
          <div className="mt-auto">
            {enlace ? (
              <a href={enlace} className="btn btn-primary btn-sm">Ver más</a>
            ) : (
              <button className="btn btn-outline-secondary btn-sm" disabled>
                Sin enlace
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
