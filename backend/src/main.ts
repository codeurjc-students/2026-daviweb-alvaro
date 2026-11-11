import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { API_PREFIX, configureApp } from './app.setup.js';
import { Environment, EnvironmentVariables } from './config/env.validation.js';
import { setupSwaggerUi } from './openapi.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);
  const port = config.get('PORT', { infer: true });
  const isProduction =
    config.get('NODE_ENV', { infer: true }) === Environment.Production;
  if (!isProduction) setupSwaggerUi(app);
  await app.listen(port);

  new Logger('Bootstrap').log(
    `API listening on port ${port} at /${API_PREFIX} (${config.get('NODE_ENV', { infer: true })})`,
  );
}
await bootstrap();
