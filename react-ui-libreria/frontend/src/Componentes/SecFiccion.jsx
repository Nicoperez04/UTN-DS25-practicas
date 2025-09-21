import { useState, useEffect } from 'react';
import Section from './Section';

function SecFiccion() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/ficcion')
      .then(res => res.json())
      .then(data => {
        const dataConImagen = data.map(libro => ({
          ...libro,
          portada: `/Imagenes/secFiccion/${libro.id}.jpg`
        }));
        setLibros(dataConImagen);
      })
      .catch(err => console.error('Error cargando ficción:', err));
  }, []);

  return <Section titulo="Ficción" libros={libros} />;
}

export default SecFiccion;




