// Tests para authorize.middleware - verificar control de acceso por roles
// Verifico que el usuario tenga el rol permitido
// Verifico que el usuario no tenga el rol permitido
// Verifico que el usuario no este autenticado
// Verifico que el usuario no tenga accesso a una ruta que no le corresponde


import { Request, Response, NextFunction } from 'express';
import { authorize } from '../authorize.middleware';

function mockReq(user?: any): Request {
  return {
    user,
  } as any;
}

function mockRes(): Response {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

const mockNext: NextFunction = jest.fn();

describe('authorize.middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    test('debe permitir acceso cuando usuario tiene rol permitido', () => {
      // ARRANGE: Preparar usuario con rol ADMIN
      const adminUser = { id: 1, email: 'admin@test.com', role: 'ADMIN' };
      const req = mockReq(adminUser);
      const res = mockRes();
      const authorizeAdmin = authorize('ADMIN');

      // ACT: Ejecutar middleware
      authorizeAdmin(req, res, mockNext);

      // ASSERT: Verificar que permite el acceso
      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('debe permitir acceso cuando usuario USER tiene permiso', () => {
      // ARRANGE: Preparar usuario con rol USER
      const normalUser = { id: 2, email: 'user@test.com', role: 'USER' };
      const req = mockReq(normalUser);
      const res = mockRes();
      const authorizeUser = authorize('USER');

      // ACT: Ejecutar middleware
      authorizeUser(req, res, mockNext);

      // ASSERT: Verificar que permite el acceso
      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso cuando usuario no está autenticado', () => {
      // ARRANGE: Preparar request sin usuario
      const req = mockReq();
      const res = mockRes();
      const authorizeAdmin = authorize('ADMIN');

      // ACT: Ejecutar middleware
      authorizeAdmin(req, res, mockNext);

      // ASSERT: Verificar que rechaza el acceso
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'No autenticado' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso cuando usuario USER intenta acceder a ruta ADMIN', () => {
      // ARRANGE: Preparar usuario USER intentando acceder a ruta ADMIN
      const normalUser = { id: 2, email: 'user@test.com', role: 'USER' };
      const req = mockReq(normalUser);
      const res = mockRes();
      const authorizeAdmin = authorize('ADMIN');

      // ACT: Ejecutar middleware
      authorizeAdmin(req, res, mockNext);

      // ASSERT: Verificar que rechaza el acceso
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'No autorizado para esta acción' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('debe permitir acceso cuando usuario tiene múltiples roles permitidos', () => {
      // ARRANGE: Preparar usuario ADMIN con múltiples roles permitidos
      const adminUser = { id: 1, email: 'admin@test.com', role: 'ADMIN' };
      const req = mockReq(adminUser);
      const res = mockRes();
      const authorizeMultiRole = authorize('USER', 'ADMIN');

      // ACT: Ejecutar middleware
      authorizeMultiRole(req, res, mockNext);

      // ASSERT: Verificar que permite el acceso
      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('debe rechazar acceso cuando usuario no tiene ninguno de los roles permitidos', () => {
      // ARRANGE: Preparar usuario USER con roles permitidos que no incluyen USER
      const normalUser = { id: 2, email: 'user@test.com', role: 'USER' };
      const req = mockReq(normalUser);
      const res = mockRes();
      const authorizeOnlyAdmin = authorize('ADMIN');

      // ACT: Ejecutar middleware
      authorizeOnlyAdmin(req, res, mockNext);

      // ASSERT: Verificar que rechaza el acceso
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'No autorizado para esta acción' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
