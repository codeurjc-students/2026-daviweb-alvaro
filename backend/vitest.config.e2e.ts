import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.e2e-spec.ts', 'test/**/*.int-spec.ts'],
    globalSetup: ['./test/setup/mongo-memory-server.ts'],
  },
});
