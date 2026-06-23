# Smart Metrics Logbook — Backend

Express + MongoDB (Mongoose) API for tracking personal health metrics and their recorded values.

## Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # start with nodemon
# or
npm start              # start with node
```

## Scripts

- `npm run dev` — start with nodemon
- `npm start` — start the server
- `npm test` — run the mocha test suite

## Environment variables

See `.env.example`. Required: `TOKEN_SECRET`, `MONGODB_URI_PRODUCTION`.

## API

All non-auth routes require an `x-auth-token` header (see Authentication).

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/api/auth/register` | Register and receive a token |
| POST | `/api/auth/login` | Log in and receive a token |
| GET | `/api/auth/loadUser` | Current user |
| GET/POST/PUT/DELETE | `/api/metrics` | Manage metric definitions |
| POST/PUT/GET/DELETE | `/api/metrics/wage` | Manage recorded metric values |
| GET/POST/PUT/DELETE | `/api/group` | Manage metric groups |

## Authentication

Stateless JWT in the `x-auth-token` header. Payload: `{ user: { id } }`, signed with `TOKEN_SECRET`, expiring after `TOKEN_EXPIRY` (default `5 days`).
