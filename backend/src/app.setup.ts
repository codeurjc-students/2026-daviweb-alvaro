import { INestApplication } from '@nestjs/common';

export const API_PREFIX = 'api/v1';

// Shared by main.ts and the e2e tests so both expose the same routes.
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
}
