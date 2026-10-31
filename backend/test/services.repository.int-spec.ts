import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import {
  ServiceDoc,
  ServiceSchema,
} from '../src/services/schemas/service.schema.js';
import { ServiceData } from '../src/services/service.model.js';
import { ServicesRepository } from '../src/services/services.repository.js';

const haircut = (name: string): ServiceData => ({
  name,
  description: '',
  timeSegments: [{ duration: 30, breakAfter: 0 }],
  requiresHairLength: false,
});

describe('ServicesRepository (integration)', () => {
  let moduleRef: TestingModule;
  let repository: ServicesRepository;
  let connection: Connection;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
        MongooseModule.forFeature([
          { name: ServiceDoc.name, schema: ServiceSchema },
        ]),
      ],
      providers: [ServicesRepository],
    }).compile();
    repository = moduleRef.get(ServicesRepository);
    connection = moduleRef.get<Connection>(getConnectionToken());
  });

  afterEach(async () => {
    await connection.collection('services').deleteMany({});
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('creates a service and finds it by id within its tenant', async () => {
    const created = await repository.create('shop-a', haircut('Haircut'));

    expect(created).toMatchObject({
      name: 'Haircut',
      requiresHairLength: false,
    });
    expect(created).not.toHaveProperty('tenantId');
    await expect(repository.findById('shop-a', created.id)).resolves.toEqual(
      created,
    );
  });

  it('does not find a service from another tenant', async () => {
    const created = await repository.create('shop-a', haircut('Haircut'));

    await expect(repository.findById('shop-b', created.id)).resolves.toBeNull();
  });

  it('returns null for an id that is not an ObjectId', async () => {
    await expect(
      repository.findById('shop-a', 'not-an-id'),
    ).resolves.toBeNull();
  });

  it('pages a tenant services sorted by name and counts only that tenant', async () => {
    for (const name of ['C', 'A', 'B']) {
      await repository.create('shop-a', haircut(name));
    }
    await repository.create('shop-b', haircut('Other tenant'));

    const [firstPage, total] = await repository.findPage('shop-a', {
      page: 0,
      size: 2,
    });
    const [secondPage] = await repository.findPage('shop-a', {
      page: 1,
      size: 2,
    });

    expect(firstPage.map((s) => s.name)).toEqual(['A', 'B']);
    expect(secondPage.map((s) => s.name)).toEqual(['C']);
    expect(total).toBe(3);
  });
});
