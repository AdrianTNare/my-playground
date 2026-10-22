import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 removed `next lint`; ESLint runs directly on flat config.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    // Playwright's fixture callback is named `use`, which rules-of-hooks
    // mistakes for React's `use` hook.
    files: ["playwright-tests/**/*.ts"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
]);
