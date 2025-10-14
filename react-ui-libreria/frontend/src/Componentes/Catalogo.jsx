// src/Componentes/Catalogo.jsx
import React, { useEffect, useMemo, useState } from "react";
import BloqueTema from "./BloqueTema";

/* ----------------- Utilidades para portada (igual filosofía que Section) ----------------- */
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

function absoluteToPublicPath(urlStr) {
  try {
    const u = new URL(urlStr);
    let p = u.pathname || "/";
    p = p.replace(/^\/imagenes\//i, "/Imagenes/");
    if (!p.startsWith("/")) p = `/${p}`;
    return p;
  } catch {
    return "";
  }
}

function resolveCoverSrc(libro) {
  const portada = libro?.portada || libro?.imagen || libro?.img || "";

  // 1) Absoluta (incluye localhost del back): convierto a /Imagenes del front
  if (typeof portada === "string" && /^https?:\/\//i.test(portada)) {
    const pathOnly = absoluteToPublicPath(portada);
    if (pathOnly) return pathOnly;
  }

  // 2) Ruta ya absoluta/relativa a /imagenes o /Imagenes
  if (typeof portada === "string" && portada) {
    if (/^\/?imagenes\//i.test(portada) || /^\/?Imagenes\//.test(portada)) {
      let p = portada.replace(/^\/?imagenes\//i, "/Imagenes/");
      if (!p.startsWith("/")) p = `/${p}`;
      return p;
    }
    // 3) Nombre de archivo → carpeta por categoría
    const cat = normalizeCategory(libro?.categoria);
    const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
    return `/Imagenes/${dir}/${portada}`;
  }

  // 4) Fallback por categoría
  const cat = normalizeCategory(libro?.categoria);
  const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
  return `/Imagenes/${dir}/${DEFAULT_IMAGE}`;
}

/* ----------------------------------- Componente ----------------------------------- */
export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 0) Base URL del back desde env (sin barra final)
  const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

  useEffect(() => {
    // 1) Fetch del catálogo (GET /libros). Ajustá el path si tu endpoint es distinto.
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr("");
        if (!API) {
          throw new Error(
            "VITE_API_URL no está definida. Configúrala en .env y en Vercel."
          );
        }
        const resp = await fetch(`${API}/libros`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
          credentials: "include", // opcional si usás cookies/sesión
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        setLibros(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Error al cargar catálogo");
        setLibros([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [API]);

  const q = busqueda.toLowerCase().trim();

  const filtrados = useMemo(() => {
    return (libros || [])
      .filter(Boolean)
      .filter((libro) => {
        const t = (libro.titulo ?? "").toLowerCase();
        const a = (libro.autor ?? "").toLowerCase();
        const s =
          (libro.seccion ?? libro.genero ?? libro.categoria ?? "").toLowerCase();
        return !q || t.includes(q) || a.includes(q) || s.includes(q);
      });
  }, [libros, q]);

  return (
    <main className="contenido-principal">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título, autor o sección..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {loading && <p>Cargando catálogo…</p>}
      {err && !loading && (
        <p className="text-danger">No se pudo cargar el catálogo: {err}</p>
      )}

      {!loading && !err && (
        <section className="seccion-libros">
          {filtrados.length > 0 ? (
            filtrados.map((libro) => (
              <BloqueTema
                key={libro.id ?? `${libro.titulo}-${libro.autor}`}
                {...libro}
                // IMPORTANTÍSIMO: NO hardcodeamos localhost
                portada={resolveCoverSrc(libro)}
              />
            ))
          ) : (
            <p>
              No se encontraron libros {q ? `para “${busqueda}”` : "en el catálogo"}.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
