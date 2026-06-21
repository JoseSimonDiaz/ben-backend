# Project Ben

Backend for academic advising and vocational test application.

## Critical conventions

- **Routes**: RESTful with `/api/quiz`, `/api/careers`, `/api/experiences`, `/api/admin`
- **Language**: English for code (classes, functions, files, variables)
- **Modules**: ES Modules (`import`/`export`), no `require`
- **Layers**: routes → controllers → services (MVC + Services pattern)
- **No iterations**: No `map`, `filter`, `forEach`, `for`, `while`. Use recursion or MongoDB aggregation.
- **No nested ifs**: Use guard clauses and early returns.
- **No console.log**: No console statements in production code.
- **Constants**: All HTTP status codes from `HTTP_STATUS`. All error types from `MONGOOSE_ERRORS`. All env vars from `config/index.js`.
- **Dependency injection**: Controllers receive services via constructor.

## Commands

- `npm run dev` - Start server with watch
- `npm test` - Run tests
- `npm run lint` - Run ESLint
