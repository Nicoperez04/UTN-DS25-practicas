// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth.service';

export async function loginController(req: Request, res: Response, next: NextFunction) {
 try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch {
    // Respuesta generica (no revelo que es lo que falla, si email o contraseña)
    return res.status(401).json({ message: 'Email o password incorrectos' });
  }
}
