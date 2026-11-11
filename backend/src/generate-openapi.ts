import { mkdir, writeFile } from 'node:fs/promises';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';
import { buildOpenApiDocument } from './openapi.js';

const OUTPUT = new URL('../../docs/api/openapi.json', import.meta.url);

// preview mode builds the route graph without instantiating providers, so no MongoDB is needed.
const app = await NestFactory.create(AppModule, {
  preview: true,
  logger: false,
});
configureApp(app);
await mkdir(new URL('.', OUTPUT), { recursive: true });
await writeFile(
  OUTPUT,
  `${JSON.stringify(buildOpenApiDocument(app), null, 2)}\n`,
);
await app.close();
