import React from 'react';
import Section from './Section';
import { librosInfantil } from './dataInfantil';

export default function SeccionInfantil() {
  return <Section title="Infantil" libros={librosInfantil} />;
}

