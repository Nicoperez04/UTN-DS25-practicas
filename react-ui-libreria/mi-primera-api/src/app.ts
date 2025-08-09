import express from 'express';
import cors from 'cors';
import path from 'path';

// Importamos las rutas de cada sección
import ficcionRoutes from './routes/ficcion.routes';
import historiaRoutes from './routes/historia.routes';
import deporteRoutes from './routes/deporte.routes';
import infantilRoutes from './routes/infantil.routes';

const app = express();
const PORT = 3000;

// Servir la carpeta de imágenes
app.use('/imagenes', express.static(path.join(__dirname, '../public/imagenes')));
// Middleware para permitir solicitudes desde el frontend
app.use(cors());
// Middleware para interpretar JSON
app.use(express.json());

// Rutas del backend
app.use('/api/ficcion', ficcionRoutes);
app.use('/api/historia', historiaRoutes);
app.use('/api/deporte', deporteRoutes);
app.use('/api/infantil', infantilRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
