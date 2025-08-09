import { Router } from 'express';
import { obtenerLibrosHistoria } from '../controllers/historia.controllers';

// Creamos un router para agrupar las rutas relacionadas con Historia
const router = Router();

// Ruta para obtener todos los libros de historia
// GET /api/historia
router.get('/', obtenerLibrosHistoria);

export default router;
