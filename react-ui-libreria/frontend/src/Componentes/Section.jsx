import React, { useState } from "react";

/* -------------------- Normalización de categoría -------------------- */
function normalizeCategory(input) {
  const raw = String(input ?? "").trim().toUpperCase();
  const map = {
    FICCIÓN: "FICCION",
    FICCION: "FICCION",
    DEPORTES: "DEPORTE",
    DEPORTE: "DEPORTE",
    HISTORIA: "HISTORIA",
    INFANTIL: "INFANTIL",
  };
  return map[raw] || "RESTO";
}

const CATEGORY_DIR = {
  FICCION: "secFiccion",
  DEPORTE: "secDeporte",
  HISTORIA: "secHistoria",
  INFANTIL: "secInfantil",
  RESTO: "Resto",
};

const DEFAULT_IMAGE = "fondo.jpg";

/* -------------------- Helpers para portadas -------------------- */
/**
 * Si viene una URL absoluta (ej: http://localhost:3000/imagenes/secFiccion/ficcion5.jpg)
 * devolvemos SOLO el path y lo mapeamos a /Imagenes/... del front (carpeta /public).
 * - Hace case-fix del prefijo (/imagenes -> /Imagenes)
 * - Garantiza leading slash
 */
function absoluteToPublicPath(urlStr) {
  try {
    const u = new URL(urlStr);
    let p = u.pathname || "/";
    // normalizamos prefijo "imagenes" a "Imagenes" (servidores Linux son case-sensitive)
    p = p.replace(/^\/imagenes\//i, "/Imagenes/");
    // garantizamos slash inicial
    if (!p.startsWith("/")) p = `/${p}`;
    return p;
  } catch {
    return ""; // no era URL válida; que siga el flujo normal
  }
}

/**
 * Resuelve la src final de la portada, cubriendo TODOS los casos:
 * 1) portada absoluta (http/https) -> tomamos solo pathname y lo mapeamos a /Imagenes/ del front
 * 2) portada que es ruta absoluta/relativa -> la normalizamos a /Imagenes/<...>
 * 3) portada que es nombre de archivo -> la buscamos en la carpeta por categoría
 * 4) nada -> fallback por categoría -> fallback global
 */
function resolveCoverSrc(libro) {
  const portada = libro?.portada || libro?.imagen || libro?.img || "";

  // Caso 1: URL absoluta (incluye localhost / dominios del back)
  if (typeof portada === "string" && /^https?:\/\//i.test(portada)) {
    const pathOnly = absoluteToPublicPath(portada);
    if (pathOnly) return pathOnly;
  }

  // Caso 2: ruta absoluta/relativa que ya apunta a imagenes
  if (typeof portada === "string" && portada) {
    // normalizar prefijo y leading slash
    if (/^\/?imagenes\//i.test(portada) || /^\/?Imagenes\//.test(portada)) {
      let p = portada.replace(/^\/?imagenes\//i, "/Imagenes/");
      if (!p.startsWith("/")) p = `/${p}`;
      return p;
    }

    // Caso 3: es solo un nombre de archivo => resolvemos por categoría
    const cat = normalizeCategory(libro?.categoria);
    const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
    return `/Imagenes/${dir}/${portada}`;
  }

  // Caso 4: fallback por categoría
  const cat = normalizeCategory(libro?.categoria);
  const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
  return `/Imagenes/${dir}/${DEFAULT_IMAGE}`;
}

/* -------------------- Componente -------------------- */
function CardLibro({ libro }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(() => resolveCoverSrc(libro));

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <div className="card shadow-sm mb-4 w-100">
        <img
          src={src}
          alt={`Portada de ${libro.titulo}`}
          className="card-img-top img-fluid w-100"
          style={{ aspectRatio: "16 / 9", objectFit: "cover", display: "block" }}
          onError={() => {
            // fallback final SIEMPRE disponible en /public
            setSrc("/Imagenes/Resto/fondo.jpg");
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-subtitle text-muted mb-2">Autor: {libro.autor}</p>

          {open && (
            <div className="small text-body-secondary mb-2">
              {libro.descripcion || "Descripción no disponible."}
            </div>
          )}

          <div className="mt-auto">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Ver menos" : "Ver más"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section({ titulo, title, libros = [] }) {
  const heading = titulo ?? title ?? "";
  return (
    <main className="contenido-principal">
      {heading && <h2 className="mb-3">{heading}</h2>}
      <div className="container">
        <div className="row g-4">
          {libros.map((libro, idx) => (
            <CardLibro key={libro.id ?? `${libro.titulo}-${idx}`} libro={libro} />
          ))}
        </div>
      </div>
    </main>
  );
}
