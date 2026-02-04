import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppThemeProvider } from "@/theme/ThemeContext";
import { LanguageProvider } from "@i18n";
import Header from "./Header";

const renderHeader = (initialRoute = "/") => {
  return render(
    <AppThemeProvider>
      <LanguageProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Header />
        </MemoryRouter>
      </LanguageProvider>
    </AppThemeProvider>
  );
};

describe("Header", () => {
  it("renders the logo", () => {
    renderHeader();

    expect(screen.getByText("DiagnoVet")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: /panel|dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /visor|viewer/i })).toBeInTheDocument();
  });

  it("renders the language selector", () => {
    renderHeader();

    expect(screen.getByRole("button", { name: /ES/i })).toBeInTheDocument();
  });

  it("renders the theme toggle button", () => {
    renderHeader();

    expect(screen.getByRole("button", { name: /dark mode|light mode/i })).toBeInTheDocument();
  });

  it("dashboard link points to root", () => {
    renderHeader();

    const dashboardLink = screen.getByRole("link", { name: /panel|dashboard/i });
    expect(dashboardLink).toHaveAttribute("href", "/");
  });

  it("viewer link points to /viewer", () => {
    renderHeader();

    const viewerLink = screen.getByRole("link", { name: /visor|viewer/i });
    expect(viewerLink).toHaveAttribute("href", "/viewer");
  });

  it("highlights current page in navigation", () => {
    renderHeader("/");

    const dashboardLink = screen.getByRole("link", { name: /panel|dashboard/i });
    // Green color in light theme: #2e7d32 = rgb(46, 125, 50)
    expect(dashboardLink).toHaveStyle({ color: "rgb(46, 125, 50)" });
  });

  it("highlights viewer when on viewer page", () => {
    renderHeader("/viewer");

    const viewerLink = screen.getByRole("link", { name: /visor|viewer/i });
    // Green color in light theme: #2e7d32 = rgb(46, 125, 50)
    expect(viewerLink).toHaveStyle({ color: "rgb(46, 125, 50)" });
  });
});
