// src/utils/sections.ts
// Traductor de el tema de las categorias
import { Categoria } from '../generated/prisma';
import type { Seccion } from '../types/book.types';

// Categoria (DB) -> Seccion (API)
export function fromCategoria(c: Categoria): Seccion {
  switch (c) {
    case 'FICCION':  return 'ficcion';
    case 'DEPORTE':  return 'deporte';
    case 'HISTORIA': return 'historia';
    case 'INFANTIL': return 'infantil';
  }
}

// Seccion (API) -> Categoria (DB)
export function toCategoria(s: Seccion): Categoria {
  switch (s) {
    case 'ficcion':  return 'FICCION';
    case 'deporte':  return 'DEPORTE';
    case 'historia': return 'HISTORIA';
    case 'infantil': return 'INFANTIL';
  }
}
