/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

/**
 * Vitest configuration wired through Astro's `getViteConfig` so tests run
 * under the same Vite/Astro pipeline (plugins, aliases, SSR hints).
 *
 * Two projects (Vitest 4 `test.projects`):
 *   - `unit`      — `happy-dom` environment; pure helpers and React island
 *                   component tests.
 *   - `dist`      — `node` environment; structural invariants over built
 *                   HTML in `dist/`.
 *
 * CLI usage:
 *   npm run test             — all projects
 *   npm run test:unit        — `unit` project scoped to `tests/unit/**`
 *   npm run test:component   — `unit` project scoped to `tests/component/**`
 *   npm run test:dist        — `dist` project scoped to `tests/dist/**`
 */
export default getViteConfig({
  test: {
    // Root-level options inherited by every project via `extends: true`.
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx,astro}'],
      exclude: ['src/**/*.d.ts', 'src/env.d.ts'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          include: [
            'tests/unit/**/*.test.ts',
            'tests/component/**/*.test.tsx',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'dist',
          environment: 'node',
          include: ['tests/dist/**/*.test.ts'],
        },
      },
    ],
  },
});
