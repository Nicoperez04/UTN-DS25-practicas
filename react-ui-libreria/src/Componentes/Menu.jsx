import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav id="menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/ficcion">Ficción</Link></li>
        <li><Link to="/deporte">Deporte</Link></li>
        <li><Link to="/infantil">Infantil</Link></li>
        <li><Link to="/historia">Historia</Link></li>
        <li><Link to="/registro">Registrarse</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}