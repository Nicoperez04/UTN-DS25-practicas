import React from 'react';
import Section from './Section';

export default function SeccionFiccion() {
  return <Section title="Ficción" libros={librosFiccion} />;
}

export const librosFiccion = [
  {id: 'ficcion1',titulo: 'El Problema de los 3 Cuerpos',autor: 'Cixin Liu',portada: require('../Imagenes/Resto/ficcion.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
  {id: 'ficcion2',titulo: 'La Cúpula',autor: 'Stephen King',portada: require('../Imagenes/secFiccion/ficcion2.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
  {id: 'ficcion3',titulo: 'Trilogía de Fundación',autor: 'Isaac Asimov',portada: require('../Imagenes/secFiccion/ficcion3.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
  {id: 'ficcion4',titulo: 'Un minuto antes de la Oscuridad',autor: 'Ismael Martínez',portada: require('../Imagenes/secFiccion/ficcion4.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
  {id: 'ficcion5',titulo: 'Almas de color',autor: 'Francisco Sola',portada: require('../Imagenes/secFiccion/ficcion5.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
  {id: 'ficcion6',titulo: 'Viajero de la Noche',autor: 'George R.R. Martin',portada: require('../Imagenes/secFiccion/ficcion6.jpg'),descripcion: 'Descripción bla bla bla',seccion: 'ficcion'},
];


