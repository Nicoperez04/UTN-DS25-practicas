// Tests de routes - verificar que las rutas estén configuradas correctamente

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

describe('books.routes', () => {
  test('debe configurar GET /libros correctamente', () => {
    // ARRANGE: Buscar la ruta
    const route = findRoute(booksRouter, 'get', '/libros');

    // ACT: No hay acción específica, solo verificar configuración

    // ASSERT: Verificar que la ruta existe y tiene los middlewares correctos
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'getBooksHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(listQuerySchema);
  });

  test('debe configurar GET /libros/:id correctamente', () => {
    // ARRANGE: Buscar la ruta
    const route = findRoute(booksRouter, 'get', '/libros/:id');

    // ACT: No hay acción específica, solo verificar configuración

    // ASSERT: Verificar que la ruta existe y tiene los middlewares correctos
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'getBookHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(idParamSchema);
  });

  test('debe configurar POST /libros correctamente', () => {
    // ARRANGE: Buscar la ruta
    const route = findRoute(booksRouter, 'post', '/libros');

    // ACT: No hay acción específica, solo verificar configuración

    // ASSERT: Verificar que la ruta existe y tiene los middlewares correctos
    expect(route).toBeTruthy();
    const names = route.stack.map((s: any) => s.name);
    expect(names).toEqual(['validateMiddleware', 'createBookHandler']);
    const first = route.stack[0].handle as any;
    expect(first.__schema).toBe(createBookSchema);
  });

  test('debe configurar PUT /libros/:id con autenticación', () => {
    // ARRANGE: Buscar la ruta
    const route = findRoute(booksRouter, 'put', '/libros/:id');

    // ACT: No hay acción específica, solo verificar configuración

    // ASSERT: Verificar que la ruta existe y tiene autenticación
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

  test('debe configurar DELETE /libros/:id con autenticación', () => {
    // ARRANGE: Buscar la ruta
    const route = findRoute(booksRouter, 'delete', '/libros/:id');

    // ACT: No hay acción específica, solo verificar configuración

    // ASSERT: Verificar que la ruta existe y tiene autenticación
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

