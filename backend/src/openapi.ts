import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { API_PREFIX } from './app.setup.js';

export const SWAGGER_UI_PATH = `${API_PREFIX}/docs`;

// Shared by the Swagger UI (main.ts) and the spec exporter (generate-openapi.ts).
export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Daviweb API')
    .setDescription('REST API of the multi-tenant hairdresser booking platform')
    .setVersion('0.1.0')
    .build();
  return SwaggerModule.createDocument(app, config);
}

export function setupSwaggerUi(app: INestApplication): void {
  SwaggerModule.setup(SWAGGER_UI_PATH, app, buildOpenApiDocument(app));
}
