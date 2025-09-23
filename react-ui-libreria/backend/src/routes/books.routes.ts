import { Router } from 'express';
import {
  getBooksHandler,
  getBookHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from '../controllers/books.controller';

// ✅ Usa los mismos nombres que exporta tu book.validation.ts
import {
  listQuerySchema,   // <- era esto, no listBooksQuerySchema
  idParamSchema,
  createBookSchema,
  updateBookSchema,
} from '../validations/book.validation';

// ✅ Tu middleware de validación (1 solo argumento)
import { validate } from '../middlewares/validation.middleware';

// ✅ Tus middlewares de auth (como en deporte)
import { authenticate } from '../middlewares/authenticate.middleware';
import { authorize } from '../middlewares/authorize.middleware';

export const booksRouter = Router();

// GET /api/libros?q=&categoria=&page=&pageSize=
booksRouter.get(
  '/libros',
  validate(listQuerySchema),     // valida req.query (tu middleware ya sabe de dónde leer)
  getBooksHandler
);

// GET /api/libros/:id
booksRouter.get(
  '/libros/:id',
  validate(idParamSchema),       // valida req.params
  getBookHandler
);

// POST /api/libros   (protegido, igual que deporte)
/*booksRouter.post(
  '/libros',
  authenticate,
  authorize('ADMIN'),
  validate(createBookSchema),    // valida req.body
  createBookHandler
);*/
booksRouter.post('/libros', validate(createBookSchema), createBookHandler);

// PUT /api/libros/:id  (protegido)
booksRouter.put(
  '/libros/:id',
  authenticate,
  authorize('ADMIN'),
  validate(idParamSchema),       // params
  validate(updateBookSchema),    // body
  updateBookHandler
);

// PATCH /api/libros/:id  (protegido)
booksRouter.patch(
  '/libros/:id',
  authenticate,
  authorize('ADMIN'),
  validate(idParamSchema),
  validate(updateBookSchema),
  updateBookHandler
);

// DELETE /api/libros/:id  (protegido)
booksRouter.delete(
  '/libros/:id',
  authenticate,
  authorize('ADMIN'),
  validate(idParamSchema),
  deleteBookHandler
);
