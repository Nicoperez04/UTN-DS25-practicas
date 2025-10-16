// Tests para book.validation - verificar esquemas de validación Zod
// Verifico que los datos sean validos o invalidos
// Verifico campo por campo si es valido o no y que mensaje de error me da

import {
  createBookSchema,
  updateBookSchema,
  idParamSchema,
  listQuerySchema,
} from '../book.validation';

describe('book.validation', () => {
  describe('createBookSchema', () => {
    test('debe aceptar datos válidos de libro', () => {
      // ARRANGE: Preparar datos válidos
      const validBook = {
        titulo: 'El Quijote',
        autor: 'Miguel de Cervantes',
        descripcion: 'Una novela clásica',
        portada: 'https://example.com/portada.jpg',
      };

      // ACT: Validar datos
      const result = createBookSchema.safeParse(validBook);

      // ASSERT: Verificar que es válido
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validBook);
      }
    });

    test('debe rechazar cuando falta título', () => {
      // ARRANGE: Preparar datos sin título
      const invalidBook = {
        autor: 'Miguel de Cervantes',
        descripcion: 'Una novela clásica',
      };

      // ACT: Validar datos
      const result = createBookSchema.safeParse(invalidBook);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('debe rechazar cuando falta autor', () => {
      // ARRANGE: Preparar datos sin autor
      const invalidBook = {
        titulo: 'El Quijote',
        descripcion: 'Una novela clásica',
      };

      // ACT: Validar datos
      const result = createBookSchema.safeParse(invalidBook);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('debe rechazar título vacío', () => {
      // ARRANGE: Preparar datos con título vacío
      const invalidBook = {
        titulo: '',
        autor: 'Miguel de Cervantes',
      };

      // ACT: Validar datos
      const result = createBookSchema.safeParse(invalidBook);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El título es requerido');
      }
    });
  });

  describe('updateBookSchema', () => {
    test('debe aceptar actualización parcial válida', () => {
      // ARRANGE: Preparar actualización solo del título
      const partialUpdate = {
        titulo: 'El Quijote Actualizado',
      };

      // ACT: Validar datos
      const result = updateBookSchema.safeParse(partialUpdate);

      // ASSERT: Verificar que es válido
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(partialUpdate);
      }
    });

    test('debe aceptar actualización solo del autor', () => {
      // ARRANGE: Preparar actualización solo del autor
      const partialUpdate = {
        autor: 'Miguel de Cervantes Saavedra',
      };

      // ACT: Validar datos
      const result = updateBookSchema.safeParse(partialUpdate);

      // ASSERT: Verificar que es válido
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(partialUpdate);
      }
    });

    test('debe rechazar actualización con título vacío', () => {
      // ARRANGE: Preparar actualización con título vacío
      const invalidUpdate = {
        titulo: '',
      };

      // ACT: Validar datos
      const result = updateBookSchema.safeParse(invalidUpdate);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El título es requerido');
      }
    });
  });

  describe('idParamSchema', () => {
    test('debe convertir string numérico a number', () => {
      // ARRANGE: Preparar string numérico
      const stringId = { id: '123' };

      // ACT: Validar datos
      const result = idParamSchema.safeParse(stringId);

      // ASSERT: Verificar que convierte y es válido
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(123);
        expect(typeof result.data.id).toBe('number');
      }
    });

    test('debe rechazar ID negativo', () => {
      // ARRANGE: Preparar ID negativo
      const negativeId = { id: -1 };

      // ACT: Validar datos
      const result = idParamSchema.safeParse(negativeId);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
    });

    test('debe rechazar ID no numérico', () => {
      // ARRANGE: Preparar ID no numérico
      const nonNumericId = { id: 'abc' };

      // ACT: Validar datos
      const result = idParamSchema.safeParse(nonNumericId);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
    });
  });

  describe('listQuerySchema', () => {
    test('debe aceptar query válido con todos los parámetros', () => {
      // ARRANGE: Preparar query completo
      const validQuery = {
        page: '2',
        size: '10',
        orderBy: 'titulo',
        dir: 'asc',
        q: 'quijote',
      };

      // ACT: Validar datos
      const result = listQuerySchema.safeParse(validQuery);

      // ASSERT: Verificar que es válido y convierte números
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(2);
        expect(result.data.size).toBe(10);
        expect(typeof result.data.page).toBe('number');
        expect(typeof result.data.size).toBe('number');
      }
    });

    test('debe aceptar query vacío', () => {
      // ARRANGE: Preparar query vacío
      const emptyQuery = {};

      // ACT: Validar datos
      const result = listQuerySchema.safeParse(emptyQuery);

      // ASSERT: Verificar que es válido
      expect(result.success).toBe(true);
    });

    test('debe rechazar orderBy inválido', () => {
      // ARRANGE: Preparar query con orderBy inválido
      const invalidQuery = {
        orderBy: 'campo_invalido',
      };

      // ACT: Validar datos
      const result = listQuerySchema.safeParse(invalidQuery);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
    });

    test('debe rechazar dir inválido', () => {
      // ARRANGE: Preparar query con dir inválido
      const invalidQuery = {
        dir: 'invalid',
      };

      // ACT: Validar datos
      const result = listQuerySchema.safeParse(invalidQuery);

      // ASSERT: Verificar que es inválido
      expect(result.success).toBe(false);
    });
  });
});
