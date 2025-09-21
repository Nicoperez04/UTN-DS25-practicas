import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';

type JWTRole = 'USER' | 'ADMIN';
type JWTPayload = { 
    sub: number;
    email: string; 
    role: JWTRole;
};

export async function loginService(email: string, password: string) {
    // 1) Buscar usuario por email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // No revelamos si el email existe (buena práctica de seguridad segun la IA)
    throw new Error('Credenciales inválidas');
  }

  // 2) Comparar contraseña
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Credenciales inválidas');

  // 3) Firmar JWT
  const JWT_SECRET = process.env.JWT_SECRET as Secret | undefined;
  if (!JWT_SECRET) {
    throw new Error('Falta JWT_SECRET en .env');
  }
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '2h';

  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    // No agrego el name asi queda mas chico, supuestamente es una buena practica
    role: user.role as JWTRole,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN } as SignOptions);

  // 4) Devolver info segura (sin hash)
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
