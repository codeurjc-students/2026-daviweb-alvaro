import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Service } from './service.model.js';
import { ServicesRepository } from './services.repository.js';
import { ServicesService } from './services.service.js';

const haircut: Service = {
  id: '64f1a2b3c4d5e6f7a8b9c0d1',
  name: 'Haircut',
  description: '',
  timeSegments: [{ duration: 30, breakAfter: 0 }],
  requiresHairLength: false,
};

describe('ServicesService', () => {
  const repository = { findById: vi.fn() };
  let service: ServicesService;

  beforeEach(async () => {
    repository.findById.mockReset();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: ServicesRepository, useValue: repository },
      ],
    }).compile();
    service = moduleRef.get(ServicesService);
  });

  describe('findById', () => {
    it('returns the service found in the tenant', async () => {
      repository.findById.mockResolvedValue(haircut);

      await expect(service.findById('shop-a', haircut.id)).resolves.toEqual(
        haircut,
      );
      expect(repository.findById).toHaveBeenCalledWith('shop-a', haircut.id);
    });

    it('throws NotFoundException when the service does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('shop-a', haircut.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
