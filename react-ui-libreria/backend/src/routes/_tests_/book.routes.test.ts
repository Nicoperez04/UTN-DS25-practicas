// backend/src/routes/__tests__/books.routes.test.ts

jest.mock('../../validations/book.validation', () => ({
  listQuerySchema: { __tag: 'listQuerySchema' },
  idParamSchema: { __tag: 'idParamSchema' },
  createBookSchema: { __tag: 'createBookSchema' },
  updateBookSchema: { __tag: 'updateBookSchema' },
}));

jest.mock('../../middlewares/validation.middleware', () => {
  return {
    validate: (schema: any) => {
      function validateMiddleware(_req: any, _res: any, next: any) { return next(); }
      (validateMiddleware as any).__schema = schema;
      return validateMiddleware;
    },
  };
});

jest.mock('../../middlewares/authenticate.middleware', () => ({
  authenticate: function authenticate(_req: any, _res: any, next: any) { return next(); },
}));
jest.mock('../../middlewares/authorize.middleware', () => ({
  authorize: (_role: string) =>
    function authorize(_req: any, _res: any, next: any) { return next(); },
}));

jest.mock('../../controllers/books.controller', () => ({
  getBooksHandler: function getBooksHandler(_req: any, _res: any, next: any) { return next(); },
  getBookHandler: function getBookHandler(_req: any, _res: any, next: any) { return next(); },
  createBookHandler: function createBookHandler(_req: any, _res: any, next: any) { return next(); },
  updateBookHandler: function updateBookHandler(_req: any, _res: any, next: any) { return next(); },
  deleteBookHandler: function deleteBookHandler(_req: any, _res: any, next: any) { return next(); },
}));

import { booksRouter } from '../books.routes';
import {
  listQuerySchema,
  idParamSchema,
  createBookSchema,
  updateBookSchema,
} from '../../validations/book.validation';

function findRoute(router: any, method: string, path: string) {
  const layers = router.stack?.filter((l: any) => l?.route) ?? [];
  for (const layer of layers) {
    const hasMethod = !!layer.route.methods[method.toLowerCase()];
    if (hasMethod && layer.route.path === path) return layer.route;
  }
  return null;
}

describe('Unit: books.routes wiring', () => {
  test('GET /libros', () => {
    const route = findRoute(booksRouter, 'get', '/libros');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'getBooksHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(listQuerySchema);
  });

  test('GET /libros/:id', () => {
    const route = findRoute(booksRouter, 'get', '/libros/:id');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'getBookHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(idParamSchema);
  });

  test('POST /libros', () => {
    const route = findRoute(booksRouter, 'post', '/libros');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'createBookHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(createBookSchema);
  });

  test('PUT /libros/:id', () => {
    const route = findRoute(booksRouter, 'put', '/libros/:id');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual([
      'authenticate',
      'authorize',
      'validateMiddleware',
      'validateMiddleware',
      'updateBookHandler',
    ]);
    const v1 = route.stack[2].handle as any;
    const v2 = route.stack[3].handle as any;
    expect(v1.__schema).toBe(idParamSchema);
    expect(v2.__schema).toBe(updateBookSchema);
  });

  test('PATCH /libros/:id', () => {
    const route = findRoute(booksRouter, 'patch', '/libros/:id');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual([
      'authenticate',
      'authorize',
      'validateMiddleware',
      'validateMiddleware',
      'updateBookHandler',
    ]);
    const v1 = route.stack[2].handle as any;
    const v2 = route.stack[3].handle as any;
    expect(v1.__schema).toBe(idParamSchema);
    expect(v2.__schema).toBe(updateBookSchema);
  });

  test('DELETE /libros/:id', () => {
    const route = findRoute(booksRouter, 'delete', '/libros/:id');
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual([
      'authenticate',
      'authorize',
      'validateMiddleware',
      'deleteBookHandler',
    ]);
    const v1 = route.stack[2].handle as any;
    expect(v1.__schema).toBe(idParamSchema);
  });
});

