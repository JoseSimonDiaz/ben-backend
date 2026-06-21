import { Router } from 'express';
import { ControladorProducto } from '../controllers/controlador-producto.js';

export const router = Router();
const controlador = new ControladorProducto();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);
