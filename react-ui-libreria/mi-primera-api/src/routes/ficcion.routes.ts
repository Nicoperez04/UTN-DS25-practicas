import { Router } from 'express';
import { obtenerLibrosFiccion } from '../controllers/ficcion.controllers';

const router = Router();

router.get('/', obtenerLibrosFiccion);

export default router;
