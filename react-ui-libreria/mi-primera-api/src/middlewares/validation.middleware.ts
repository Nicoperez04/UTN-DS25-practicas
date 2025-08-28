// src/middlewares/validation.middleware.ts
import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Valida req.body contra un esquema Zod que dsp lo defino en validations
export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Datos inválidos',
          errors: err.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
        });
      }
      next(err);
    }
  };
};

// Valida req.params, esto me lo recomendo la IA, y sirve para validar los parámetros de la ruta
export const validateParams = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedParams = await schema.parseAsync(req.params);
      Object.assign(req.params, parsedParams);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Parámetros inválidos',
          errors: err.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
        });
      }
      next(err);
    }
  };
};
