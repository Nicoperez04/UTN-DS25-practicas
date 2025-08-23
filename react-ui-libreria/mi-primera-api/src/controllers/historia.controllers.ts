// Capa HTTP de HISTORIA.

import { Request, Response, NextFunction } from 'express';
import * as Historia from '../services/historia.service';

export async function obtenerLibrosHistoria(_req: Request, res: Response, next: NextFunction) {
  try {
    const libros = await Historia.getAll();
    res.json(libros);
  } catch (e) { next(e); }
}

export async function obtenerLibroHistoria(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const libro = await Historia.getById(id);
    if (!libro) return res.status(404).json({ error: 'Book not found' });

    res.json(libro);
  } catch (e) { next(e); }
}

export async function crearLibroHistoria(req: Request, res: Response, next: NextFunction) {
  try {
    const creado = await Historia.create(req.body);
    res.status(201).json(creado);
  } catch (e) { next(e); }
}

export async function actualizarLibroHistoria(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const actualizado = await Historia.update(id, req.body);
    res.json(actualizado);
  } catch (e) { next(e); }
}

export async function eliminarLibroHistoria(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    await Historia.remove(id);
    res.status(204).send();
  } catch (e) { next(e); }
}
