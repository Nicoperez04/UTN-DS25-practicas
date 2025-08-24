// Router de DEPORTE
import { Router } from 'express';
import {
  obtenerLibrosDeporte,
  obtenerLibroDeporte,
  crearLibroDeporte,
  actualizarLibroDeporte,
  eliminarLibroDeporte,
} from '../controllers/deporte.controllers';

const router = Router();

router.get('/', obtenerLibrosDeporte);
router.get('/:id', obtenerLibroDeporte);
router.post('/', crearLibroDeporte);
router.put('/:id', actualizarLibroDeporte);
router.delete('/:id', eliminarLibroDeporte);

export default router;
