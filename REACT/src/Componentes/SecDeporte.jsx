import React from 'react';
import Section from './Section';
import { librosDeporte } from './dataDeporte';

export default function SeccionDeporte() {
  return <Section title="Deporte" libros={librosDeporte} />;
}
