import React, { useEffect, useState } from 'react';
import Section from './Section';
import { http } from '../api/http';

export default function SecInfantil() {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    http('/libros?categoria=INFANTIL&pageSize=100')
      .then(r => (Array.isArray(r?.data) ? r.data : Array.isArray(r) ? r : []))
      .then(list => { if (!cancelled) setLibros(list); })
      .catch(() => { if (!cancelled) setError('No se pudo cargar la sección Infantil'); });

    return () => { cancelled = true; };
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  return <Section titulo="Infantil" libros={libros} />;
}
