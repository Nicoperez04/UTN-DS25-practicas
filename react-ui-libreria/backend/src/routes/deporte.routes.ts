// Router de DEPORTE
import { Router } from 'express';
import * as ctrl from '../controllers/deporte.controllers';
import { validate, validateParams } from '../middlewares/validation.middleware';
import {
  createBookSchema,
  updateBookSchema,
  idParamSchema,
} from '../validations/book.validation';

const router = Router();

router.get('/', ctrl.obtenerLibrosDeporte); //aca obtiene todos los libros
router.get('/:id', validateParams(idParamSchema), ctrl.obtenerLibroDeporte); //aca obtiene un libro solo y agregue lo de la validacion para el id
router.post('/', validate(createBookSchema), ctrl.crearLibroDeporte); // aca crea un libro y valida con el schema que hice con Zod
router.put('/:id', validateParams(idParamSchema), validate(updateBookSchema), ctrl.actualizarLibroDeporte); // lo mismo aca pero para actualizarlo, usa el parcial creo
router.delete('/:id', validateParams(idParamSchema), ctrl.eliminarLibroDeporte); // y aca elimina un libro

export default router;