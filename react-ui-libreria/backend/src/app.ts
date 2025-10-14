// backend/src/app.ts
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors, { CorsOptions } from 'cors'
import path from 'path'

// Rutas de autenticación
import authRoutes from './routes/auth.routes'
// Router para libros
import { booksRouter } from './routes/books.routes'
// Router para usuarios
import { userRoutes } from './routes/user.routes'
// Rutas legacy de secciones (si las usás)
import { legacySectionsRouter } from './routes/legacy.sections.routes'

const app = express()

// --- CORS ---------------------------------------------------------------
// FRONTEND_URLS puede traer múltiples orígenes separados por coma.
// Ejemplo .env (Render):
// FRONTEND_URLS=http://localhost:5173,https://tu-front.vercel.app
const ALLOWED_ORIGINS = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: false, // <- true solo si usás cookies/sesión
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',  // <-- añadido
    'Pragma'          // <-- añadido
  ],
};
app.use(cors(corsOptions));
// -----------------------------------------------------------------------
// Parseo JSON del body. Si no está, req.body viene undefined.
app.use(express.json())

// Archivos estáticos de imágenes que puede referenciar el front como /imagenes/...
const IMGS_DIR = process.env.IMGS_DIR || path.join(process.cwd(), 'imagenes')
app.use(
  '/imagenes',
  express.static(IMGS_DIR, {
    fallthrough: false,
    immutable: true,
    maxAge: '1d', // cachea en prod
  })
)

// --- Auth ---------------------------------------------------------------
app.use('/api/auth', authRoutes)

// --- Prefijo /api para mantener contrato estable con el frontend -------
app.use('/api', legacySectionsRouter)
app.use('/api', booksRouter)
app.use('/api/users', userRoutes)

// --- Healthcheck simple -------------------------------------------------
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }))

// --- 404 genérico (después de todas las rutas) -------------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
})

// --- Manejo centralizado de errores ------------------------------------
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = typeof err?.statusCode === 'number' ? err.statusCode : 500
  res.status(status).json({ error: err?.message ?? 'Internal Server Error' })
})

// --- Arranque -----------------------------------------------------------
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})

export default app
