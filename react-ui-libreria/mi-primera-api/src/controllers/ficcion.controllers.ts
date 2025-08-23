// src/controllers/ficcion.controllers.ts
// Explicacion de esto que hago: ahora el service es asincrono (porque basicamenteee estoy con una BD usando). Por eso usamos async/await
// y try/catch para enviar errores al middleware central (next).
import { Request, Response, NextFunction } from 'express';
import * as Ficcion from '../services/ficcion.service';

export async function obtenerLibrosFiccion(_req: Request, res: Response, next: NextFunction) {
  try {
    const libros = await Ficcion.getAll(); // await porque consulta la DB
    res.json(libros);
  } catch (e) { next(e); }
}

export async function obtenerLibroFiccion(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const libro = await Ficcion.getById(id);
    if (!libro) return res.status(404).json({ error: 'Book not found' });

    res.json(libro);
  } catch (e) { next(e); }
}

export async function crearLibroFiccion(req: Request, res: Response, next: NextFunction) {
  try {
    const creado = await Ficcion.create(req.body);
    res.status(201).json(creado);
  } catch (e) { next(e); }
}

export async function actualizarLibroFiccion(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    const actualizado = await Ficcion.update(id, req.body);
    res.json(actualizado);
  } catch (e) { next(e); }
}

export async function eliminarLibroFiccion(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' });

    await Ficcion.remove(id);
    res.status(204).send();
  } catch (e) { next(e); }
}
