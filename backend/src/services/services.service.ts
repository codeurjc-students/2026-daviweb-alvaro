import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './service.model.js';
import { ServicesRepository } from './services.repository.js';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServicesRepository) {}

  async findById(tenantId: string, id: string): Promise<Service> {
    const service = await this.repository.findById(tenantId, id);
    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return service;
  }
}
