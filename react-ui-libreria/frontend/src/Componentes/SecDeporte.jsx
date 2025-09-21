import React, { useState, useEffect } from 'react';
import Section from './Section';

function SecDeporte() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/deporte')
      .then(res => res.json())
      .then(data => {
        // Agrego la imagen usando require() basado en el id
        const dataConImagen = data.map(libro => ({
          ...libro,
          portada: `/Imagenes/secDeporte/${libro.id}.jpg`
        }));
        setLibros(dataConImagen);
      })
      .catch(err => console.error('Error cargando deporte:', err));
  }, []);

  return <Section titulo="Deporte" libros={libros} />;
}

export default SecDeporte;




