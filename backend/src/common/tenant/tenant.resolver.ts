import { BadRequestException } from '@nestjs/common';

export const TENANT_HEADER = 'x-tenant-id';

// Same rules as a DNS label, so the id can later come from the subdomain unchanged.
const TENANT_ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

type HeaderValue = string | string[] | undefined;

export function resolveTenantId(headers: Record<string, HeaderValue>): string {
  const value = headers[TENANT_HEADER];
  if (typeof value !== 'string' || !TENANT_ID_PATTERN.test(value)) {
    throw new BadRequestException(`Missing or invalid ${TENANT_HEADER} header`);
  }
  return value;
}
