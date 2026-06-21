---
name: node-backend
description: "Use when writing Node.js backend code. Covers: ES modules, Express patterns, error handling, testing with Jest, ESLint config, and project structure conventions."
---

# Node.js Backend

## Stack

- **Runtime**: Node.js (versión LTS más reciente)
- **Framework**: Express 4.x
- **Testing**: Jest
- **Linting**: ESLint 9.x (flat config)
- **Formato**: ES Modules (`"type": "module"` en package.json)

## Módulos ES

```js
// Importar
import express from 'express';
import { router as rutaUsuarios } from './routes/ruta-usuarios.js';

// Exportar
export class ServicioUsuario {}
export default app;
```

## Manejo de errores

Los errores se lanzan con `statusCode` y se capturan en el middleware centralizado:

```js
export class AppError extends Error {
  constructor(mensaje, statusCode = 500) {
    super(mensaje);
    this.statusCode = statusCode;
  }
}
```

## Testing con Jest

Los tests van en `tests/` con estructura espejo a `src/`:

```
tests/
  routes/
    ruta-usuarios.test.js
  services/
    servicio-usuario.test.js
```

## ESLint

Usar flat config (`eslint.config.js`) con reglas para ES Modules y Node.js.
