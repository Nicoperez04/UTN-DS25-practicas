// src/utils/sections.ts
// Traductor de el tema de las categorias
import { Prisma } from '@prisma/client';
import type { Seccion } from '../types/book.types';
import { $Enums } from '../generated/prisma';

// Categoria (DB) -> Seccion (API)
export function fromCategoria(c: $Enums.Categoria): Seccion {
  switch (c) {
    case 'FICCION':  return 'ficcion';
    case 'DEPORTE':  return 'deporte';
    case 'HISTORIA': return 'historia';
    case 'INFANTIL': return 'infantil';
  }
}

// Seccion (API) -> Categoria (DB)
export function toCategoria(s: Seccion): $Enums.Categoria {
  switch (s) {
    case 'ficcion':  return 'FICCION';
    case 'deporte':  return 'DEPORTE';
    case 'historia': return 'HISTORIA';
    case 'infantil': return 'INFANTIL';
  }
}
