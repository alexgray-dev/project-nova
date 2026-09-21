# Project Nova

Node.js Express user management API with an in-memory model, request logger middleware, and Jest tests.

## Requirements

- Node.js 18+

## Getting started

```bash
npm install
npm start
```

The API runs on http://localhost:3000 by default (set `PORT` to override). A static page is served at `/`.

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create a user (`name`, `email`, optional `age`) |
| GET | `/api/users/:id` | Get a user by id |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |
| GET | `/health` | Health check |

Example:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","age":36}'
```

## Tests

```bash
npm test
```

## Project structure

```
project-nova/
├── src/
│   ├── app.js                    Express app setup and entry point
│   ├── controllers/
│   │   └── userController.js     Request handlers for user routes
│   ├── routes/
│   │   └── users.js              /api/users router
│   ├── models/
│   │   └── user.js               In-memory user store
│   └── middleware/
│       └── logger.js             Request logging middleware
├── public/
│   ├── index.html                Static landing page
│   └── style.css
├── tests/
│   └── users.test.js             Jest + Supertest API tests
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```
