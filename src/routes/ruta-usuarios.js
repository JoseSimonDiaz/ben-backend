import { Router } from 'express';
import { ControladorUsuario } from '../controllers/controlador-usuario.js';

export const router = Router();
const controlador = new ControladorUsuario();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);
