# Proyecto Ben

Backend RESTful con Node.js y Express.

## Convenciones críticas

- **Rutas**: Siempre planas con guiones: `/api/ruta-usuarios`, NO `/api/usuarios` ni `/api/rutas/usuarios`
- **Idioma**: Código en español (clases, funciones, archivos)
- **Módulos**: ES Modules (`import`/`export`), sin `require`
- **Capas**: routes → controllers → services → repositories (cada capa una responsabilidad)
- **Errores**: Siempre try/catch con `next(err)` en controladores

## Comandos

- `npm run dev` - Inicia servidor con watch
- `npm test` - Ejecuta tests
- `npm run lint` - Ejecuta ESLint
