import { Router } from 'express';
import { obtenerLibrosInfantil } from '../controllers/infantil.controllers';

// Creamos un router para las rutas de la sección Infantil
const router = Router();

// Ruta GET para listar todos los libros infantiles
// Endpoint: /api/infantil
router.get('/', obtenerLibrosInfantil);

export default router;
