// src/controllers/books.controller.ts
import { Request, Response } from 'express';
import {
  listBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../services/books.service';

export async function getBooksHandler(req: Request, res: Response) {
  const { q, categoria, page, pageSize } = req.query;

  const result = await listBooks({
    q: typeof q === 'string' ? q : undefined,
    categoria: typeof categoria === 'string' ? categoria : undefined,
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
  });

  return res.json(result);
}

export async function getBookHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

  const data = await getBookById(id);
  if (!data) return res.status(404).json({ error: 'Libro no encontrado' });

  return res.json({ data });
}

export async function createBookHandler(req: Request, res: Response) {
  try {
    const created = await createBook(req.body);
    return res.status(201).json({ data: created });
  } catch (e: any) {
    const status = e?.status ?? 400;
    return res.status(status).json({ error: e?.message ?? 'Error al crear libro' });
  }
}

export async function updateBookHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

  try {
    const updated = await updateBook(id, req.body);
    return res.json({ data: updated });
  } catch (e: any) {
    const status = e?.status ?? 400;
    return res.status(status).json({ error: e?.message ?? 'Error al actualizar libro' });
  }
}

export async function deleteBookHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

  await deleteBook(id);
  return res.status(204).send();
}
