import React from 'react';
import '../contacto.css';

export default function Contacto() {
  return (
    <main id="contenidoPrincipal">
      <header id="cabecera">
        <img src={require('../Imagenes/Resto/logoLibreria.png')} alt="Logo" className="logo" />
        <h2>Contacto</h2>
      </header>

      <section className="formulario-contacto">
        <h1>Formulario de Contacto</h1>
        <form action="#" method="post">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="asunto">Asunto:</label>
          <input type="text" id="asunto" name="asunto" required />

          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows="6" required />

          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}
