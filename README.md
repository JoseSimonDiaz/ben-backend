# Ben

Backend for academic advising and vocational test application. Features a career matching algorithm, an AI assistant powered by Groq, and graduate experience surveys.

## Technologies

- **Runtime**: Node.js 20+ (ES Modules)
- **Framework**: Express 4
- **Database**: MongoDB + Mongoose 8
- **Validation**: express-validator
- **AI**: Groq SDK (Llama 3.3 70B)
- **Auth**: API key middleware (admin routes)
- **Testing**: Jest
- **Linting**: ESLint 9

## Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB instance (local or Atlas)
- Groq API key ([console.groq.com](https://console.groq.com))

### Installation

```bash
git clone <repo-url>
cd ben
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in the values:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/ben
NODE_ENV=development
ADMIN_API_KEY=your-admin-secret-key
API_AGENT_IA_KEY=gsk_your-groq-api-key
```

### Run

```bash
npm run dev    # development with watch mode
npm start      # production
npm test       # run tests
npm run lint   # run linter
```

## API Overview

### Public Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/questions?target=student\|graduate` | List questions by target |
| GET | `/api/v1/careers` | List all careers |
| POST | `/api/v1/quiz` | Submit quiz answers |
| POST | `/api/v1/experiences` | Submit graduate experience |
| POST | `/api/v1/chat` | AI assistant chat |
| GET | `/api/v1/careers/:id/stats` | Career statistics |

### Admin Endpoints (require `x-api-key` header)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/admin/stats` | Dashboard statistics |
| GET/POST | `/api/v1/admin/careers` | List / Create careers |
| GET/PUT/DEL | `/api/v1/admin/careers/:id` | CRUD single career |
| GET/POST | `/api/v1/admin/questions` | List / Create questions |
| GET/PUT/DEL | `/api/v1/admin/questions/:id` | CRUD single question |

## Project Structure

```
src/
├── config/            # Environment config + DB connection
├── constants/         # Domain values, error types, prompts
├── controllers/       # Route handlers (quiz, career, experience, admin, chat, public)
├── middlewares/       # Validation, auth, error handling
├── models/            # Mongoose schemas (5 models)
├── routes/v1/         # Express routers
├── services/          # Business logic (matching, stats, AI, etc.)
├── tools/             # AI agent tools (career + experience queries)
├── utils/             # HTTP status codes, AppError, array helpers
├── validators/        # express-validator rules
└── app.js             # App setup and DI wiring
```

## Conventions

- MVC + Services with dependency injection
- Recursion instead of `map`/`filter`/`forEach`/`for`/`while`
- Guard clauses, no nested `if`s
- `HTTP_STATUS` and `MONGOOSE_ERRORS` constants for status codes
- All domain enums in `src/constants/domain.js` as `Object.freeze()`
- No `console.log` in production code
