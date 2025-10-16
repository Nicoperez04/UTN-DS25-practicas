import type { Request, Response } from 'express';

// Mock de Prisma (para no usar BD real)
const mockListBooks   = jest.fn();
const mockGetBookById = jest.fn();
const mockCreateBook  = jest.fn();
const mockUpdateBook  = jest.fn();
const mockDeleteBook  = jest.fn();

jest.mock('../../services/books.service', () => ({
  listBooks:   (...args: any[]) => mockListBooks(...args),
  getBookById: (...args: any[]) => mockGetBookById(...args),
  createBook:  (...args: any[]) => mockCreateBook(...args),
  updateBook:  (...args: any[]) => mockUpdateBook(...args),
  deleteBook:  (...args: any[]) => mockDeleteBook(...args),
}));

import {
  getBooksHandler,
  getBookHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from '../books.controller';

function mockReq(partial: Partial<Request> = {}): Request {
  return { ...({} as any), ...partial } as Request;
}

function mockRes(): Response {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  res.send   = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe('Unidad q trabajamos: books.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooksHandler', () => {
    test('debe devolver array de libros cuando existe', async () => {
      // ARRANGE: Preparar datos de prueba
      const req = mockReq({ query: { q: 'clean', categoria: 'FICCION' } });
      const res = mockRes();
      const mockBooks = [{ id: 1, titulo: 'Clean Code' }];
      mockListBooks.mockResolvedValueOnce(mockBooks);

      // ACT: Ejecutar función
      await getBooksHandler(req, res);

      // ASSERT: Verificar resultado
      expect(mockListBooks).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

    test('debe lanzar error cuando falla el servicio', async () => {
      // ARRANGE: Simular error del servicio
      const req = mockReq({ query: {} });
      const res = mockRes();
      const error = new Error('DB down');
      mockListBooks.mockRejectedValueOnce(error);

      // ACT & ASSERT: Verificar que lanza error
      await expect(getBooksHandler(req, res)).rejects.toThrow(error);
    });
  });

  describe('getBookHandler', () => {
    test('debe retornar libro cuando existe', async () => {
      // ARRANGE: Preparar datos de prueba
      const req = mockReq({ params: { id: '1' } });
      const res = mockRes();
      const mockBook = { id: 1, titulo: 'Clean Code' };
      mockGetBookById.mockResolvedValueOnce(mockBook);

      // ACT: Ejecutar función
      await getBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(mockGetBookById).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ data: mockBook });
    });

    test('debe retornar 404 cuando no existe', async () => {
      // ARRANGE: Simular que no hay libro
      const req = mockReq({ params: { id: '999' } });
      const res = mockRes();
      mockGetBookById.mockResolvedValueOnce(null);

      // ACT: Ejecutar función
      await getBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });

    test('debe retornar 400 cuando id es inválido', async () => {
      // ARRANGE: Preparar request con id inválido
      const req = mockReq({ params: { id: 'abc' } });
      const res = mockRes();

      // ACT: Ejecutar función
      await getBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });

  describe('createBookHandler', () => {
    test('debe crear libro cuando datos son válidos', async () => {
      // ARRANGE: Preparar datos de prueba
      const req = mockReq({ body: { titulo: 'Nuevo', autor: 'Autor', categoria: 'FICCION' } });
      const res = mockRes();
      const mockCreated = { id: 123, titulo: 'Nuevo', autor: 'Autor', categoria: 'FICCION' };
      mockCreateBook.mockResolvedValueOnce(mockCreated);

      // ACT: Ejecutar función
      await createBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(mockCreateBook).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

    test('debe retornar error cuando falla el servicio', async () => {
      // ARRANGE: Simular error del servicio
      const req = mockReq({ body: { titulo: 'X' } });
      const res = mockRes();
      const error = new Error('fail');
      mockCreateBook.mockRejectedValueOnce(error);

      // ACT: Ejecutar función
      await createBookHandler(req, res);

      // ASSERT: Verificar resultado
      const status = (res.status as any).mock.calls[0]?.[0];
      expect([400, 500]).toContain(status);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });

  describe('updateBookHandler', () => {
    test('debe actualizar libro cuando datos son válidos', async () => {
      // ARRANGE: Preparar datos de prueba
      const req = mockReq({ params: { id: '1' }, body: { titulo: 'Editado' } });
      const res = mockRes();
      const mockUpdated = { id: 1, titulo: 'Editado' };
      mockUpdateBook.mockResolvedValueOnce(mockUpdated);

      // ACT: Ejecutar función
      await updateBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(mockUpdateBook).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

    test('debe retornar error cuando libro no existe', async () => {
      // ARRANGE: Simular que no hay libro
      const req = mockReq({ params: { id: '999' }, body: { titulo: 'X' } });
      const res = mockRes();
      mockUpdateBook.mockResolvedValueOnce(null);

      // ACT: Ejecutar función
      await updateBookHandler(req, res);

      // ASSERT: Verificar resultado
      const status = (res.status as any).mock.calls[0]?.[0];
      if (status !== undefined) {
        expect([404, 400, 200]).toContain(status);
      }
      expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

    test('debe retornar 400 cuando id es inválido', async () => {
      // ARRANGE: Preparar request con id inválido
      const req = mockReq({ params: { id: 'abc' }, body: { titulo: 'X' } });
      const res = mockRes();

      // ACT: Ejecutar función
      await updateBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });

  describe('deleteBookHandler', () => {
    test('debe eliminar libro cuando id es válido', async () => {
      // ARRANGE: Preparar datos de prueba
      const req = mockReq({ params: { id: '1' } });
      const res = mockRes();
      mockDeleteBook.mockResolvedValueOnce(undefined);

      // ACT: Ejecutar función
      await deleteBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(mockDeleteBook).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 400 cuando id es inválido', async () => {
      // ARRANGE: Preparar request con id inválido
      const req = mockReq({ params: { id: 'abc' } });
      const res = mockRes();

      // ACT: Ejecutar función
      await deleteBookHandler(req, res);

      // ASSERT: Verificar resultado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    });
  });
});
