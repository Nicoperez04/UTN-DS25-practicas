import React, { useState, useEffect } from 'react';
import Section from './Section';

function SecInfantil() {
  // Estado para almacenar los libros de la sección infantil
  const [libros, setLibros] = useState([]);

  // useEffect para cargar los libros de la sección infantil al montar el componente
  useEffect(() => {
    // Realizo la petición a la API para obtener los libros de infantil
    fetch('http://localhost:3000/api/infantil')
      .then(res => res.json()) // Convierto la respuesta a JSON
      .then(data => { // Agrego la imagen usando require() basado en el id
        const dataConImagen = data.map(libro => ({
          ...libro,
          portada: `/Imagenes/secInfantil/${libro.id}.jpg`
        }));
        setLibros(dataConImagen);
      })
      .catch(err => console.error('Error cargando infantil:', err));
  }, []);

  return <Section titulo="Infantil" libros={libros} />;
}

export default SecInfantil;


