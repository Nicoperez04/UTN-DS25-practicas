import { Router } from 'express';
import { obtenerLibrosDeporte } from '../controllers/deporte.controllers';

// Creamos un router para agrupar todas las rutas relacionadas con "Deporte"
const router = Router();

// Ruta que devuelve la lista de libros de deporte
// GET /api/deporte
router.get('/', obtenerLibrosDeporte);

export default router;
