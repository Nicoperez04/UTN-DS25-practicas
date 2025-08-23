// ejemplo: src/routes/ficcion.routes.ts
import { Router } from 'express';
import {
  obtenerLibrosFiccion,
  obtenerLibroFiccion,
  crearLibroFiccion,
  actualizarLibroFiccion,
  eliminarLibroFiccion,
} from '../controllers/ficcion.controllers';

const router = Router();
router.get('/', obtenerLibrosFiccion); // obtiene todos los libros
router.get('/:id', obtenerLibroFiccion); // aca solo uno
router.post('/', crearLibroFiccion); // aca crea el libro
router.put('/:id', actualizarLibroFiccion); // aca actualiza el libro
router.delete('/:id', eliminarLibroFiccion); // aca elimina el libro
export default router;
