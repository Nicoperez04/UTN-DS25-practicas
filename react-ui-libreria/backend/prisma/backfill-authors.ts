// prisma/backfill-authors.ts
// -------------------------------------------------------------
// ¿Para que me estaria sirviendo esto? 
// - Basicamente crea un autor (con h) por cada nombre distinto que tenga c/ libro.
// - y dsp actualiza todo los autor id que estan en el libro para vincular cada libro con su Author.
// ¿Por que lo hago? 
// - Para que los datos anteriores queden consistentes con la nueva relación.
// - Tengo que dejar como int? authorId para que no se rompa todo
// - Es un script idempotente (segun un video es asi) (se puede correr varias veces sin duplicar).
// -------------------------------------------------------------
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Leer todos los libros (solo lo necesario)
  const libros = await prisma.book.findMany({
    select: { id: true, autor: true },
  });

  // Sacar nombres, y el trim para achicar al costado los espacios, podria poner lowerCase tambien pero lo corri y me saltaba error no se porque
  const normalizar = (s: string) => s.trim(); 
  const nombresUnicos = Array.from(new Set(libros.map(l => normalizar(l.autor))));

  // Crear/recuperar autores (no duplica por nombre, osea si ya aparecio una vez ya esta)
  const mapaNombreAId = new Map<string, number>();
  for (const nombre of nombresUnicos) {
    const a = await prisma.author.upsert({
      where: { nombre },   
      update: {},          // si existe, no cambia nada
      create: { nombre },  // si no existe, lo crea
      select: { id: true },
    });
    mapaNombreAId.set(nombre, a.id);
  }

  // Vincula cada libro con su authorId
  for (const l of libros) {
    const idAutor = mapaNombreAId.get(normalizar(l.autor));
    if (idAutor) {
      await prisma.book.update({
        where: { id: l.id },
        data:  { authorId: idAutor },
      });
    }
  }

  // Resumen por consola para verificar rapido (esto me lo agrego la IA como sugerencia)
  const totAutores = await prisma.author.count();
  const totVinc    = await prisma.book.count({ where: { authorId: { not: null } } });
  console.log(`✅ Autores creados/recuperados: ${totAutores} | Libros vinculados: ${totVinc}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { 
    console.error('❌ Error backfill:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
