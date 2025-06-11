import React from 'react';
import Section from './Section';
import { librosHistoria } from './dataHistoria';

export default function SeccionHistoria() {
  return <Section title="Historia" libros={librosHistoria} />;
};