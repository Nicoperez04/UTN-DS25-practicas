import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Rutas de autenticacion
import authRoutes from './routes/auth.routes';

// Router para libros
import { booksRouter } from './routes/books.routes';

// Router para usuarios
import { userRoutes } from './routes/user.routes';

import { legacySectionsRouter } from './routes/legacy.sections.routes';

const app = express();

const ALLOWED_ORIGINS = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Permitir requests sin 'Origin' (Postman, curl) y mismo origen
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ---------- Middlewares globales ----------
// Habilita llamadas desde el frontend (Vite/React en 5173, por ejemplo)
app.use(cors(corsOptions));

// Parsea JSON del body. Si no está, req.body vendrá undefined.
app.use(express.json());

const IMGS_DIR = process.env.IMGS_DIR || '/imagenes';
app.use(
  '/imagenes',
  express.static(IMGS_DIR, {
    fallthrough: false,
    immutable: true,
    maxAge: '1d', // cachea en prod
  })
);

// --- Auth
app.use('/api/auth', authRoutes);

// ---------- Rutas de la API ----------
// Prefijo /api para mantener contrato estable con el frontend
app.use('/api', legacySectionsRouter);
app.use('/api',  booksRouter);

app.use('/api/users', userRoutes);

// Healthcheck simple para verificar que el server responde (comentario del copilot)
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

// 404 para cualquier ruta no definida (debe ir después de todas las rutas)
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// ---------- Manejo centralizado de errores ----------
// IMPORTANTE: este middleware va al final.
// Los services basicamentinho lanzan errores con err.statusCode (400/404/...)
// y aca la idea es  los traducimos a una respuesta HTTP prolija.
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = typeof err?.statusCode === 'number' ? err.statusCode : 500;
  res.status(status).json({ error: err?.message ?? 'Internal Server Error' });
});

// Toma PORT de .env si existe; si no, usa 3000.
// Number() evita problemas cuando PORT llega como string, si seria number pasa chill.
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error:', err);
  res.status(err?.status ?? 500).json({ error: err?.message ?? 'Internal Server Error' });
});

export default app; // útil si luego querés testear la app sin levantar el server
