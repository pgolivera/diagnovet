import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Dashboard from "./Dashboard";

const renderDashboard = () => {
  return render(
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

describe("Dashboard", () => {
  it("renders the dashboard heading", () => {
    renderDashboard();

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("renders the New Report button", () => {
    renderDashboard();

    const button = screen.getByRole("link", { name: /new report/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/viewer");
  });

  it("renders all stat cards", () => {
    renderDashboard();

    expect(screen.getByText("Total Reports")).toBeInTheDocument();
    expect(screen.getByText("Total Patients")).toBeInTheDocument();
    expect(screen.getByText("Active Reports")).toBeInTheDocument();
  });

  it("displays stat values", () => {
    renderDashboard();

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays stat descriptions", () => {
    renderDashboard();

    expect(screen.getByText("All time reports")).toBeInTheDocument();
    expect(screen.getByText("Registered patients")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("renders the recent reports section", () => {
    renderDashboard();

    expect(screen.getByText("Recent Reports")).toBeInTheDocument();
    expect(screen.getByText(/No reports yet/)).toBeInTheDocument();
  });
});
