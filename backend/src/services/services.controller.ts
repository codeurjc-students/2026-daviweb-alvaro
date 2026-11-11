import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { API_PREFIX } from '../app.setup.js';
import { Page } from '../common/pagination/page.js';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto.js';
import { TENANT_HEADER } from '../common/tenant/tenant.resolver.js';
import { TenantId } from '../common/tenant/tenant-id.decorator.js';
import { CreateServiceDto } from './dto/create-service.dto.js';
import {
  ServicePageDto,
  ServiceResponseDto,
} from './dto/service-response.dto.js';
import { Service } from './service.model.js';
import { ServicesService } from './services.service.js';

@ApiTags('services')
@ApiHeader({
  name: TENANT_HEADER,
  description: 'Tenant (hairdresser) the request belongs to',
  required: true,
})
@ApiBadRequestResponse({ description: 'Invalid parameters or missing tenant' })
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'List the services of the tenant, paginated' })
  @ApiOkResponse({ type: ServicePageDto })
  findPage(
    @TenantId() tenantId: string,
    @Query() query: PaginationQueryDto,
  ): Promise<Page<Service>> {
    return this.servicesService.findPage(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by id' })
  @ApiOkResponse({ type: ServiceResponseDto })
  @ApiNotFoundResponse({ description: 'Service not found for this tenant' })
  findById(
    @TenantId() tenantId: string,
    @Param('id') id: string,
  ): Promise<Service> {
    return this.servicesService.findById(tenantId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a service' })
  @ApiCreatedResponse({
    type: ServiceResponseDto,
    description: 'Created',
    headers: {
      Location: {
        description: 'URL of the new service',
        schema: { type: 'string' },
      },
    },
  })
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
