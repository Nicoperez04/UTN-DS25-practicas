import { Router } from 'express';
import * as ctrl from '../controllers/ficcion.controllers';
import { validate, validateParams } from '../middlewares/validation.middleware';
import {
  createBookSchema,
  updateBookSchema,
  idParamSchema,
} from '../validations/book.validation';

const router = Router();

router.get('/', ctrl.obtenerLibrosFiccion); //aca obtiene todos los libros
router.get('/:id', validateParams(idParamSchema), ctrl.obtenerLibroFiccion); //aca obtiene un libro solo y agregue lo de la validacion para el id
router.post('/', validate(createBookSchema), ctrl.crearLibroFiccion); // aca crea un libro y valida con el schema que hice con Zod
router.put('/:id', validateParams(idParamSchema), validate(updateBookSchema), ctrl.actualizarLibroFiccion); // lo mismo aca pero para actualizarlo, usa el parcial creo
router.delete('/:id', validateParams(idParamSchema), ctrl.eliminarLibroFiccion); // y aca elimina un libro

export default router;
