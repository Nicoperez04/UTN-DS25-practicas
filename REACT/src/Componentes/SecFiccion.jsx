// src/Componentes/SectionFiccion.js
import React from 'react';
import Section from './Section';
import { librosFiccion } from './dataFiccion';

export default function SeccionFiccion() {
  return <Section title="Ficción" libros={librosFiccion} />;
}

