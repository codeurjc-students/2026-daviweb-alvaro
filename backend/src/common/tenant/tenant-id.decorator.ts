import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { resolveTenantId } from './tenant.resolver.js';

// Injects the tenant of the current request into a controller handler.
export const TenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string =>
    resolveTenantId(ctx.switchToHttp().getRequest<Request>().headers),
);
