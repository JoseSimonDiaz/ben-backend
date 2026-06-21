---
name: solid-rest-api
description: "Use when building or reviewing REST APIs with SOLID principles. Covers: flat route naming (ruta-usuarios, NOT rutas/usuarios), single-responsibility controllers, dependency-injected services, repository pattern, and error-handling middleware."
---

# SOLID + REST API

## Reglas de arquitectura

### 1. Rutas planas con guiones (NO anidadas)

Cada recurso es una ruta plana con guiones. Sin plurales, sin anidamiento.

```
Correcto:        /api/ruta-usuarios
                 /api/ruta-productos
                 /api/ruta-pedidos
                 /api/ruta-autenticacion

Incorrecto:      /api/usuarios
                 /api/rutas/usuarios
                 /api/v1/users
                 /api/productos/123/comentarios
```

### 2. SOLID en capas

Cada capa tiene UNA responsabilidad:

| Capa | Responsabilidad |
|------|----------------|
| `routes/` | Define ruta + verbo HTTP, delega al controlador |
| `controllers/` | Recibe req/res, valida entrada, llama al servicio, responde |
| `services/` | Lógica de negocio pura, sin conocer Express |
| `repositories/` | Acceso a datos (BD, API externa, memoria) |
| `middlewares/` | Cross-cutting: errores, auth, logging, validación |
| `models/` | Schemas/DTOs, sin comportamiento de negocio |
| `validators/` | Reglas de validación de entrada |

### 3. Principios SOLID aplicados

- **S**: Cada archivo = una responsabilidad. Un controlador no consulta BD.
- **O**: Servicios y repositorios se extienden por composición, no modificando el original.
- **L**: Los controladores pueden heredar de una base común si comparten patrones.
- **I**: Interfaces pequeñas y específicas. Cada servicio expone solo lo que necesita.
- **D**: Las capas superiores dependen de abstracciones (inyección por constructor), no de implementaciones concretas.

### 4. Convenciones de código

- ES Modules (`import`/`export`) siempre
- Nombres en español con guiones para archivos de ruta: `ruta-usuarios.js`
- Clases con nombre PascalCase en español: `ControladorUsuario`, `ServicioUsuario`
- Verbos HTTP semánticos: GET lista, POST crea, PUT reemplaza, PATCH parcial, DELETE elimina
- Códigos de estado explícitos: 201 en creación, 204 sin contenido, 400 bad request, 404 not found
