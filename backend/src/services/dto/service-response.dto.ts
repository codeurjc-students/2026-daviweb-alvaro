import { CreateServiceDto } from './create-service.dto.js';

// Documentation-only classes: Swagger cannot read the interfaces the controller returns.
export class ServiceResponseDto extends CreateServiceDto {
  id: string;
}

export class ServicePageDto {
  items: ServiceResponseDto[];
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
}
