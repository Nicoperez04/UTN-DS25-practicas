// src/services/books.service.ts
// CRUD de Libros + búsqueda/paginación.
// Usa campo 'categoria' (enum Categoria) y prisma.$transaction.
// Maneja conflicto único (P2002) en create/update.

import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

const ALLOWED_CATEGORIES = ['DEPORTE', 'FICCION', 'HISTORIA', 'INFANTIL'] as const;
type CategoriaStr = typeof ALLOWED_CATEGORIES[number];

function normalizeCategoria(input?: string | null): CategoriaStr | undefined {
  if (!input) return undefined;
  const v = input.trim().toUpperCase();
  return (ALLOWED_CATEGORIES as readonly string[]).includes(v) ? (v as CategoriaStr) : undefined;
}

export type ListBooksParams = {
  q?: string;
  categoria?: string;   // enum Categoria
  page?: number;        // 1-based
  pageSize?: number;    // tamaño de página
};

export async function listBooks(params: ListBooksParams) {
  const page = Math.max(1, Number(params.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize || 20)));

  const and: any[] = [];

  if (params.q && params.q.trim()) {
    const q = params.q.trim();
    and.push({
      OR: [
        { titulo: { contains: q, mode: 'insensitive' } },
        { autor:  { contains: q, mode: 'insensitive' } },
      ],
    });
  }

  const cat = normalizeCategoria(params.categoria);
  if (cat) and.push({ categoria: cat });

  const where = and.length ? { AND: and } : {};

  const [total, data] = await prisma.$transaction([
    prisma.book.count({ where }),
    prisma.book.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return { data, total, page, pageSize };
}

export async function getBookById(id: number) {
  return prisma.book.findUnique({ where: { id } });
}

export type CreateBookInput = {
  titulo: string;
  autor: string;
  categoria: string;        // requerido por tu schema
  descripcion?: string | null;
  portada?: string | null;
  authorId?: number | null;
};

export async function createBook(payload: CreateBookInput) {
  const categoria = normalizeCategoria(payload.categoria);
  if (!categoria) {
    throw new Error('Categoria inválida. Valores: ' + ALLOWED_CATEGORIES.join(', '));
  }

  try {
    return await prisma.book.create({
      data: {
        titulo: payload.titulo,
        autor: payload.autor,
        categoria,
        descripcion: payload.descripcion ?? null,
        portada: payload.portada ?? null,
        authorId: payload.authorId ?? null,
      },
    });
  } catch (e: any) {
    // P2002 = unique constraint (titulo, autor, categoria)
    if (e?.code === 'P2002') {
      throw Object.assign(new Error('Ya existe un libro con mismo título/autor/categoría'), { status: 409 });
    }
    throw e;
  }
}

export type UpdateBookInput = Partial<CreateBookInput>;

export async function updateBook(id: number, payload: UpdateBookInput) {
  const data: any = { ...payload };

  if (payload.categoria !== undefined) {
    const categoria = normalizeCategoria(payload.categoria);
    if (!categoria) {
      throw new Error('Categoria inválida. Valores: ' + ALLOWED_CATEGORIES.join(', '));
    }
    data.categoria = categoria;
  }

  try {
    return await prisma.book.update({ where: { id }, data });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      throw Object.assign(new Error('Ya existe un libro con mismo título/autor/categoría'), { status: 409 });
    }
    throw e;
  }
}

export async function deleteBook(id: number) {
  await prisma.book.delete({ where: { id } });
}
