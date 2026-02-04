# DiagnoVet

Transforming veterinary medicine with artificial intelligence.

## Strategic Overview: UX Improvements

### Problems Identified in Current diagnoVET Platform

After analyzing the platform videos, the following friction points were identified:

#### 1. Language Settings Buried Deep

- **Current flow**: Login → Settings → Veterinarian Profile → Scroll down → Select language
- **Issue**: 5 clicks + scrolling for a basic preference
- **Impact**: High cognitive load, users may never find this setting

#### 2. Registration Flow Fragmentation

- **Current flow**: Pre-confirmation (3 fields) → Post-confirmation (4 fields)
- **Issue**: Phone number requested twice, unnecessary screen transition
- **Impact**: User confusion, data redundancy, longer onboarding

#### 3. Analyze Screen Workflow

- **Current flow**: Fill all patient data → Upload images → View analysis
- **Issue**: User must complete form before seeing what they're analyzing
- **Impact**: Unnatural workflow, especially when image context matters first

### Proposed Solution: Unified Image Viewer

A redesigned Image Viewer + AI Panel that:

- Allows image upload at any point in the workflow
- Shows AI-generated findings clearly organized by organ
- Provides inline editing without page navigation
- Moves language selector to header (1-click access from anywhere)

### Why This Matters

Veterinarians process dozens of reports daily. Each friction point compounds:

- 5 clicks to change language × multiple vets × daily = significant wasted time
- Form-first workflow = context switching between data and images
- Split registration = repeated data entry and confusion

The prototype demonstrates how thoughtful UX changes create measurable efficiency gains.

---

## Features

### Internationalization (i18n)

The application supports three languages with instant switching:

- **Spanish (ES)** - Default language
- **English (EN)**
- **Portuguese (PT)**

Language selector is accessible from the header (1-click access). Selection persists in localStorage.

### Authentication

Simulated authentication system for prototyping:

- **Login** with email/password or Google
- **Sign Up** with registration form
- **Forgot Password** dialog
- Protected routes (Dashboard, Viewer)
- User avatar and logout menu in header
- Session persistence in localStorage

### Theme Support

Light and dark theme with veterinary green (#2e7d32) as primary color:

- **Light mode** - White background, dark text
- **Dark mode** - Dark background, light text
- Theme toggle in header
- Preference persists in localStorage

### AI Analysis Viewer

- Drag & drop image upload with previews
- Exam type selection (Abdominal, Cervical, Gestational, Ocular, Thoracic)
- Simulated AI findings translated to selected language
- Initial observations text field

## Tech Stack

- React 19
- TypeScript 5.6
- Vite 7
- Material UI (MUI) 7
- Vitest (unit testing)
- Playwright (E2E testing)
- ESLint + Prettier
- Husky + lint-staged

## Browser Support

### Target Browser: Google Chrome (Latest)

**Justification:**

1. **Market Share**: Chrome holds ~65% of global browser market share, making it the most representative testing environment
2. **DevTools Excellence**: Chrome DevTools provides superior debugging capabilities for React applications, including React Developer Tools integration
3. **V8 Engine Performance**: Chrome's V8 JavaScript engine offers excellent performance metrics that align with production expectations
4. **Consistent Rendering**: Blink rendering engine provides predictable CSS flexbox behavior across platforms
5. **CI/CD Compatibility**: Chromium is the default browser for Playwright in CI environments, ensuring consistent test results between local development and CI pipelines

The application is built with progressive enhancement principles and will work in other modern browsers (Firefox, Safari, Edge), but Chrome is the primary development and testing target.

## CSS Architecture

### Why reset.css?

We use Eric Meyer's CSS Reset (v2.0) to ensure consistent styling across all browsers. Here's why:

1. **Browser Inconsistency**: Different browsers apply different default styles to HTML elements. For example:
   - Chrome adds `margin: 8px` to `<body>`
   - Firefox applies different `line-height` to form elements
   - Safari has unique `padding` defaults for lists

2. **Predictable Baseline**: The reset removes all default margins, paddings, and styling, giving us a "blank canvas" to build upon

3. **Reduced Debugging**: Without a reset, developers often face unexpected spacing or typography issues that vary by browser

4. **Professional Standard**: CSS resets are an industry best practice adopted by major companies and frameworks

### CSS Modules with Prefix

All CSS Modules use the `dv-` prefix (DiagnoVet) for scoped class names:

```
.container → dv-ComponentName__container--abc12
```

This provides:

- Clear identification of project styles in DevTools
- Namespace collision prevention
- Easy debugging with meaningful class names

### Flexbox Layout

The application uses CSS Flexbox for all layouts because:

1. **One-dimensional layouts**: Perfect for navigation bars, card lists, and form layouts
2. **Browser support**: 99%+ support across all modern browsers
3. **Responsive design**: Easy to create responsive layouts without media query complexity
4. **Alignment control**: Superior control over item alignment and distribution

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
├── auth/           # Authentication context and protected routes
├── assets/         # Static assets (images, icons)
├── components/     # Reusable components
│   ├── auth/       # Auth components (AuthCard, ForgotPassword)
│   ├── layout/     # Layout components (Header, LanguageSelector)
│   ├── shared/     # Shared components (SEO, WorkInProgress, icons)
│   └── viewer/     # Viewer components (AIPanel, ImagePanel)
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization (translations, LanguageContext)
├── pages/          # Page components (Dashboard, Viewer, Login, SignUp)
├── services/       # API services and data fetching
├── styles/         # Global styles and CSS variables
├── theme/          # Material UI theme configuration (ThemeContext)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main app component with routing
├── main.tsx        # Entry point with providers
└── constants.ts    # App constants and configuration
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

| Check       | Purpose                                          |
| ----------- | ------------------------------------------------ |
| `lint`      | Standardize coding styles with ESLint            |
| `typecheck` | Check TypeScript types for compile-time safety   |
| `test`      | Run unit tests with coverage reporting           |
| `build`     | Capture build errors not detected in development |
| `e2e`       | End-to-end tests with Playwright (Chromium)      |
| `dupes`     | Detect code duplication                          |

### Pre-commit Hooks

Husky runs the following checks before each commit:

- ESLint (with auto-fix)
- Prettier formatting
- TypeScript type checking via lint-staged

### Dependabot

Automated dependency updates run weekly on Mondays, grouped by:

- Patch updates
- Minor updates
- Major updates

## License

MIT
