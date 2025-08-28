// Router de INFANTIL
import { Router } from 'express';
import * as ctrl from '../controllers/infantil.controllers';
import { validate, validateParams } from '../middlewares/validation.middleware';
import {
  createBookSchema,
  updateBookSchema,
  idParamSchema,
} from '../validations/book.validation';

const router = Router();

router.get('/', ctrl.obtenerLibrosInfantil); //aca obtiene todos los libros
router.get('/:id', validateParams(idParamSchema), ctrl.obtenerLibroInfantil); //aca obtiene un libro solo y agregue lo de la validacion para el id
router.post('/', validate(createBookSchema), ctrl.crearLibroInfantil); // aca crea un libro y valida con el schema que hice con Zod
router.put('/:id', validateParams(idParamSchema), validate(updateBookSchema), ctrl.actualizarLibroInfantil); // lo mismo aca pero para actualizarlo, usa el parcial creo
router.delete('/:id', validateParams(idParamSchema), ctrl.eliminarLibroInfantil); // y aca elimina un libro

export default router;
