// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BASE = process.env.IMG_BASE_URL ?? 'http://localhost:3000/imagenes';

type Categoria = 'FICCION' | 'DEPORTE' | 'HISTORIA' | 'INFANTIL';
type SeedLibro = {
  titulo: string;
  autor: string;
  descripcion?: string;
  portada?: string;
};

async function seedCategoria(cat: Categoria, libros: SeedLibro[]) {
  await prisma.book.createMany({
    data: libros.map((l) => ({
      titulo: l.titulo,
      autor: l.autor,
      descripcion: l.descripcion ?? null,
      categoria: cat,               // enum como literal
      portada: l.portada ?? `${BASE}/default.jpg`,
    })),
    skipDuplicates: true,
  });
}

async function main() {
  await seedCategoria('FICCION', [
    { titulo: 'El Problema de los 3 Cuerpos', autor: 'Cixin Liu', descripcion: 'Sci-fi', portada: `${BASE}/secFiccion/ficcion1.jpg` },
  ]);

  await seedCategoria('DEPORTE', [
    { titulo: 'El sueño de mi desvelo', autor: 'Antoni Daimiel', portada: `${BASE}/secDeporte/deporte1.jpg` },
  ]);

  await seedCategoria('HISTORIA', [
    { titulo: 'Historia Argentina', autor: 'Teresa Eggers-Brass', portada: `${BASE}/secHistoria/historia1.jpg` },
  ]);

  await seedCategoria('INFANTIL', [
    { titulo: 'El primer picnic de Jane', autor: 'Bella George', portada: `${BASE}/secInfantil/infantil1.jpg` },
  ]);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
