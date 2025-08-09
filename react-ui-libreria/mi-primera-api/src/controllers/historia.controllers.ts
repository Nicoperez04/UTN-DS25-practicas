import { Request, Response } from 'express';
import { getLibrosHistoria } from '../services/historia.service';

// Controlador que responde a la solicitud GET /api/historia
// Su función es obtener los datos desde el service y enviarlos como JSON
export function obtenerLibrosHistoria(req: Request, res: Response) {
  res.json(getLibrosHistoria());
}
