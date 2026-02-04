# DiagnoVet

Transforming veterinary medicine with artificial intelligence.

[![CI](https://github.com/pgolivera/diagnovet/actions/workflows/ci.yml/badge.svg)](https://github.com/pgolivera/diagnovet/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Live Demo

**[https://d2hyfaqig0l709.cloudfront.net](https://d2hyfaqig0l709.cloudfront.net)**

## Overview

DiagnoVet is a UI prototype for a veterinary AI diagnostic platform. This project identifies visual and interaction improvements in the current diagnoVET platform and implements a functional prototype to enhance veterinarian efficiency.

**[Read the full UI Analysis](./ANALYSIS.md)**

## Key Features

| Feature               | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| **1-Click Language**  | Switch between Spanish, English, and Portuguese instantly from the header |
| **Unified Auth Flow** | Streamlined login/signup with Google OAuth support                        |
| **AI Image Viewer**   | Drag & drop images, select exam type, view AI-generated findings by organ |
| **Dark/Light Theme**  | Toggle between themes with preference persistence                         |
| **Responsive Design** | Works seamlessly on desktop and tablet devices                            |

## Tech Stack

| Category     | Technology                |
| ------------ | ------------------------- |
| Framework    | React 19                  |
| Language     | TypeScript 5.6            |
| Build Tool   | Vite 7                    |
| UI Library   | Material UI 7             |
| Testing      | Vitest + Playwright       |
| Code Quality | ESLint + Prettier + Husky |
| CI/CD        | GitHub Actions            |
| Hosting      | AWS S3 + CloudFront       |

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build
```

## Available Scripts

| Script           | Description              |
| ---------------- | ------------------------ |
| `yarn dev`       | Start development server |
| `yarn build`     | Build for production     |
| `yarn preview`   | Preview production build |
| `yarn test`      | Run unit tests           |
| `yarn test:e2e`  | Run E2E tests            |
| `yarn typecheck` | TypeScript type checking |
| `yarn lint`      | Run ESLint               |
| `yarn ci`        | Run all CI checks        |

## Project Structure

```
src/
├── auth/           # Authentication context and protected routes
├── components/     # Reusable UI components
│   ├── auth/       # Login, SignUp, ForgotPassword
│   ├── layout/     # Header, LanguageSelector
│   ├── shared/     # SEO, icons
│   └── viewer/     # AIPanel, ImagePanel
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization
├── pages/          # Dashboard, Viewer, Login, SignUp
├── services/       # API services
├── theme/          # MUI theme configuration
└── types/          # TypeScript definitions
```

## Quality Assurance

- **94 unit tests** with Vitest
- **4 E2E tests** with Playwright
- **Pre-commit hooks** running typecheck, lint, and formatting
- **CI pipeline** with automated testing on every push

## Browser Support

Optimized for **Google Chrome** (latest). Compatible with Firefox, Safari, and Edge.

## License

MIT
