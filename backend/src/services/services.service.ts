import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { buildPage, Page, PageRequest } from '../common/pagination/page.js';
import { Service, ServiceData } from './service.model.js';
import { ServicesRepository } from './services.repository.js';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(private readonly repository: ServicesRepository) {}

  async findPage(
    tenantId: string,
    pageRequest: PageRequest,
  ): Promise<Page<Service>> {
    const [items, total] = await this.repository.findPage(
      tenantId,
      pageRequest,
    );
    return buildPage(items, total, pageRequest);
  }

  async findById(tenantId: string, id: string): Promise<Service> {
    const service = await this.repository.findById(tenantId, id);
    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return service;
  }

  async create(tenantId: string, data: ServiceData): Promise<Service> {
    const service = await this.repository.create(tenantId, data);
    this.logger.log(`Service ${service.id} created for tenant ${tenantId}`);
    return service;
  }
}
