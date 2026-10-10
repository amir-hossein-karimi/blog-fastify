# Fastify Blog

A simple blog REST API built with **Fastify**, **PostgreSQL**, **Prisma**, and **Redis**.

## Features

- CRUD for blog posts
- JWT authentication (register / login)
- Redis caching for post reads, with automatic invalidation on writes
- Request validation with JSON Schema
- Type-safe database access via Prisma
- Docker Compose for local Postgres and Redis

## Tech Stack

| Layer      | Tool                    |
| ---------- | ----------------------- |
| Framework  | Fastify                 |
| Database   | PostgreSQL              |
| ORM        | Prisma                  |
| Cache      | Redis (ioredis)         |
| Auth       | @fastify/jwt            |
| Language   | TypeScript              |

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── plugins/        # prisma, redis, jwt registered as Fastify plugins
│   ├── routes/         # auth.ts, posts.ts
│   ├── schemas/        # request/response JSON schemas
│   ├── app.ts          # builds the Fastify instance
│   └── server.ts       # starts the server
├── docker-compose.yml
├── .env.example
└── package.json
```

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (for Postgres and Redis)
- npm, pnpm, or yarn

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/fastify-blog.git
cd fastify-blog
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="change-me"
CACHE_TTL_SECONDS=60
```

### 3. Start Postgres and Redis

```bash
docker compose up -d
```

### 4. Run migrations

```bash
npx prisma migrate dev
```

### 5. Start the server

```bash
npm run dev
```

The API is now running at `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Create a new user      |
| POST   | `/auth/login`    | Get a JWT token        |

### Posts

| Method | Endpoint      | Auth | Description                |
| ------ | ------------- | ---- | -------------------------- |
| GET    | `/posts`      | No   | List posts (paginated)     |
| GET    | `/posts/:id`  | No   | Get a single post          |
| POST   | `/posts`      | Yes  | Create a post              |
| PUT    | `/posts/:id`  | Yes  | Update your post           |
| DELETE | `/posts/:id`  | Yes  | Delete your post           |

Send the token as `Authorization: Bearer <token>`.

## Caching Strategy

- `GET /posts` and `GET /posts/:id` check Redis first (cache-aside).
- On a cache miss, data is read from Postgres and stored in Redis with a TTL.
- `POST`, `PUT`, and `DELETE` invalidate the related keys (`posts:list:*` and `posts:<id>`).

## Scripts

| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| `npm run dev`            | Start in watch mode              |
| `npm run build`          | Compile TypeScript               |
| `npm start`              | Run the compiled build           |
| `npx prisma studio`      | Open Prisma Studio               |
| `npx prisma migrate dev` | Create and apply a migration     |

## Roadmap

- [ ] Comments
- [ ] Tags and categories
- [ ] Rate limiting with Redis
- [ ] Swagger docs via @fastify/swagger

## License

MIT
