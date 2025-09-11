// src/middlewares/validation.middleware.ts
import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1) Intento con el “envoltorio” { body, params, query }
    const packet = { body: req.body, params: req.params, query: req.query };
    let result = schema.safeParse(packet);

    // 2) Si no matchea, intento con formato plano (solo body)
    if (!result.success) {
      result = schema.safeParse(req.body);
    }

    // 3) Si sigue fallando, devuelvo 400 con errores formateados
    if (!result.success) {
      const errors = result.error.issues.map(i => ({
        field: i.path.join('.') || 'body',
        message: i.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors,
      });
    }

    // 4) Si validó: normalizo y sobreescribo req.* con lo saneado
    const data: any = result.data;

    if (data && (data.body !== undefined || data.params !== undefined || data.query !== undefined)) {
      if (data.body   !== undefined) req.body   = data.body;
      if (data.params !== undefined) req.params = data.params;
      if (data.query  !== undefined) req.query  = data.query;
    } else {
      // Caso “plano”: el data ES el body
      req.body = data;
    }

    next();
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
