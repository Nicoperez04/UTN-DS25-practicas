import { Request, Response } from 'express';
import { getLibrosDeporte } from '../services/deporte.service';

// Controlador para manejar GET /api/deporte
// Su único trabajo es pedir los datos al service y responder al cliente en formato JSON
export function obtenerLibrosDeporte(req: Request, res: Response) {
  res.json(getLibrosDeporte());
}
