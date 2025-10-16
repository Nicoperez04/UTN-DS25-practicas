// Tests para mappers.ts - verificar mapeo de BookRecord a BookDTO

import { mapBookToDTO } from '../mappers';

describe('mappers', () => {
  describe('mapBookToDTO', () => {
    test('debe mapear BookRecord completo a BookDTO', () => {
      // ARRANGE: Preparar BookRecord con todos los campos
      const bookRecord = {
        id: 1,
        titulo: 'El Quijote',
        autor: 'Miguel de Cervantes',
        descripcion: 'Una novela clásica',
        categoria: 'FICCION' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar mapeo correcto
      expect(result).toEqual({
        id: 1,
        titulo: 'El Quijote',
        autor: 'Miguel de Cervantes',
        descripcion: 'Una novela clásica',
        seccion: 'ficcion',
      });
    });

    test('debe mapear BookRecord con descripcion null', () => {
      // ARRANGE: Preparar BookRecord con descripción null
      const bookRecord = {
        id: 2,
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        descripcion: null,
        categoria: 'FICCION' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar que descripción se mantiene null
      expect(result.descripcion).toBe(null);
      expect(result.seccion).toBe('ficcion');
    });

    test('debe mapear categoría DEPORTE correctamente', () => {
      // ARRANGE: Preparar BookRecord con categoría DEPORTE
      const bookRecord = {
        id: 3,
        titulo: 'Fútbol Total',
        autor: 'Johan Cruyff',
        descripcion: 'Libro sobre fútbol',
        categoria: 'DEPORTE' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar conversión de categoría
      expect(result.seccion).toBe('deporte');
    });

    test('debe mapear categoría HISTORIA correctamente', () => {
      // ARRANGE: Preparar BookRecord con categoría HISTORIA
      const bookRecord = {
        id: 4,
        titulo: 'Historia de Roma',
        autor: 'Tito Livio',
        descripcion: 'Historia antigua',
        categoria: 'HISTORIA' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar conversión de categoría
      expect(result.seccion).toBe('historia');
    });

    test('debe mapear categoría INFANTIL correctamente', () => {
      // ARRANGE: Preparar BookRecord con categoría INFANTIL
      const bookRecord = {
        id: 5,
        titulo: 'El Principito',
        autor: 'Antoine de Saint-Exupéry',
        descripcion: 'Cuento infantil',
        categoria: 'INFANTIL' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar conversión de categoría
      expect(result.seccion).toBe('infantil');
    });

    test('debe preservar todos los campos básicos', () => {
      // ARRANGE: Preparar BookRecord simple
      const bookRecord = {
        id: 6,
        titulo: 'Don Juan',
        autor: 'Lord Byron',
        descripcion: null,
        categoria: 'FICCION' as const,
      };

      // ACT: Mapear a DTO
      const result = mapBookToDTO(bookRecord);

      // ASSERT: Verificar que todos los campos se preservan
      expect(result.id).toBe(6);
      expect(result.titulo).toBe('Don Juan');
      expect(result.autor).toBe('Lord Byron');
      expect(result.descripcion).toBe(null);
      expect(result.seccion).toBe('ficcion');
    });
  });
});
