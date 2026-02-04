import type { ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "@i18n";

interface WrapperProps {
  children: ReactNode;
}

function AllProviders({ children }: WrapperProps) {
  return (
    <AppThemeProvider>
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </AppThemeProvider>
  );
}

function ProvidersWithMemoryRouter({ children }: WrapperProps) {
  return (
    <AppThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AppThemeProvider>
  );
}

export function renderWithProviders(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export function renderWithTheme(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: ProvidersWithMemoryRouter, ...options });
}

export * from "@testing-library/react";
