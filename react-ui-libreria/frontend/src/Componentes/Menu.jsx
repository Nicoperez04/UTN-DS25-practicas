import React from 'react';
import { Link } from 'react-router-dom';
import {
  HouseDoorFill,
  BookFill,
  TrophyFill,
  PeopleFill,
  JournalBookmarkFill,
  PencilSquare,
  EnvelopeFill
} from 'react-bootstrap-icons'; //algunos iconos para agregar adelante de cada li

export default function Menu() {
  return (
    <nav id="menu">
      <ul>
        <li><Link to="/"><HouseDoorFill /> Inicio</Link></li>
        <li><Link to="/ficcion"><BookFill /> Ficción</Link></li>
        <li><Link to="/deporte"><TrophyFill /> Deporte</Link></li>
        <li><Link to="/infantil"><PeopleFill /> Infantil</Link></li>
        <li><Link to="/historia"><JournalBookmarkFill /> Historia</Link></li>
        <li><Link to="/catalogo"><PencilSquare />Catalogo</Link></li>
        <li><Link to="/agregarLibro"><PencilSquare />Agregar Libro</Link></li>
        <li><Link to="/registro"><PencilSquare /> Registrarse</Link></li>
        <li><Link to="/contacto"><EnvelopeFill /> Contacto</Link></li>
      </ul>
    </nav>
  );
}

