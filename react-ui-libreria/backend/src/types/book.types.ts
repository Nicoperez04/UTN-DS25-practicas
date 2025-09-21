// src/types/book.types.ts

// ------ ENTRADA ------
export type CreateBookRequest = {
  titulo: string;
  autor: string;
  descripcion?: string;
  portada?: string;
};

export type UpdateBookRequest = Partial<CreateBookRequest>;

// ------ esto seria lo que devolvemos al front ------
export type Seccion = 'ficcion' | 'deporte' | 'historia' | 'infantil';

export type BookDTO = {
  id: number;               
  titulo: string;
  autor: string;
  descripcion?: string | null;
  seccion: Seccion;         // API habla en "seccion" (no "categoria")
  portada?: string;         
};
