import globals from "globals";
import pluginJs from "@eslint/js";
import tslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginNext from "@next/eslint-plugin-next";

export default tslint.config(
	{
		ignores: [".next/", "node_modules/", "dist/", "public/", ".turbo/", "coverage/", "tsconfig.tsbuildinfo"],
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
			"jsx-a11y": pluginJsxA11y,
			"@next/next": pluginNext,
		},
		rules: {
			"react/jsx-uses-vars": "error",

			...pluginReactHooks.configs.recommended.rules,

			...pluginJsxA11y.configs.recommended.rules,

			...pluginNext.configs.recommended.rules,
			...pluginNext.configs["core-web-vitals"].rules,
			"@next/next/no-img-element": "warn",
			"@next/next/no-html-link-for-pages": "off",

			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",

			"prefer-const": "error",
			"no-debugger": "warn",
			"no-empty-pattern": "warn",
			"no-duplicate-imports": "error",
		},
	},
);
