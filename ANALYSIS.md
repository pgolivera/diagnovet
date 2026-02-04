# UI Analysis & Design Decisions

## Overview

This document outlines the UI design decisions made for the DiagnoVet prototype, focusing on visual design, component architecture, and interface patterns that improve the veterinarian's daily workflow.

## Design System

### Color Palette

| Role             | Color            | Hex       | Usage                          |
| ---------------- | ---------------- | --------- | ------------------------------ |
| Primary          | Veterinary Green | `#2e7d32` | Buttons, links, brand identity |
| Primary Dark     | Forest Green     | `#1b5e20` | Hover states, active elements  |
| Background Light | White            | `#ffffff` | Light theme background         |
| Background Dark  | Dark Gray        | `#121212` | Dark theme background          |
| Text Primary     | Dark Gray        | `#212121` | Main text content              |
| Error            | Red              | `#d32f2f` | Validation errors, alerts      |

**Why Green?** Green conveys health, nature, and trust - aligned with veterinary medicine values. It provides strong contrast for accessibility while maintaining a professional appearance.

### Typography

| Element  | Font   | Weight | Size    |
| -------- | ------ | ------ | ------- |
| Headings | Roboto | 700    | 24-32px |
| Body     | Roboto | 400    | 14-16px |
| Labels   | Roboto | 500    | 12-14px |
| Buttons  | Roboto | 500    | 14px    |

**Why Roboto?** System-compatible, excellent readability at small sizes, and native to Material Design for consistent rendering across devices.

### Spacing System

Based on 8px grid:

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

## Component Architecture

### Material UI (MUI) Selection

**Why MUI over other libraries?**

| Criteria             | MUI            | Tailwind | Chakra      |
| -------------------- | -------------- | -------- | ----------- |
| Pre-built components | Extensive      | None     | Moderate    |
| Theming              | Built-in       | Manual   | Built-in    |
| Accessibility        | WCAG 2.1 AA    | Manual   | WCAG 2.1 AA |
| Bundle size          | Tree-shakeable | Minimal  | Moderate    |
| Learning curve       | Moderate       | Low      | Low         |

MUI was chosen for its comprehensive component library, built-in accessibility, and robust theming system that supports light/dark modes out of the box.

### Key UI Components

#### 1. Header Navigation

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] DiagnoVet    [Dashboard] [Viewer]    [🌐] [🌙] [👤] │
└─────────────────────────────────────────────────────────────┘
```

- **Fixed position**: Always visible for quick navigation
- **Language selector**: Icon-based dropdown, minimal footprint
- **Theme toggle**: Single icon, instant visual feedback
- **User menu**: Avatar with dropdown for profile/logout

#### 2. Authentication Cards

```
┌─────────────────────────┐
│      [🐾] DiagnoVet     │
│                         │
│      Sign In            │
│  ┌───────────────────┐  │
│  │ Email             │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ Password          │  │
│  └───────────────────┘  │
│  [    Sign In      ]    │
│  ────── or ──────       │
│  [G] Sign in with Google│
│                         │
│  Don't have account?    │
└─────────────────────────┘
```

- **Centered card layout**: Focus attention on task
- **Visual hierarchy**: Logo → Title → Form → Actions
- **Social login**: Prominent but secondary to email
- **Gradient background**: Subtle depth, brand reinforcement

#### 3. AI Analysis Viewer

```
┌─────────────────────────────────────────────────────────────┐
│ Image Panel (60%)           │ AI Panel (40%)                │
│ ┌─────────────────────────┐ │ ┌───────────────────────────┐ │
│ │                         │ │ │ Exam Type: [Abdominal ▼]  │ │
│ │   Drag & drop images    │ │ ├───────────────────────────┤ │
│ │        here             │ │ │ Observations:             │ │
│ │                         │ │ │ ┌───────────────────────┐ │ │
│ └─────────────────────────┘ │ │ │                       │ │ │
│ ┌───┐ ┌───┐ ┌───┐          │ │ └───────────────────────┘ │ │
│ │ 1 │ │ 2 │ │ 3 │ Thumbs   │ │ [      Analyze       ]    │ │
│ └───┘ └───┘ └───┘          │ │                           │ │
│                             │ │ Findings:                 │ │
│                             │ │ • Liver: Normal           │ │
│                             │ │ • Kidney: Normal          │ │
└─────────────────────────────┴─┴───────────────────────────┘ │
```

- **Split panel layout**: 60/40 ratio prioritizes image viewing
- **Drag & drop zone**: Large target area with visual feedback
- **Thumbnail strip**: Quick image switching without scrolling
- **Findings list**: Organized by organ for quick scanning

## Theme Implementation

### Light Mode

- Clean white backgrounds
- Dark text for readability
- Subtle shadows for depth
- Green accents for actions

### Dark Mode

- Dark gray backgrounds (`#121212`)
- Light text with reduced brightness
- Elevated surfaces with lighter shades
- Green accents maintained for consistency

### Theme Toggle Behavior

- Instant switch without page reload
- Preference saved to localStorage
- System preference detection on first visit

## Responsive Design

| Breakpoint | Width     | Layout Adjustments                   |
| ---------- | --------- | ------------------------------------ |
| Mobile     | < 600px   | Single column, stacked panels        |
| Tablet     | 600-960px | Reduced margins, collapsible sidebar |
| Desktop    | > 960px   | Full layout, side-by-side panels     |

## Accessibility Considerations

- **Color contrast**: Minimum 4.5:1 ratio for text
- **Focus indicators**: Visible outline on all interactive elements
- **Keyboard navigation**: Full tab support through all controls
- **ARIA labels**: Screen reader support for icons and controls
- **Form validation**: Clear error messages with visual indicators

## UI Improvements Over Original Platform

| Element           | Original           | Prototype        | Improvement             |
| ----------------- | ------------------ | ---------------- | ----------------------- |
| Language selector | Hidden in settings | Header icon      | Always visible, 1 click |
| Theme             | None               | Toggle in header | User preference support |
| Image upload      | Form-dependent     | Drag & drop      | Direct interaction      |
| AI findings       | Text block         | Organized list   | Scannable by organ      |
| Auth forms        | Separate pages     | Card overlay     | Focused experience      |
