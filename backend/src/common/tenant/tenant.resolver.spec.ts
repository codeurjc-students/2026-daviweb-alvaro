import { BadRequestException } from '@nestjs/common';
import { resolveTenantId, TENANT_HEADER } from './tenant.resolver.js';

describe('resolveTenantId', () => {
  it('returns the tenant id from the header', () => {
    expect(resolveTenantId({ [TENANT_HEADER]: 'barber-shop-1' })).toBe(
      'barber-shop-1',
    );
  });

  it.each([
    ['missing', undefined],
    ['empty', ''],
    ['uppercase', 'BarberShop'],
    ['leading hyphen', '-shop'],
    ['injection attempt', '{"$ne":null}'],
    ['repeated header', ['a', 'b']],
  ])('rejects a %s header', (_case, value) => {
    expect(() => resolveTenantId({ [TENANT_HEADER]: value })).toThrow(
      BadRequestException,
    );
  });
});
