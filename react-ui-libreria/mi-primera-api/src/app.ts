import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Routers por sección (el router NO hace lógica; solo enruta a controllers)
import ficcionRoutes from './routes/ficcion.routes';
import historiaRoutes from './routes/historia.routes';
import deporteRoutes from './routes/deporte.routes';
import infantilRoutes from './routes/infantil.routes';

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}

// ---------- Middlewares globales ----------
// Habilita llamadas desde el frontend (Vite/React en 5173, por ejemplo)
app.use(cors(corsOptions));

// Parsea JSON del body. Si no está, req.body vendrá undefined.
app.use(express.json());

const IMAGES_DIR = path.resolve(__dirname, '../public/imagenes');
app.use('/imagenes', express.static(IMAGES_DIR));

// ---------- Rutas de la API ----------
// Prefijo /api para mantener contrato estable con el frontend
app.use('/api/ficcion',  ficcionRoutes);
app.use('/api/historia', historiaRoutes);
app.use('/api/deporte',  deporteRoutes);
app.use('/api/infantil', infantilRoutes);

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

export default app; // útil si luego querés testear la app sin levantar el server
