import { Request, Response } from 'express';
import { getLibrosFiccion } from '../services/ficcion.service';

export function obtenerLibrosFiccion(req: Request, res: Response) {
  res.json(getLibrosFiccion());
}
