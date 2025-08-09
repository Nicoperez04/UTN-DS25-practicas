import { Book } from '../types/book.types';
const BASE_URL = 'http://localhost:3000';

export const librosHistoria: Book[] = [
  {
    id: 'historia1',
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    portada: `${BASE_URL}/secHistoria/historia1.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  },
  {
    id: 'historia2',
    titulo: 'Homo Deus',
    autor: 'Yuval Noah Harari',
    portada: `${BASE_URL}/secHistoria/historia2.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  },
  {
    id: 'historia3',
    titulo: 'La Segunda Guerra Mundial',
    autor: 'Antony Beevor',
    portada: `${BASE_URL}/secHistoria/historia3.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  },
  {
    id: 'historia4',
    titulo: 'Los Pilares de la Tierra',
    autor: 'Ken Follett',
    portada: `${BASE_URL}/secHistoria/historia4.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  },
  {
    id: 'historia5',
    titulo: 'Breve Historia del Tiempo',
    autor: 'Stephen Hawking',
    portada: `${BASE_URL}/secHistoria/historia5.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  },
  {
    id: 'historia6',
    titulo: 'Historia de dos ciudades',
    autor: 'Charles Dickens',
    portada: `${BASE_URL}/secHistoria/historia6.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'historia'
  }
];

export function getLibrosHistoria(): Book[] {
  return librosHistoria;
}
