import React, { useState, useEffect } from 'react';
import Section from './Section';

function SecHistoria() {
  const [libros, setLibros] = useState([]);

  // Estado para almacenar los libros de historia
  useEffect(() => {
    // Realizo la petición a la API para obtener los libros de historia
    fetch('http://localhost:3000/api/historia')
      .then(res => res.json()) // Convierto la respuesta a JSON
      .then(data => {
        const dataConImagen = data.map(libro => ({
          ...libro,
          portada: `/Imagenes/secHistoria/${libro.id}.jpg`
        }));
        setLibros(dataConImagen);
      })
      .catch(err => console.error('Error cargando historia:', err));
  }, []);

   // Renderizo la sección usando el componente Section
  return <Section titulo="Historia" libros={libros} />;
}

export default SecHistoria;

