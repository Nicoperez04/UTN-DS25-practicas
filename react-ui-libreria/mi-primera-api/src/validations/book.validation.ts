import { z } from 'zod';

// Validacion para cuando creo el broli
export const createBookSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es requerido').max(200),
  autor: z.string().trim().min(1, 'El autor es requerido').max(120),
  descripcion: z.string().trim().max(2000).optional(),
  portada: z.string().trim().max(400).optional(), // aca cree algunas cosas por poner algo pero podrian ser otras validaciones mas utiles
});

// Esto lo que hace es permitir actualizar parcialmente un libro osea cuando lo crea
// se tienen que cumplir todas pero cuando lo actualiza puede enviar solo los campos que quiere modificar y esos validda ZOD
export const updateBookSchema = createBookSchema.partial();

// Chequea que el id este bien o lo convierte por si recibe algo raro
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(), // convierte "123" → 123 y valida ponele
});

// Esto lo vi como algo que estaria bueno que me recomendo la ia de copilot, pero por ahi lo saco
export const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),  // 1..N
  size: z.coerce.number().int().positive().max(100).optional(),
  orderBy: z.enum(['titulo', 'autor', 'createdAt']).optional(),
  dir: z.enum(['asc', 'desc']).optional(),
  q: z.string().trim().optional(),
});
