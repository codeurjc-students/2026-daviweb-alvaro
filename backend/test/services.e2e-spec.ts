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

  describe('GET /api/v1/services', () => {
    const seedMany = (tenantId: string, count: number) =>
      model.insertMany(
        Array.from({ length: count }, (_, i) => ({
          tenantId,
          name: `Service ${String(i).padStart(2, '0')}`,
          timeSegments: [{ duration: 30 }],
        })),
      );

    it('returns the first 10 services and reports that there are more', async () => {
      await seedMany('shop-a', 11);

      const response = await request(app.getHttpServer())
        .get('/api/v1/services')
        .set('X-Tenant-Id', 'shop-a')
        .expect(200);

      expect(response.body).toMatchObject({
        page: 0,
        size: 10,
        total: 11,
        hasMore: true,
      });
      expect(response.body.items).toHaveLength(10);
    });

    it('returns the last page without more items', async () => {
      await seedMany('shop-a', 11);

      const response = await request(app.getHttpServer())
        .get('/api/v1/services?page=1')
        .set('X-Tenant-Id', 'shop-a')
        .expect(200);

      expect(response.body).toMatchObject({
        page: 1,
        total: 11,
        hasMore: false,
      });
      expect(response.body.items.map((s: { name: string }) => s.name)).toEqual([
        'Service 10',
      ]);
    });

    it('only lists services of the requesting tenant', async () => {
      await seedMany('shop-a', 2);
      await seedMany('shop-b', 3);

      const response = await request(app.getHttpServer())
        .get('/api/v1/services')
        .set('X-Tenant-Id', 'shop-b')
        .expect(200);

      expect(response.body.total).toBe(3);
    });

    it.each(['size=0', 'size=51', 'page=-1', 'page=abc', 'sort=name'])(
      'returns 400 for an invalid query (%s)',
      async (query) => {
        await request(app.getHttpServer())
          .get(`/api/v1/services?${query}`)
          .set('X-Tenant-Id', 'shop-a')
          .expect(400);
      },
    );
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

  describe('POST /api/v1/services', () => {
    const validBody = {
      name: 'Haircut',
      description: 'Classic cut',
      timeSegments: [{ duration: 30, breakAfter: 5 }],
      requiresHairLength: false,
      hourRange: { start: '09:00', end: '14:00' },
    };

    const post = (body: object) =>
      request(app.getHttpServer())
        .post('/api/v1/services')
        .set('X-Tenant-Id', 'shop-a')
        .send(body);

    it('creates the service and returns 201 with its Location', async () => {
      const response = await post(validBody).expect(201);

      expect(response.body).toMatchObject({
        ...validBody,
        id: expect.any(String),
      });
      expect(response.headers.location).toBe(
        `/api/v1/services/${response.body.id}`,
      );

      const fetched = await request(app.getHttpServer())
        .get(response.headers.location)
        .set('X-Tenant-Id', 'shop-a')
        .expect(200);
      expect(fetched.body).toEqual(response.body);
    });

    it.each([
      ['a field outside the contract', { ...validBody, tenantId: 'shop-b' }],
      ['an empty name', { ...validBody, name: '' }],
      [
        'a nested segment with a negative duration',
        { ...validBody, timeSegments: [{ duration: -5 }] },
      ],
      [
        'an hour range in the wrong format',
        { ...validBody, hourRange: { start: '9am', end: '14:00' } },
      ],
      ['a missing required field', { name: 'Haircut' }],
    ])('returns 400 for %s', async (_case, body) => {
      await post(body).expect(400);
      expect(await model.countDocuments()).toBe(0);
    });
  });
});
