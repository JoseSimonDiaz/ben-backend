export class ControladorProducto {
  constructor() {
    this.servicioProducto = null;
  }

  listar = async (req, res, next) => {
    try {
      res.json({ data: [] });
    } catch (err) {
      next(err);
    }
  };

  obtener = async (req, res, next) => {
    try {
      res.json({ data: null });
    } catch (err) {
      next(err);
    }
  };

  crear = async (req, res, next) => {
    try {
      res.status(201).json({ data: null });
    } catch (err) {
      next(err);
    }
  };

  actualizar = async (req, res, next) => {
    try {
      res.json({ data: null });
    } catch (err) {
      next(err);
    }
  };

  eliminar = async (req, res, next) => {
    try {
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}
