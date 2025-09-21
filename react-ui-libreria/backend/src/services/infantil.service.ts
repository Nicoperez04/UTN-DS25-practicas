import { CATS } from './book.service';
import * as Book from './book.service';
import { CreateBookRequest, UpdateBookRequest } from '../types/book.types';

const CAT = CATS.INFANTIL;

export const getAll  = () => Book.getAllByCategoria(CAT);
export const getById = (id: number) => Book.getById(id, CAT);
export const create  = (data: CreateBookRequest) => Book.create(CAT, data);
export const update  = (id: number, patch: UpdateBookRequest) => Book.update(id, CAT, patch);
export const remove  = (id: number) => Book.remove(id, CAT);
