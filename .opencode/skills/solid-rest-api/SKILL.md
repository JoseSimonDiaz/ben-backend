---
name: solid-rest-api
description: "Use when building or reviewing REST APIs with SOLID principles. Covers: flat route naming, single-responsibility controllers, dependency-injected services, repository pattern, and error-handling middleware."
---

# SOLID + REST API

## Layer separation

| Layer | Responsibility | Example |
|-------|---------------|---------|
| `routes/` | HTTP verb + validation + delegate to controller | `quiz.routes.js` |
| `controllers/` | Extract input, call service, send response | `quiz.controller.js` |
| `services/` | Pure business logic, no Express/HTTP knowledge | `matching.service.js` |
| `models/` | Mongoose schema + indexes | `Career.model.js` |
| `middlewares/` | Cross-cutting: auth, validation, errors | `adminAuth.middleware.js` |

## Dependency injection

Controllers receive services via constructor. Routes receive controllers via factory function.

```js
// app.js — wiring layer
const matchingService = new MatchingService();
const quizController = new QuizController(matchingService);
app.use('/api/quiz', createQuizRouter(quizController));
```

## Code constraints

- **No imperative loops**: No `map`, `filter`, `forEach`, `for`, `while`. Use recursion or MongoDB aggregation.
- **No nested ifs**: Use guard clauses and early returns.
- **No console.log**: No console in production code.
- **No magic strings in comparisons**: Use constants from `errorTypes.js`, `httpStatus.js`, `config/index.js`.

## HTTP status codes

Always use `HTTP_STATUS` constants:
```js
import { HTTP_STATUS } from '../utils/httpStatus.js';
res.status(HTTP_STATUS.CREATED).json(result);
```

## Response format

No `success: true` wrapper. Status code is sufficient. Return data directly:
```js
res.status(HTTP_STATUS.OK).json(careers);          // GET list
res.status(HTTP_STATUS.CREATED).json(newItem);     // POST create
res.status(HTTP_STATUS.NO_CONTENT).end();           // DELETE
```
