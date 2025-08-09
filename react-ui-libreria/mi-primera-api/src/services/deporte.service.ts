// mi-primera-api/src/services/deporte.service.ts

// Importamos la interfaz Book para tipar correctamente cada libro 
import { Book } from '../types/book.types';

// URL base del backend (ajustar si cambia el puerto)
const BASE_URL = 'http://localhost:3000';

export const librosDeporte: Book[] = [
  { 
    id: 'deporte1',
    titulo: 'Fútbol Total',
    autor: 'Johan Cruyff',
    portada: `${BASE_URL}/secDeporte/deporte1.jpg`, // ruta pública del backend
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
  { 
    id: 'deporte2',
    titulo: 'Open',
    autor: 'Andre Agassi',
    portada: `${BASE_URL}/secDeporte/deporte2.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
  { 
    id: 'deporte3',
    titulo: 'Relentless',
    autor: 'Tim Grover',
    portada: `${BASE_URL}/secDeporte/deporte3.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
  { 
    id: 'deporte4',
    titulo: 'La Pirámide Invertida',
    autor: 'Jonathan Wilson',
    portada: `${BASE_URL}/secDeporte/deporte4.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
  { 
    id: 'deporte5',
    titulo: 'Born to Run',
    autor: 'Christopher McDougall',
    portada: `${BASE_URL}/secDeporte/deporte5.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
  { 
    id: 'deporte6',
    titulo: 'Moneyball',
    autor: 'Michael Lewis',
    portada: `${BASE_URL}/secDeporte/deporte6.jpg`,
    descripcion: 'Descripción bla bla bla',
    seccion: 'deporte'
  },
];

export function getLibrosDeporte(): Book[] {
  return librosDeporte;
}

