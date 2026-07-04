import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored design reference, not application code.
    "design_handoff_personal_site/**",
  ]),
  // This is a prose-heavy editorial site where authors write apostrophes and
  // quotes directly in JSX/MDX; escaping them everywhere is error-prone and
  // the characters are valid HTML.
  { rules: { "react/no-unescaped-entities": "off" } },
]);

export default eslintConfig;
