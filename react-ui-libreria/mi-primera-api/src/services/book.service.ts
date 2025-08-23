// src/services/book.service.ts
// -------------------------------------------------------------
// Este service encapsula TODO el acceso a datos de "Book" con Prisma.
// Las secciones (ficcion, deporte, historia, infantil) solo delegan en este service.
// -------------------------------------------------------------
import prisma from '../config/prisma';

import type { Book as PrismaBook } from '../generated/prisma';
import { Categoria as CategoriaEnum } from '../generated/prisma';

// Esto es segun chat gpt un truco de tipado robusto para el enum (evita diferencias entre versiones de Prisma)
type TCategoria = (typeof CategoriaEnum)[keyof typeof CategoriaEnum];

import { CreateBookRequest, UpdateBookRequest } from '../types/book.types';

/** Lista todos los libros de una categoría (para /api/ficcion, /api/deporte, etc.) */
export async function getAllByCategoria(cat: TCategoria): Promise<PrismaBook[]> {
  return prisma.book.findMany({
    where: { categoria: cat },
    orderBy: { id: 'asc' }, // orden estable para el front
  });
}

/** Obtiene un libro por id, validando que pertenezca a esa categoria */
export async function getById(id: number, cat: TCategoria): Promise<PrismaBook | null> {
  return prisma.book.findFirst({ where: { id, categoria: cat } });
}

/** Crea un libro dentro de una categoria */
export async function create(cat: TCategoria, data: CreateBookRequest): Promise<PrismaBook> {
  // Validación básica de negocio
  if (!data.titulo?.trim() || !data.autor?.trim()) {
    const err: any = new Error('titulo y autor son obligatorios');
    err.statusCode = 400;
    throw err;
  }
  return prisma.book.create({ data: { ...data, categoria: cat, descripcion: data.descripcion ?? "" } });
}

/** Actualiza campos opcionales; primero confirmamos existencia en esa categoria */
export async function update(
  id: number,
  cat: TCategoria,
  patch: UpdateBookRequest
): Promise<PrismaBook> {
  const found = await getById(id, cat);
  if (!found) {
    const err: any = new Error('Book not found');
    err.statusCode = 404;
    throw err;
  }
  return prisma.book.update({
    where: { id },
    data: {
      ...(patch.titulo      !== undefined ? { titulo:      patch.titulo } : {}),
      ...(patch.autor       !== undefined ? { autor:       patch.autor } : {}),
      ...(patch.descripcion !== undefined ? { descripcion: patch.descripcion } : {}),
    },
  });
}

/** Elimina un libro dentro de la categoria dada */
export async function remove(id: number, cat: TCategoria): Promise<void> {
  const found = await getById(id, cat);
  if (!found) {
    const err: any = new Error('Book not found');
    err.statusCode = 404;
    throw err;
  }
  await prisma.book.delete({ where: { id } });
}

export const CATS = CategoriaEnum; // CATS.FICCION, CATS.DEPORTE, CATS.HISTORIA, CATS.INFANTIL
