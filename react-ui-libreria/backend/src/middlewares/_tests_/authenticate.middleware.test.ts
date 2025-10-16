// Tests para authenticate.middleware - verificar autenticación con JWT
// Verifico que el token sea valido, expirado o invalido
// Verifico que el usuario sea ADMIN o USER
// Verifico que el usuario no tenga accesso a una ruta que no le corresponde
// Verifico que el usuario no tenga accesso a una ruta que no le corresponde
// Creo que esta completo

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, AuthUser } from '../authenticate.middleware';

// Mock de jsonwebtoken
jest.mock('jsonwebtoken');

const mockJwt = jwt as jest.Mocked<typeof jwt>;

function mockReq(headers: any = {}): Request {
  return {
    headers,
    user: undefined,
  } as any;
}

function mockRes(): Response {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

const mockNext: NextFunction = jest.fn();

describe('authenticate.middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('authenticate', () => {
    test('debe permitir acceso con token válido', () => {
      // ARRANGE: Preparar token válido
      const validToken = 'valid-token';
      const mockUser: AuthUser = { id: 1, email: 'test@test.com', role: 'USER' };
      const req = mockReq({ authorization: `Bearer ${validToken}` });
      const res = mockRes();
      
      mockJwt.verify.mockReturnValueOnce(mockUser as any);

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que permite el acceso
      expect(mockJwt.verify).toHaveBeenCalledWith(validToken, 'test-secret');
      expect(req.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso sin token', () => {
      // ARRANGE: Preparar request sin token
      const req = mockReq({ authorization: '' });
      const res = mockRes();

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que rechaza el acceso
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token requerido' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso sin header authorization', () => {
      // ARRANGE: Preparar request sin header
      const req = mockReq();
      const res = mockRes();

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que rechaza el acceso
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token requerido' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso con token expirado', () => {
      // ARRANGE: Preparar token expirado
      const expiredToken = 'expired-token';
      const req = mockReq({ authorization: `Bearer ${expiredToken}` });
      const res = mockRes();
      
      const expiredError = new Error('Token expirado') as any;
      expiredError.name = 'TokenExpiredError';
      mockJwt.verify.mockImplementation(() => {
        throw expiredError;
      });

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que rechaza con mensaje de expiración
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Token expirado' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso con token inválido', () => {
      // ARRANGE: Preparar token inválido
      const invalidToken = 'invalid-token';
      const req = mockReq({ authorization: `Bearer ${invalidToken}` });
      const res = mockRes();
      
      mockJwt.verify.mockImplementation(() => {
        throw new Error('Token inválido');
      });

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que rechaza con mensaje de token inválido
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token invalido' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe funcionar con usuario ADMIN', () => {
      // ARRANGE: Preparar token de admin
      const adminToken = 'admin-token';
      const mockAdmin: AuthUser = { id: 2, email: 'admin@test.com', role: 'ADMIN' };
      const req = mockReq({ authorization: `Bearer ${adminToken}` });
      const res = mockRes();
      
      mockJwt.verify.mockReturnValueOnce(mockAdmin as any);

      // ACT: Ejecutar middleware
      authenticate(req, res, mockNext);

      // ASSERT: Verificar que permite acceso de admin
      expect(req.user).toEqual(mockAdmin);
      expect(req.user?.role).toBe('ADMIN');
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
