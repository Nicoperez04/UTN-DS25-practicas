// Capa HTTP de DEPORTE.

import { Request, Response, NextFunction } from 'express';
import * as Deporte from '../services/deporte.service';

export async function obtenerLibrosDeporte(_req: Request, res: Response, next: NextFunction) {
  try {
    const libros = await Deporte.getAll();
    res.json(libros);
  } catch (e) { next(e); }
}

export async function obtenerLibroDeporte(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const libro = await Deporte.getById(id);
    if (!libro) return res.status(404).json({ error: 'Book not found' });

    res.json(libro);
  } catch (e) { next(e); }
}

export async function crearLibroDeporte(req: Request, res: Response, next: NextFunction) {
  try {
    const creado = await Deporte.create(req.body);
    res.status(201).json(creado);
  } catch (e) { next(e); }
}

export async function actualizarLibroDeporte(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const actualizado = await Deporte.update(id, req.body);
    res.json(actualizado);
  } catch (e) { next(e); }
}

export async function eliminarLibroDeporte(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    await Deporte.remove(id);
    res.status(204).send();
  } catch (e) { next(e); }
}

