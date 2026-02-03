// =============================================================================
// Site Configuration
// =============================================================================

export const SITE_CONFIG = {
  name: "Diagnovet",
  shortName: "Diagnovet",
  description: "Transforming veterinary medicine with artificial intelligence",
  url: import.meta.env.VITE_SITE_URL || "https://diagnovet.com",
  locale: "en_US",
  themeColor: "#1a1a2e",
};

// =============================================================================
// SEO Configuration
// =============================================================================

export const SEO_CONFIG = {
  siteName: SITE_CONFIG.name,
  defaultTitle: SITE_CONFIG.name,
  defaultDescription: SITE_CONFIG.description,
  defaultKeywords: "veterinary, AI, artificial intelligence, diagnostics, animal health",
  defaultImage: "/images/og-image.png",
  baseUrl: SITE_CONFIG.url,
  twitterHandle: "@diagnovet",
};

// =============================================================================
// Routes
// =============================================================================

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  NOT_FOUND: "/404",
} as const;

// =============================================================================
// External Links
// =============================================================================

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/diagnovet",
  LINKEDIN: "https://linkedin.com/company/diagnovet",
} as const;

// =============================================================================
// API Configuration
// =============================================================================

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || "",
  timeout: 30000,
} as const;

// =============================================================================
// Feature Flags
// =============================================================================

export const FEATURES = {
  DEBUG_MODE: import.meta.env.DEV,
} as const;

// =============================================================================
// Breakpoints (matching CSS variables)
// =============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
