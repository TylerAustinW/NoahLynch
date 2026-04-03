import globals from "globals";
import pluginJs from "@eslint/js";
import tslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";

export default tslint.config(
  {
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      "public/",
      ".turbo/",
      "coverage/",
      "tsconfig.tsbuildinfo",
      "next-env.d.ts",
    ],
  },
  pluginJs.configs.recommended,
  ...tslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
    },
    rules: {
      // React
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off", // Not needed in Next.js 13+
      "react/prop-types": "off", // Using TypeScript for prop validation
      ...pluginReactHooks.configs.recommended.rules,

      // Next.js
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "off",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-floating-promises": "error",

      // General code quality
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-empty-pattern": "warn",
      "no-duplicate-imports": "warn",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "warn",
    },
  },
  eslintConfigPrettier,
);
