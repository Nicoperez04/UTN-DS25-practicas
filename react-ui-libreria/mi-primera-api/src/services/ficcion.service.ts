// src/services/ficcion.service.ts
// Importamos la interfaz Book para tipar correctamente cada libro
import { Book } from '../types/book.types';

// URL base del backend (ajustar puerto si cambia)
const BASE_URL = 'http://localhost:3000/imagenes';

// Array de libros de la sección Ficción
export const librosFiccion: Book[] = [
  {
    id: 'ficcion1',
    titulo: 'El Problema de los 3 Cuerpos',
    autor: 'Cixin Liu',
    portada: `${BASE_URL}/secFiccion/ficcion1.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  },
  {
    id: 'ficcion2',
    titulo: 'La Cúpula',
    autor: 'Stephen King',
    portada: `${BASE_URL}/secFiccion/ficcion2.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  },
  {
    id: 'ficcion3',
    titulo: 'Trilogía de Fundación',
    autor: 'Isaac Asimov',
    portada: `${BASE_URL}/secFiccion/ficcion3.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  },
  {
    id: 'ficcion4',
    titulo: 'Un minuto antes de la Oscuridad',
    autor: 'Ismael Martínez',
    portada: `${BASE_URL}/secFiccion/ficcion4.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  },
  {
    id: 'ficcion5',
    titulo: 'Almas de color',
    autor: 'Francisco Sola',
    portada: `${BASE_URL}/secFiccion/ficcion5.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  },
  {
    id: 'ficcion6',
    titulo: 'Viajero de la Noche',
    autor: 'George R.R. Martin',
    portada: `${BASE_URL}/secFiccion/ficcion6.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'ficcion'
  }
];

// Función que devuelve todos los libros de ficción
export function getLibrosFiccion(): Book[] {
  return librosFiccion;
}


