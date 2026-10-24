import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from '../common/pagination/page.js';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto.js';
import { TenantId } from '../common/tenant/tenant-id.decorator.js';
import { Service } from './service.model.js';
import { ServicesService } from './services.service.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findPage(
    @TenantId() tenantId: string,
    @Query() query: PaginationQueryDto,
  ): Promise<Page<Service>> {
    return this.servicesService.findPage(tenantId, query);
  }

  @Get(':id')
  findById(
    @TenantId() tenantId: string,
    @Param('id') id: string,
  ): Promise<Service> {
    return this.servicesService.findById(tenantId, id);
  }
}
