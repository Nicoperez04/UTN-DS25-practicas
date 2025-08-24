// src/config/prisma.ts
import { PrismaClient } from "../generated/prisma"; 

// Usamos un singleton para no abrir muchass conexiones
const prisma = new PrismaClient({
  log: ['warn', 'error', 'query']
});

export default prisma;