// Capa HTTP de INFANTIL.

import { Request, Response, NextFunction } from 'express';
import * as Infantil from '../services/infantil.service';

export async function obtenerLibrosInfantil(_req: Request, res: Response, next: NextFunction) {
  try {
    const libros = await Infantil.getAll();
    res.json(libros);
  } catch (e) { next(e); }
}

export async function obtenerLibroInfantil(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const libro = await Infantil.getById(id);
    if (!libro) return res.status(404).json({ error: 'Book not found' });

    res.json(libro);
  } catch (e) { next(e); }
}

export async function crearLibroInfantil(req: Request, res: Response, next: NextFunction) {
  try {
    const creado = await Infantil.create(req.body);
    res.status(201).json(creado);
  } catch (e) { next(e); }
}

export async function actualizarLibroInfantil(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const actualizado = await Infantil.update(id, req.body);
    res.json(actualizado);
  } catch (e) { next(e); }
}

export async function eliminarLibroInfantil(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    await Infantil.remove(id);
    res.status(204).send();
  } catch (e) { next(e); }
}
