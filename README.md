# Diagnovet

Transforming veterinary medicine with artificial intelligence.

## Tech Stack

- React 19
- TypeScript 5.6
- Vite 7
- Vitest (unit testing)
- Playwright (E2E testing)
- ESLint + Prettier
- Husky + lint-staged

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Run E2E tests
yarn test:e2e

# Build for production
yarn build
```

## Scripts

| Script               | Description                  |
| -------------------- | ---------------------------- |
| `yarn dev`           | Start development server     |
| `yarn build`         | Build for production         |
| `yarn preview`       | Preview production build     |
| `yarn typecheck`     | Run TypeScript type checking |
| `yarn lint`          | Run ESLint                   |
| `yarn lint:fix`      | Fix ESLint errors            |
| `yarn test`          | Run unit tests               |
| `yarn test:watch`    | Run unit tests in watch mode |
| `yarn test:coverage` | Run tests with coverage      |
| `yarn test:e2e`      | Run E2E tests                |
| `yarn dupes`         | Check for code duplication   |
| `yarn ci`            | Run all CI checks            |

## Project Structure

```
src/
├── components/     # Reusable components
│   └── shared/     # Shared components (SEO, WorkInProgress)
├── pages/          # Page components
├── services/       # API services
├── styles/         # Global styles and CSS variables
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── constants.ts    # App constants and configuration
```

## License

MIT
