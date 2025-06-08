import React from 'react';
import logo from '../Imagenes/Resto/logoLibreria.png';

export default function Header() {
  return (
    <header id="cabecera">
      <img src={logo} alt="Logo de la Librería" className="logo" />
      <h2>Librería Ejercicio React</h2>
    </header>
  );
}
