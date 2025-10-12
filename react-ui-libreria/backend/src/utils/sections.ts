// src/utils/sections.ts
// Traducción entre la categoría de DB y la "sección" que expone la API.
// Usamos uniones literales estables; NO dependemos de generated/ ni $Enums.

export type Seccion = 'ficcion' | 'deporte' | 'historia' | 'infantil';
export type Categoria = 'FICCION' | 'DEPORTE' | 'HISTORIA' | 'INFANTIL';

// Categoria (DB) -> Seccion (API)
export function fromCategoria(c: Categoria): Seccion {
  switch (c) {
    case 'FICCION':  return 'ficcion';
    case 'DEPORTE':  return 'deporte';
    case 'HISTORIA': return 'historia';
    case 'INFANTIL': return 'infantil';
    default:         return 'ficcion';
  }
}

// Seccion (API) -> Categoria (DB)
export function toCategoria(s: Seccion): Categoria {
  switch (s) {
    case 'ficcion':  return 'FICCION';
    case 'deporte':  return 'DEPORTE';
    case 'historia': return 'HISTORIA';
    case 'infantil': return 'INFANTIL';
    default:         return 'FICCION';
  }
}
