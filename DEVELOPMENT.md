# Development Guide

## Code Quality Tools

### Prettier (Code Formatting)

**Config:** `.prettierrc`

Automatically formats code on save (if your editor supports it). Key settings:
- 100 char line width
- 2 space indentation
- Semicolons required
- Double quotes for strings
- **Tailwind class sorting** — classes are auto-sorted by Tailwind's recommended order

**Run manually:**
```bash
npm run format        # Format all files
npm run format:check  # Check formatting without changing files
```

**Editor setup (VS Code):**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### ESLint (Code Linting)

**Config:** `eslint.config.mjs` (flat config format)

Catches bugs, enforces best practices, prevents common mistakes.

**Run manually:**
```bash
npm run lint         # Check for issues
npm run lint:fix     # Auto-fix fixable issues
npm run type-check   # TypeScript + ESLint
```

**Key rules:**
- **TypeScript:**
  - `@typescript-eslint/no-floating-promises` — all promises must be awaited or explicitly ignored (`void`)
  - `@typescript-eslint/consistent-type-imports` — use `import type` for types
  - `@typescript-eslint/no-unnecessary-condition` — catch always-true/false conditions
  - Unused vars allowed if prefixed with `_` (e.g., `_unused`)

- **React:**
  - React Hooks rules enforced
  - No `React.` import needed (Next.js auto-imports)
  - Prop types disabled (using TypeScript instead)

- **Next.js:**
  - Core Web Vitals rules
  - Warn on `<img>` (use `next/image` instead)

- **Code quality:**
  - `no-console` warns (except `console.error` and `console.warn`)
  - `prefer-const` — use const when not reassigned
  - `prefer-template` — prefer template strings over concatenation
  - `no-nested-ternary` — avoid deep nesting

**Editor setup (VS Code):**
```json
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### TypeScript

**Config:** `tsconfig.json`

**Run type checking:**
```bash
npm run type-check        # One-time check
npm run type-check:watch  # Watch mode
```

## Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Check for lint issues |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format all files |
| `npm run format:check` | Check formatting |
| `npm run type-check` | Run TypeScript + ESLint |
| `npm run all` | Full check (type + lint) |

## Common Patterns

### Async functions in event handlers

When you have an async function in an event handler or effect that you don't need to await, use `void` to satisfy the linter:

```tsx
// ❌ Bad - linter error
useEffect(() => {
  fetchData(); // Error: floating promise
}, []);

// ✅ Good
useEffect(() => {
  void fetchData(); // Explicitly ignore promise
}, []);
```

### Type imports

Use `import type` for types to keep them separate from runtime code:

```tsx
// ❌ Bad
import { User } from './types';

// ✅ Good
import type { User } from './types';

// ✅ Also good (inline type import)
import { useUser, type User } from './hooks';
```

### Template strings

Prefer template strings over concatenation:

```tsx
// ❌ Bad
const url = "/api/" + endpoint;

// ✅ Good
const url = `/api/${endpoint}`;
```

## CI/CD

GitHub Actions workflow (`.github/workflows/lint.yml`) runs on every push/PR:
1. `npm run format:check` — verify formatting
2. `npm run lint` — check for lint errors
3. `npm run all` — type check + lint with zero warnings

Husky pre-commit hooks were removed — run checks manually or rely on CI.
