export function errorHandler(err, req, res, _next) {
  const codigo = err.statusCode || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(codigo).json({
    error: {
      mensaje,
      codigo,
    },
  });
}
