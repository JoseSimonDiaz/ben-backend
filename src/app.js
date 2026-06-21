import express from 'express';
import { errorHandler } from './middlewares/manejador-errores.js';
import { router as rutaUsuarios } from './routes/ruta-usuarios.js';
import { router as rutaProductos } from './routes/ruta-productos.js';

const app = express();

app.use(express.json());

app.use('/api/ruta-usuarios', rutaUsuarios);
app.use('/api/ruta-productos', rutaProductos);

app.use(errorHandler);

export default app;
