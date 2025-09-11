// src/middlewares/authorize.middleware.ts
import type { Request, Response, NextFunction } from 'express';

export function authorize(...rolesPermitidos: Array<'ADMIN' | 'USER'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ message: 'No autenticado' });
    if (!rolesPermitidos.includes(role)) {
      return res.status(403).json({ message: 'No autorizado para esta acción' });
    }
    next();
  };
}
