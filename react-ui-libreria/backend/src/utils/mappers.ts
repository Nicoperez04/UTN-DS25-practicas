// src/utils/mappers.ts
import type { Book as PrismaBook } from '../generated/prisma';
import type { BookDTO } from '../types/book.types';
import { fromCategoria } from './sections';

// Mapear un registro Prisma (DB) al tipo que expone la API (DTO)
export function mapBookToDTO(b: PrismaBook): BookDTO {
  return {
    id: b.id, 
    titulo: b.titulo,
    autor: b.autor,
    descripcion: b.descripcion ?? null,
    seccion: fromCategoria(b.categoria),
  };
}
