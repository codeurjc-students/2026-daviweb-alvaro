# Backend

REST API of the project, built with NestJS and MongoDB. Requires Node 24 (`nvm use`).

Local MongoDB for development (`mongo:8.2`: the 8.0 image does not start on Linux kernels 6.19+, see
[SERVER-121912](https://jira.mongodb.org/browse/SERVER-121912)):

```bash
docker run -d --name daviweb-mongo -p 27017:27017 mongo:8.2
cp .env.example .env
```

E2E tests start their own in-memory MongoDB, so they need no running database.

```bash
npm ci
npm run start:dev   # http://localhost:3000
npm test            # unit tests (Vitest)
npm run test:e2e    # end-to-end tests (Vitest + Supertest)
npm run lint        # oxlint
```
