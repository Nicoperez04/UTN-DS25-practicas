// src/Componentes/Catalogo.jsx
import React, { useEffect, useMemo, useState } from "react";
import BloqueTema from "./BloqueTema";

/* ---------- Normalización de categoría e imágenes (igual filosofía que Section.jsx) ---------- */
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

  if (typeof portada === "string" && /^https?:\/\//i.test(portada)) {
    const pathOnly = absoluteToPublicPath(portada);
    if (pathOnly) return pathOnly;
  }

  if (typeof portada === "string" && portada) {
    if (/^\/?imagenes\//i.test(portada) || /^\/?Imagenes\//.test(portada)) {
      let p = portada.replace(/^\/?imagenes\//i, "/Imagenes/");
      if (!p.startsWith("/")) p = `/${p}`;
      return p;
    }
    const cat = normalizeCategory(libro?.categoria);
    const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
    return `/Imagenes/${dir}/${portada}`;
  }

  const cat = normalizeCategory(libro?.categoria);
  const dir = CATEGORY_DIR[cat] || CATEGORY_DIR.RESTO;
  return `/Imagenes/${dir}/${DEFAULT_IMAGE}`;
}

/* ----------------------------------- Catálogo ----------------------------------- */
export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // En prod: usa VITE_API_URL (que incluye /api), en dev: usa proxy /api
  const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const PATH = (import.meta.env.VITE_API_LIBROS_PATH || "/libros").replace(/^\/?/, "/");
  const endpoint = BASE ? `${BASE}${PATH}` : `/api${PATH}`;

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("pageSize", "1000"); // cualquier número > total (24)
        params.set("t", String(Date.now())); // cache-buster

        const url = `${endpoint}?${params.toString()}`;

        console.info("[Catalogo] GET", url);
        const resp = await fetch(url, {
          signal: controller.signal,
          cache: "no-store",
          mode: "cors",
          // credentials: "include", // <- SOLO si tu login usa cookies/sesión (ver nota abajo)
          headers: {
            Accept: "application/json", // <-- único header necesario
          },
        });

        if (resp.status === 304) {
          const resp2 = await fetch(`${endpoint}?t=${Date.now() + 1}`, {
            signal: controller.signal,
            cache: "no-store",
            mode: "cors",
            headers: { Accept: "application/json" },
          });
          if (!resp2.ok) throw new Error(`HTTP ${resp2.status}`);
          const data2 = await resp2.json();
          setLibros(Array.isArray(data2) ? data2 : Array.isArray(data2?.data) ? data2.data : []);
        } else {
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const data = await resp.json();
          setLibros(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
        }
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Error al cargar catálogo");
        setLibros([]);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [endpoint]);

  const q = busqueda.toLowerCase().trim();

  const filtrados = useMemo(() => {
    return (libros || [])
      .filter(Boolean)
      .filter((libro) => {
        const t = (libro.titulo ?? "").toLowerCase();
        const a = (libro.autor ?? "").toLowerCase();
        const s = (libro.seccion ?? libro.genero ?? libro.categoria ?? "").toLowerCase();
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
        <p className="text-danger">
          No se pudo cargar el catálogo: {err}
          <br />
          <small className="text-muted">Endpoint usado: <code>{endpoint}</code></small>
        </p>
      )}

      {!loading && !err && (
        <section className="seccion-libros">
          {filtrados.length > 0 ? (
            filtrados.map((libro, i) => (
              <BloqueTema
                key={libro.id ?? `${libro.titulo}-${i}`}
                {...libro}
                portada={resolveCoverSrc(libro)}
              />
            ))
          ) : (
            <p>No se encontraron libros {q ? `para “${busqueda}”` : "en el catálogo"}.</p>
          )}
        </section>
      )}
    </main>
  );
}
