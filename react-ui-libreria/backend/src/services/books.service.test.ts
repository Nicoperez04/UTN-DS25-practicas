import { getBookById } from "./books.service"; 
import prisma from "../config/prisma";

jest.mock("../config/prisma", () => ({
    book: {
        findUnique: jest.fn(),
    },
}));

describe("Book service - getBookById", () => {
  test("Debe retornan un libro cuando existe", async () => {
    // ARRANGE:
    const mockBook = { "authorId": 1,
        autor: "Cixin Liu",
        categoria: "FICCION",
        createdAt: "2025-08-24T04:26:49.300Z",
        descripcion: "Descripción bla bla bla",
        id: 1,
        portada: "http://localhost:3000/imagenes/secFiccion/ficcion1.jpg",
        titulo: "El Problema de los 3 Cuerpos" };    
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBook);

    // ACT:
    const result = await getBookById(1);

    // ASSERT:
    expect(result).toEqual(mockBook);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  test("Debe lanzar error 404 cuando el libro no existe", async () => {
    // ARRANGE:
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);
    // ACT & ASSERT:
    await expect(getBookById(999)).rejects.toThrow("Libro no encontrado");
  });
});
