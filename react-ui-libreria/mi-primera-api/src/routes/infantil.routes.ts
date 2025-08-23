// Router de INFANTIL
import { Router } from 'express';
import {
  obtenerLibrosInfantil,
  obtenerLibroInfantil,
  crearLibroInfantil,
  actualizarLibroInfantil,
  eliminarLibroInfantil,
} from '../controllers/infantil.controllers';

const router = Router();

router.get('/', obtenerLibrosInfantil);
router.get('/:id', obtenerLibroInfantil);
router.post('/', crearLibroInfantil);
router.put('/:id', actualizarLibroInfantil);
router.delete('/:id', eliminarLibroInfantil);

export default router;
