// Tests para sections.ts - verificar conversión entre categorías y secciones
// Es medio boludo, pero para practicar un poco

import { fromCategoria, toCategoria } from '../sections';

describe('sections', () => {
  describe('fromCategoria', () => {
    test('debe convertir FICCION a ficcion', () => {
      // ARRANGE: Preparar categoría FICCION
      const categoria = 'FICCION';

      // ACT: Convertir categoría a sección
      const result = fromCategoria(categoria);

      // ASSERT: Verificar conversión
      expect(result).toBe('ficcion');
    });

    test('debe convertir DEPORTE a deporte', () => {
      // ARRANGE: Preparar categoría DEPORTE
      const categoria = 'DEPORTE';

      // ACT: Convertir categoría a sección
      const result = fromCategoria(categoria);

      // ASSERT: Verificar conversión
      expect(result).toBe('deporte');
    });

    test('debe convertir HISTORIA a historia', () => {
      // ARRANGE: Preparar categoría HISTORIA
      const categoria = 'HISTORIA';

      // ACT: Convertir categoría a sección
      const result = fromCategoria(categoria);

      // ASSERT: Verificar conversión
      expect(result).toBe('historia');
    });

    test('debe convertir INFANTIL a infantil', () => {
      // ARRANGE: Preparar categoría INFANTIL
      const categoria = 'INFANTIL';

      // ACT: Convertir categoría a sección
      const result = fromCategoria(categoria);

      // ASSERT: Verificar conversión
      expect(result).toBe('infantil');
    });

    test('debe devolver ficcion por defecto para categoría inválida', () => {
      // ARRANGE: Preparar categoría inválida
      const categoria = 'INVALIDA' as any;

      // ACT: Convertir categoría a sección
      const result = fromCategoria(categoria);

      // ASSERT: Verificar conversión por defecto
      expect(result).toBe('ficcion');
    });
  });

  describe('toCategoria', () => {
    test('debe convertir ficcion a FICCION', () => {
      // ARRANGE: Preparar sección ficcion
      const seccion = 'ficcion';

      // ACT: Convertir sección a categoría
      const result = toCategoria(seccion);

      // ASSERT: Verificar conversión
      expect(result).toBe('FICCION');
    });

    test('debe convertir deporte a DEPORTE', () => {
      // ARRANGE: Preparar sección deporte
      const seccion = 'deporte';

      // ACT: Convertir sección a categoría
      const result = toCategoria(seccion);

      // ASSERT: Verificar conversión
      expect(result).toBe('DEPORTE');
    });

    test('debe convertir historia a HISTORIA', () => {
      // ARRANGE: Preparar sección historia
      const seccion = 'historia';

      // ACT: Convertir sección a categoría
      const result = toCategoria(seccion);

      // ASSERT: Verificar conversión
      expect(result).toBe('HISTORIA');
    });

    test('debe convertir infantil a INFANTIL', () => {
      // ARRANGE: Preparar sección infantil
      const seccion = 'infantil';

      // ACT: Convertir sección a categoría
      const result = toCategoria(seccion);

      // ASSERT: Verificar conversión
      expect(result).toBe('INFANTIL');
    });

    test('debe devolver FICCION por defecto para sección inválida', () => {
      // ARRANGE: Preparar sección inválida
      const seccion = 'invalida' as any;

      // ACT: Convertir sección a categoría
      const result = toCategoria(seccion);

      // ASSERT: Verificar conversión por defecto
      expect(result).toBe('FICCION');
    });
  });
});
