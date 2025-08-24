// prisma/seed.ts
// ------------------------------------------------------------
// Carga TODOS los libros a la DB, con su categoria y portada (lo agregue esta tanda).
// Usa IMG_BASE_URL que lo agregue en el .env.
// Usa el modelo que defini en el modelo Book: @@unique([titulo, autor, categoria])
// para poder usar skipDuplicates sin generar duplicados (evitar errores), igual esto sirve mas que nda
// a gran escala pero para probar a ver que onda.
// ------------------------------------------------------------

import 'dotenv/config';
import { PrismaClient, Categoria as CATS, $Enums } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Base de imagenes
const BASE = process.env.IMG_BASE_URL ?? 'http://localhost:3000/imagenes';

// Tipos para el seed
type SeedLibro = { 
    titulo: string; 
    autor: string; 
    descripcion?: string; 
    portada?: string;
};

type TCategoria = $Enums.Categoria

// Helper para crear varios libros en una categoria
async function seedCategoria(cat: TCategoria, libros: SeedLibro[]
) {
  await prisma.book.createMany({
   data: libros.map((l) => ({
      titulo: l.titulo,
      autor: l.autor,
      categoria: cat,
      descripcion: l.descripcion ?? '',
      portada: l.portada ?? '',
    })),
    skipDuplicates: true,
  });
}

async function main() {
  // ---------------------------
  // FICCION
  // ---------------------------
  await seedCategoria(CATS.FICCION, [
    { titulo: 'El Problema de los 3 Cuerpos', autor: 'Cixin Liu',            descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion1.jpg` },
    { titulo: 'La Cúpula',                   autor: 'Stephen King',          descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion2.jpg` },
    { titulo: 'Trilogía de Fundación',       autor: 'Isaac Asimov',          descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion3.jpg` },
    { titulo: 'Un minuto antes de la Oscuridad', autor: 'Ismael Martínez',   descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion4.jpg` },
    { titulo: 'Almas de color',              autor: 'Francisco Sola',        descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion5.jpg` },
    { titulo: 'Viajero de la Noche',         autor: 'George R.R. Martin',    descripcion: 'Descripción bla bla bla', portada: `${BASE}/secFiccion/ficcion6.jpg` },
  ]);

  // ---------------------------
  // DEPORTE
  // ---------------------------
  await seedCategoria(CATS.DEPORTE, [
    { titulo: 'Fútbol Total',        autor: 'Johan Cruyff',        descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte1.jpg` },
    { titulo: 'Open',                autor: 'Andre Agassi',        descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte2.jpg` },
    { titulo: 'Relentless',          autor: 'Tim Grover',          descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte3.jpg` },
    { titulo: 'La Pirámide Invertida', autor: 'Jonathan Wilson',   descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte4.jpg` },
    { titulo: 'Born to Run',         autor: 'Christopher McDougall', descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte5.jpg` },
    { titulo: 'Moneyball',           autor: 'Michael Lewis',       descripcion: 'Descripción bla bla bla', portada: `${BASE}/secDeporte/deporte6.jpg` },
  ]);

  // ---------------------------
  // HISTORIA
  // ---------------------------
  await seedCategoria(CATS.HISTORIA, [
    { titulo: 'Sapiens',                    autor: 'Yuval Noah Harari', descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia1.jpg` },
    { titulo: 'Homo Deus',                  autor: 'Yuval Noah Harari', descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia2.jpg` },
    { titulo: 'La Segunda Guerra Mundial',  autor: 'Antony Beevor',     descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia3.jpg` },
    { titulo: 'Los Pilares de la Tierra',   autor: 'Ken Follett',       descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia4.jpg` },
    { titulo: 'Breve Historia del Tiempo',  autor: 'Stephen Hawking',   descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia5.jpg` },
    { titulo: 'Historia de dos ciudades',   autor: 'Charles Dickens',   descripcion: 'Descripción bla bla bla', portada: `${BASE}/secHistoria/historia6.jpg` },
  ]);

  // ---------------------------
  // INFANTIL
  // ---------------------------
  await seedCategoria(CATS.INFANTIL, [
    { titulo: 'Cuentos de la Selva',                 autor: 'Horacio Quiroga',                 descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil1.jpg` },
    { titulo: 'El Principito',                       autor: 'Antoine de Saint-Exupéry',        descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil2.jpg` },
    { titulo: 'Matilda',                             autor: 'Roald Dahl',                      descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil3.jpg` },
    { titulo: 'Alicia en el País de las Maravillas', autor: 'Lewis Carroll',                   descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil4.jpg` },
    { titulo: 'Charlie y la Fábrica de Chocolate',   autor: 'Roald Dahl',                      descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil5.jpg` },
    { titulo: 'Pippi Calzaslargas',                  autor: 'Astrid Lindgren',                 descripcion: 'Descripción bla bla bla', portada: `${BASE}/secInfantil/infantil6.jpg` },
  ]);
}

main()
  .then(async () => { console.log('✅ Seed completado'); await prisma.$disconnect(); })
  .catch(async (e) => { console.error('❌ Error en seed:', e); await prisma.$disconnect(); process.exit(1); });
