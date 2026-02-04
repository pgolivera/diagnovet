import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "@i18n";
import { AuthProvider } from "./auth";
import App from "./App";

const MOCK_USER = {
  id: "user-1",
  name: "Dr. García",
  email: "dr.garcia@veterinaria.com",
  avatar: "https://ui-avatars.com/api/?name=Dr+Garcia&background=2e7d32&color=fff",
};

const renderApp = () => {
  return render(
    <AppThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </AuthProvider>
      </LanguageProvider>
    </AppThemeProvider>
  );
};

beforeEach(() => {
  localStorage.setItem("diagnovet-auth", JSON.stringify(MOCK_USER));
});

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
