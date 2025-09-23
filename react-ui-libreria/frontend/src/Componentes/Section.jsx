import React, { useMemo, useState } from 'react';

/**
 * 1) Importamos TODAS las imágenes por carpeta con require.context
 * 2) Normalizamos el retorno: puede ser string o { default: string }
 * 3) Ordenamos alfabéticamente para un mapeo estable por índice
 */
function importAll(ctx) {
  return ctx
    .keys()
    .sort()
    .map((k) => {
      const m = ctx(k);
      return typeof m === 'string' ? m : (m && m.default) ? m.default : '';
    })
    .filter(Boolean);
}

function useImagesByCategory() {
  return useMemo(() => {
    const RESTO     = importAll(require.context('../Imagenes/Resto',      false, /\.(png|jpe?g|webp)$/));
    const DEPORTE   = importAll(require.context('../Imagenes/secDeporte',  false, /\.(png|jpe?g|webp)$/));
    const FICCION   = importAll(require.context('../Imagenes/secFiccion',  false, /\.(png|jpe?g|webp)$/));
    const HISTORIA  = importAll(require.context('../Imagenes/secHistoria', false, /\.(png|jpe?g|webp)$/));
    const INFANTIL  = importAll(require.context('../Imagenes/secInfantil', false, /\.(png|jpe?g|webp)$/));

    return {
      RESTO,
      DEPORTE,
      FICCION,
      HISTORIA,
      INFANTIL,
    };
  }, []);
}

/**
 * Reglas para elegir la portada:
 * 1) Si el libro trae URL en BD (libro.portada), usarla.
 * 2) Si no, tomar la N-ésima imagen de la carpeta de su categoría (por índice en la grilla).
 * 3) Si la carpeta está vacía, usar RESTO/fondo.jpg si existe.
 */
function pickCover(libro, idx, images) {
  if (libro?.portada) return libro.portada;

  const arr = images[libro?.categoria]; // 'DEPORTE' | 'FICCION' | 'HISTORIA' | 'INFANTIL'
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[idx % arr.length]; // mapeo estable por posición
  }
  // fallback
  const fallback = images.RESTO?.find((p) => /fondo\.(png|jpe?g|webp)$/i.test(p));
  return fallback || '';
}

function CardLibro({ libro, idx, images }) {
  const [open, setOpen] = useState(false);
  const src = pickCover(libro, idx, images);

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="card shadow-sm mb-4 w-100">
        <img
          src={src}
          alt={`Portada de ${libro.titulo}`}
          className="card-img-top img-fluid w-100"
          style={{ aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            // ultimo fallback si la ruta falla
            const fb = images.RESTO?.find((p) => /fondo\.(png|jpe?g|webp)$/i.test(p));
            if (fb) e.currentTarget.src = fb;
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-subtitle text-muted mb-2">Autor: {libro.autor}</p>

          {open && (
            <div className="small text-body-secondary mb-2">
              {libro.descripcion || 'Descripción no disponible.'}
            </div>
          )}

          <div className="mt-auto">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section({ titulo, title, libros = [] }) {
  const images = useImagesByCategory();
  const heading = titulo ?? title ?? '';

  return (
    <main className="contenido-principal">
      {heading && <h2 className="mb-3">{heading}</h2>}
      <div className="container">
        <div className="row g-4">
          {libros.map((libro, idx) => (
            <CardLibro key={libro.id} libro={libro} idx={idx} images={images} />
          ))}
        </div>
      </div>
    </main>
  );
}
