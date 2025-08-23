// Router de HISTORIA
import { Router } from 'express';
import {
  obtenerLibrosHistoria,
  obtenerLibroHistoria,
  crearLibroHistoria,
  actualizarLibroHistoria,
  eliminarLibroHistoria,
} from '../controllers/historia.controllers';

const router = Router();

router.get('/', obtenerLibrosHistoria);
router.get('/:id', obtenerLibroHistoria);
router.post('/', crearLibroHistoria);
router.put('/:id', actualizarLibroHistoria);
router.delete('/:id', eliminarLibroHistoria);

export default router;
