import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginNext from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    // Global ignores for the entire project
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'public/',
      '.turbo/',
      'coverage/',
      'tsconfig.tsbuildinfo',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
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
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      '@next/next': pluginNext,
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js 13+
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/display-name': 'off', // Often not needed in Next.js components
      'react/jsx-uses-react': 'off', // Not needed with React 17+
      'react/jsx-uses-vars': 'error',

      // React Hooks rules
      ...pluginReactHooks.configs.recommended.rules,

      // Accessibility rules
      ...pluginJsxA11y.configs.recommended.rules,

      // Next.js specific rules
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'off',

      // TypeScript ESLint rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // General ESLint rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-debugger': 'warn',
      'no-empty-pattern': 'warn',
      'no-duplicate-imports': 'error',
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off', // Use TypeScript version instead
    },
  },
  // Prettier configuration (must be last to override other formatting rules)
  prettierConfig
);
