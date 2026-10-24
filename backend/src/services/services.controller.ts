import { Controller, Get, Param } from '@nestjs/common';
import { TenantId } from '../common/tenant/tenant-id.decorator.js';
import { Service } from './service.model.js';
import { ServicesService } from './services.service.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get(':id')
  findById(
    @TenantId() tenantId: string,
    @Param('id') id: string,
  ): Promise<Service> {
    return this.servicesService.findById(tenantId, id);
  }
}
