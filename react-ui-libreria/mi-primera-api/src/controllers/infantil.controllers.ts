import { Request, Response } from 'express';
import { getLibrosInfantil } from '../services/infantil.service';

// Controlador para manejar la solicitud GET /api/infantil
// Obtiene los datos del service y los devuelve como JSON
export function obtenerLibrosInfantil(req: Request, res: Response) {
  res.json(getLibrosInfantil());
}
