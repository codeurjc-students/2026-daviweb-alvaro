import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';
import { setupSwaggerUi, SWAGGER_UI_PATH } from '../src/openapi.js';

describe('OpenAPI (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    setupSwaggerUi(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves the Swagger UI', async () => {
    await request(app.getHttpServer()).get(`/${SWAGGER_UI_PATH}`).expect(200);
  });

  it('documents every public route under /api/v1', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/${SWAGGER_UI_PATH}-json`)
      .expect(200);

    expect(Object.keys(body.paths)).toEqual([
      '/api/v1/health',
      '/api/v1/services',
      '/api/v1/services/{id}',
    ]);
  });
});
