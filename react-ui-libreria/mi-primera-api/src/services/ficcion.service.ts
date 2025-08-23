import { CATS } from './book.service';
import * as Book from './book.service';
import { CreateBookRequest, UpdateBookRequest } from '../types/book.types';

// Fijamos la categoría de esta sección:
const CAT = CATS.FICCION;

// Exportamos un set de funciones claras. Si tus controllers usan otros nombres,
// podés agregar alias abajo (ver comentario).
export const getAll  = () => Book.getAllByCategoria(CAT);
export const getById = (id: number) => Book.getById(id, CAT);
export const create  = (data: CreateBookRequest) => Book.create(CAT, data);
export const update  = (id: number, patch: UpdateBookRequest) => Book.update(id, CAT, patch);
export const remove  = (id: number) => Book.remove(id, CAT);
