// Tests simples para books.service alineados al estilo del profe
import prisma from '../../config/prisma';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../books.service';

// Mock de Prisma
jest.mock('../../config/prisma', () => ({
  __esModule: true,
  default: {
    book: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    author: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(async (ops: any[]) => Promise.all(ops.map((op) => op))),
  },
}));

type Author = { id: number; nombre: string };
type BookWithAuthor = {
  id: number;
  titulo: string;
  autor: string;
  categoria: 'DEPORTE' | 'FICCION' | 'HISTORIA' | 'INFANTIL';
  descripcion?: string | null;
  portada?: string | null;
  createdAt?: Date;
  authorId?: number | null;
  author?: Author | null;
};

describe('books.service (simple)', () => {
  const mockAuthor1: Author = { id: 11, nombre: 'Cixin Liu' };
  const mockAuthor2: Author = { id: 22, nombre: 'Ken Follett' };

  const book1: BookWithAuthor = {
    id: 1,
    titulo: 'El problema de los tres cuerpos',
    autor: 'Cixin Liu',
    categoria: 'FICCION',
    descripcion: null,
    portada: null,
    authorId: 11,
    author: mockAuthor1,
  };

  const book2: BookWithAuthor = {
    id: 2,
    titulo: 'Los pilares de la tierra',
    autor: 'Ken Follett',
    categoria: 'HISTORIA',
    descripcion: null,
    portada: null,
    authorId: 22,
    author: mockAuthor2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('retorna array con include author y orden asc', async () => {
      (prisma.book.findMany as jest.Mock).mockResolvedValue([book1, book2]);

      const result = await getAllBooks();

      expect(result).toEqual([book1, book2]);
      expect((result as any)[0]).toHaveProperty('author');
      expect(prisma.book.findMany).toHaveBeenCalledWith({ include: { author: true }, orderBy: { id: 'asc' } });
    });
  });

  describe('getBookById', () => {
    it('retorna un libro por id con su author', async () => {
      (prisma.book.findUnique as jest.Mock).mockResolvedValue(book1);

      const result = await getBookById(1);

      expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 }, include: { author: true } });
      expect(result).toEqual(book1);
    });

    it('lanza 404 si no existe', async () => {
      (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getBookById(999)).rejects.toThrow('Book not found');
      await expect(getBookById(999)).rejects.toHaveProperty('statusCode', 404);
    });
  });

  describe('createBook', () => {
    it('crea y retorna el libro con author incluido', async () => {
      const payload = {
        titulo: 'Nuevo',
        autor: 'Autor X',
        categoria: 'FICCION',
        descripcion: null,
        portada: null,
        authorId: 11,
      };
      const createdBook: BookWithAuthor = { id: 3, ...payload, author: mockAuthor1 } as any;
      (prisma.book.create as jest.Mock).mockResolvedValue(createdBook);

      const result = await createBook(payload as any);

      expect(result).toEqual(createdBook);
      expect(prisma.book.create).toHaveBeenCalledWith({
        data: {
          titulo: 'Nuevo',
          autor: 'Autor X',
          categoria: 'FICCION',
          descripcion: null,
          portada: null,
          authorId: 11,
        },
        include: { author: true },
      });
    });

    it('valida categoria inválida', async () => {
      await expect(
        createBook({ titulo: 'A', autor: 'B', categoria: 'X', descripcion: null, portada: null } as any)
      ).rejects.toThrow('Categoria inválida');
    });
  });

  describe('updateBook', () => {
    it('actualiza y retorna el libro con author', async () => {
      const updated = { ...book1, descripcion: 'Nueva desc' };
      (prisma.book.update as jest.Mock).mockResolvedValue(updated);

      const result = await updateBook(1, { descripcion: 'Nueva desc' } as any);

      expect(result).toEqual(updated);
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { descripcion: 'Nueva desc' },
        include: { author: true },
      });
    });

    it('lanza 404 si prisma devuelve P2025', async () => {
      const err: any = new Error('not found');
      err.code = 'P2025';
      (prisma.book.update as jest.Mock).mockRejectedValue(err);

      await expect(updateBook(999, { titulo: 'x' } as any)).rejects.toHaveProperty('statusCode', 404);
    });
  });

  describe('deleteBook', () => {
    it('elimina por id', async () => {
      (prisma.book.delete as jest.Mock).mockResolvedValue(book1 as any);

      await deleteBook(1);

      expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('lanza 404 si prisma devuelve P2025', async () => {
      const err: any = new Error('not found');
      err.code = 'P2025';
      (prisma.book.delete as jest.Mock).mockRejectedValue(err);

      await expect(deleteBook(999)).rejects.toHaveProperty('statusCode', 404);
    });
  });
});


