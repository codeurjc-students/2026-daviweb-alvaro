import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';
import { ServiceDoc } from '../src/services/schemas/service.schema.js';

describe('Services (e2e)', () => {
  let app: INestApplication<App>;
  let model: Model<ServiceDoc>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
    model = moduleRef.get<Model<ServiceDoc>>(getModelToken(ServiceDoc.name));
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  const seedHaircut = (tenantId: string) =>
    model.create({
      tenantId,
      name: 'Haircut',
      timeSegments: [{ duration: 30 }],
    });

  describe('GET /api/v1/services/:id', () => {
    it('returns the service of the requesting tenant', async () => {
      const doc = await seedHaircut('shop-a');

      const response = await request(app.getHttpServer())
        .get(`/api/v1/services/${doc.id}`)
        .set('X-Tenant-Id', 'shop-a')
        .expect(200);

      expect(response.body).toMatchObject({ id: doc.id, name: 'Haircut' });
      expect(response.body).not.toHaveProperty('tenantId');
    });

    it('returns 404 for a service of another tenant', async () => {
      const doc = await seedHaircut('shop-a');

      await request(app.getHttpServer())
        .get(`/api/v1/services/${doc.id}`)
        .set('X-Tenant-Id', 'shop-b')
        .expect(404);
    });

    it('returns 404 for an id that is not an ObjectId', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/services/not-an-id')
        .set('X-Tenant-Id', 'shop-a')
        .expect(404);
    });

    it('returns 400 without the X-Tenant-Id header', async () => {
      const doc = await seedHaircut('shop-a');

      await request(app.getHttpServer())
        .get(`/api/v1/services/${doc.id}`)
        .expect(400);
    });
  });
});
