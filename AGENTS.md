# Project Ben

Backend for academic advising and vocational test application.

## Critical conventions

- **Routes**: RESTful with `/api/quiz`, `/api/careers`, `/api/experiences`, `/api/admin`. Admin routes MUST use `createAdminRouter(adminController)` from `src/routes/v1/admin.routes.js`.
- **Language**: English for code (classes, functions, files, variables)
- **Modules**: ES Modules (`import`/`export`), no `require`
- **Layers**: routes → controllers → services (MVC + Services pattern)
- **No iterations**: No `map`, `filter`, `forEach`, `for`, `while`. Use recursion or MongoDB aggregation.
- **No nested ifs**: Use guard clauses and early returns.
- **No console.log**: No console statements in production code.
- **Constants**: All HTTP status codes from `HTTP_STATUS`. All error types from `MONGOOSE_ERRORS`. All env vars from `config/index.js`. All domain enum values (targets, categories, durations) from `src/constants/domain.js`.
- **Domain constants**: All domain values (question targets, categories, durations, thresholds) define in `src/constants/domain.js` as `Object.freeze()`. Import in models, validators, and services. No magic strings or numbers.
- **Dependency injection**: ALL controllers receive services via constructor. If a service doesn't exist for a model, create one. No controller accesses models directly.
- **Schema changes**: New fields added to existing schemas MUST have a `default` value. Avoid `required: true` on new fields unless a migration script is provided.
- **Indexes**: Prefer compound indexes that match query patterns over single-field indexes. Remove redundant indexes when adding compound ones.
- **Conditional validation**: Use `express-validator`'s `.if()` method for fields whose requirement depends on another field's value.

## Commands

- `npm run dev` - Start server with watch
- `npm test` - Run tests
- `npm run lint` - Run ESLint
