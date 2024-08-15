import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // Para evitar o uso de 'any'
      // Outras regras podem ser adicionadas aqui
    },
  },
  {
    files: ["**/*.js"],
    ...pluginJs.configs.recommended,
  },
  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended,
  },
];
