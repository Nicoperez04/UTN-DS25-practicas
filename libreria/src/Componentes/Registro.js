import React from 'react';
import '../registro.css';

export default function Registro() {
  return (
    <main id="contenidoPrincipal">
      <header id="cabecera">
        <img src={require('../Imagenes/Resto/logoLibreria.png')} alt="Logo" className="logo" />
        <h2>Registro de Usuario</h2>
      </header>

      <section className="formulario-registro">
        <h1>Formulario de Registro</h1>
        <form action="#" method="post">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required />

          <label htmlFor="fecha">Fecha de Nacimiento:</label>
          <input type="date" id="fecha" name="fecha" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />

          <fieldset className="sexo">
            <legend>Sexo:</legend>
            <label><input type="radio" name="sexo" value="masculino" required /> Masculino</label>
            <label><input type="radio" name="sexo" value="femenino" /> Femenino</label>
            <label><input type="radio" name="sexo" value="otro" /> Otro</label>
          </fieldset>

          <label htmlFor="tema">Tema Favorito:</label>
          <select id="tema" name="tema">
            <option value="">Seleccione un tema</option>
            <option value="ficcion">Ficción</option>
            <option value="deporte">Deporte</option>
            <option value="infantil">Infantil</option>
            <option value="historia">Historia</option>
          </select>

          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ej: +54 9 11 2345-6789"
          />

          <label htmlFor="website">Sitio Web Personal:</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://ejemplo.com"
          />

          <label htmlFor="color">Color Favorito:</label>
          <input type="color" id="color" name="color" />

          <label htmlFor="satisfaccion">Nivel de conformidad con el sitio (1 a 10):</label>
          <span id="valorSatisfaccion">5</span>
          <input
            type="range"
            id="satisfaccion"
            name="satisfaccion"
            min="1"
            max="10"
            defaultValue="5"
            onInput={e => {
              document.getElementById('valorSatisfaccion').textContent = e.target.value;
            }}
          />

          <button type="submit">Registrarse</button>
        </form>
      </section>
    </main>
  );
}
