---
name: node-backend
description: "Use when writing Node.js backend code. Covers: ES modules, Express patterns, error handling, testing with Jest, ESLint config, and project structure conventions."
---

# Node.js Backend

## Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express 4.x
- **Database**: MongoDB with Mongoose 8.x
- **Validation**: express-validator
- **Security**: helmet, cors
- **Testing**: Jest
- **Linting**: ESLint 9.x (flat config)
- **Modules**: ES Modules (`"type": "module"`)

## Key libraries

| Library | Purpose |
|---------|---------|
| `express` | HTTP server |
| `mongoose` | MongoDB ODM |
| `dotenv` | Environment variables |
| `cors` | Cross-origin requests |
| `helmet` | Security headers |
| `express-validator` | Request validation |

## Error handling

Use `AppError` class and centralized middleware:

```js
import { AppError } from '../utils/AppError.js';
throw new AppError('Not found', HTTP_STATUS.NOT_FOUND);
```

All errors are caught by `catchAsync` wrapper and processed by `errorHandler.middleware.js`.

## Project structure

```
src/
├── config/          # Centralized env vars + DB connection
├── controllers/     # Request/response handling
├── middlewares/      # Validation, auth, error handling
├── models/          # Mongoose schemas
├── routes/          # Route definitions with validation
├── services/        # Business logic
└── utils/           # Shared utilities
```

## Testing with Jest

Tests mirror `src/` structure under `tests/`.
