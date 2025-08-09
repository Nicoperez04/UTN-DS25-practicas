import { Book } from '../types/book.types';
const BASE_URL = 'http://localhost:3000';

export const librosInfantil: Book[] = [
  {
    id: 'infantil1',
    titulo: 'Cuentos de la Selva',
    autor: 'Horacio Quiroga',
    portada: `${BASE_URL}/secInfantil/infantil1.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  },
  {
    id: 'infantil2',
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    portada: `${BASE_URL}/secInfantil/infantil2.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  },
  {
    id: 'infantil3',
    titulo: 'Matilda',
    autor: 'Roald Dahl',
    portada: `${BASE_URL}/secInfantil/infantil3.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  },
  {
    id: 'infantil4',
    titulo: 'Alicia en el País de las Maravillas',
    autor: 'Lewis Carroll',
    portada: `${BASE_URL}/secInfantil/infantil4.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  },
  {
    id: 'infantil5',
    titulo: 'Charlie y la Fábrica de Chocolate',
    autor: 'Roald Dahl',
    portada: `${BASE_URL}/secInfantil/infantil5.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  },
  {
    id: 'infantil6',
    titulo: 'Pippi Calzaslargas',
    autor: 'Astrid Lindgren',
    portada: `${BASE_URL}/secInfantil/infantil6.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'infantil'
  }
];

export function getLibrosInfantil(): Book[] {
  return librosInfantil;
}

// Esta función devuelve la lista de libros infantiles