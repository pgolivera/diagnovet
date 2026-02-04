import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { LanguageProvider } from "@i18n";
import theme from "./theme";
import App from "./App";

const renderApp = () => {
  return render(
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe("App", () => {
  it("renders dashboard in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    renderApp();
    expect(screen.getByText("DiagnoVet")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders work in progress in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");
    renderApp();
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });
});
