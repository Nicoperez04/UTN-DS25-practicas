// src/middlewares/authenticate.middleware.ts
import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthUser = {
    id: number;
    email: string;
    role: 'USER' | 'ADMIN';
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
    req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,

    };
    next();
  } catch (error: any) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token invalido' });
  }
}