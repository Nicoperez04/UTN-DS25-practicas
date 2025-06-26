import React from 'react';
import Section from './Section';
import historia1Img from '../Imagenes/Resto/historia.jpg';
import historia2Img from '../Imagenes/secHistoria/historia2.jpg';
import historia3Img from '../Imagenes/secHistoria/historia3.jpg';
import historia4Img from '../Imagenes/secHistoria/historia4.jpg';
import historia5Img from '../Imagenes/secHistoria/historia5.jpg';
import historia6Img from '../Imagenes/secHistoria/historia6.jpg';


export default function SeccionHistoria() {
  return <Section title="Historia" libros={librosHistoria} />;
};

export const librosHistoria = [
  {id: 'historia1',titulo: 'Historia Argentina',autor: 'Teresa Eggers-Brass',portada: historia1Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'},
  {id: 'historia2',titulo: 'El puño del emperador',autor: 'Alberto Caliani',portada: historia2Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'},
  {id: 'historia3',titulo: 'Hidalgo',autor: 'Eugenio Aguirre',portada: historia3Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'},
  {id: 'historia4',titulo: 'Eso no estaba en mi libro de historia de Roma',autor: 'Javier Ramos',portada: historia4Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'},
  {id: 'historia5',titulo: 'Historia Moderna',autor: 'Martínez Millán y Rivero Rodríguez',portada: historia5Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'},
  {id: 'historia6',titulo: 'Historia Moderna de México',autor: 'Daniel Cosío Villegas',portada: historia6Img,descripcion: 'Descripción bla bla bla',seccion: 'historia'}
];
