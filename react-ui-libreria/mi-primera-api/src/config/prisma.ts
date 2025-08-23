// src/config/prisma.ts
import { PrismaClient } from "../generated/prisma"; 
// ^ Importa desde la salida que definiste en el generator

// Usamos un singleton para no abrir múltiples conexiones
const prisma = new PrismaClient({
  log: ['warn', 'error', 'query']
});

export default prisma;