import { Router } from 'express';
import {
  getBooksHandler,
  getBookHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from '../controllers/books.controller';

import {
  listQuerySchema,  
  idParamSchema,
  createBookSchema,
  updateBookSchema,
} from '../validations/book.validation';

import { validate } from '../middlewares/validation.middleware';

import { authenticate } from '../middlewares/authenticate.middleware';
import { authorize } from '../middlewares/authorize.middleware';

export const booksRouter = Router();

// GET /api/libros?q=&categoria=&page=&pageSize=
booksRouter.get(
  '/libros',
  validate(listQuerySchema),     
  getBooksHandler
);

// GET /api/libros/:id
booksRouter.get(
  '/libros/:id',
  validate(idParamSchema),       // valida req.params
  getBookHandler
);

// POST /api/libros   
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
