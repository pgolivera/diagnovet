import type { ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { LanguageProvider } from "@i18n";
import theme from "./theme";

interface WrapperProps {
  children: ReactNode;
}

function AllProviders({ children }: WrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function ProvidersWithMemoryRouter({ children }: WrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export function renderWithTheme(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: ProvidersWithMemoryRouter, ...options });
}

export * from "@testing-library/react";
