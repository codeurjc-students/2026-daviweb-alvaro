import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { API_PREFIX } from '../app.setup.js';
import { Page } from '../common/pagination/page.js';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto.js';
import { TenantId } from '../common/tenant/tenant-id.decorator.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
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

  @Post()
  async create(
    @TenantId() tenantId: string,
    @Body() dto: CreateServiceDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Service> {
    const service = await this.servicesService.create(tenantId, dto);
    res.location(`/${API_PREFIX}/services/${service.id}`);
    return service;
  }
}
