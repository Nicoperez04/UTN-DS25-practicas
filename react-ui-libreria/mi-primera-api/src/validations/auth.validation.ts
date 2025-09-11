import { z } from 'zod';

/**
 * LOGIN
 * Valida credenciales básicas.
 * - email normalizado (lowercase + trim) y formato válido
 * - password como string (las reglas de complejidad no aplican acá; ya la exigimos al crear/actualizar usuario)
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido').toLowerCase().trim(),
    password: z.string(),
  }),
});

/**
 * CREATE USER
 * Reglas fuertes para cada campo:
 * - password con mínimo 8, 1 mayuscula y 1 numero
 * - role con default 'USER' por si se manda cagada el usuario ingresandolo
 */
export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido').toLowerCase().trim(),
    password: z.string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    name: z.string()
      .min(2, 'Mínimo 2 caracteres')
      .max(50, 'Máximo 50 caracteres')
      .trim()
      .optional(),
    role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
  }),
});

/**
 * UPDATE USER
 * Todos los campos opcionales; params.id se fuerza a number con coerce.
 */
export const updateUserSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    email: z.string().email('Email inválido').toLowerCase().trim().optional(),
    password: z.string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .optional(),
    name: z.string()
      .min(2, 'Mínimo 2 caracteres')
      .max(50, 'Máximo 50 caracteres')
      .trim()
      .optional(),
    role: z.enum(['USER', 'ADMIN']).optional(),
  }),
});

/** Tipos útiles para controllers/services */
export type LoginBody       = z.infer<typeof loginSchema>['body'];
export type CreateUserBody  = z.infer<typeof createUserSchema>['body'];
export type UpdateUserBody  = z.infer<typeof updateUserSchema>['body'];
export type UserIdParam     = z.infer<typeof updateUserSchema>['params'];
