import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Dashboard from "./Dashboard";
import { reportService } from "@/services";
import { mockReports } from "@/data";

vi.mock("@/services", () => ({
  reportService: {
    getAll: vi.fn(),
    getStats: vi.fn(),
  },
}));

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
  beforeEach(() => {
    vi.mocked(reportService.getAll).mockResolvedValue(mockReports);
    vi.mocked(reportService.getStats).mockResolvedValue({
      total: 3,
      completed: 1,
      processing: 1,
      needsReview: 1,
    });
  });

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

  it("renders all stat cards", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Total Reports")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Completed").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Processing").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Needs Review").length).toBeGreaterThanOrEqual(1);
  });

  it("displays stat values from service", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("displays stat descriptions", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("All time reports")).toBeInTheDocument();
    });

    expect(screen.getByText("Finalized reports")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Awaiting review")).toBeInTheDocument();
  });

  it("renders the recent reports section", () => {
    renderDashboard();

    expect(screen.getByText("Recent Reports")).toBeInTheDocument();
  });

  it("displays recent reports from service", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Luna")).toBeInTheDocument();
    });

    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByText("Michi")).toBeInTheDocument();
  });

  it("shows status chips for reports", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getAllByText("Completed").length).toBeGreaterThanOrEqual(1);
    });

    expect(screen.getAllByText("Processing").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Needs Review").length).toBeGreaterThanOrEqual(1);
  });

  it("shows loading skeletons while fetching data", () => {
    vi.mocked(reportService.getAll).mockImplementation(() => new Promise(() => {}));
    vi.mocked(reportService.getStats).mockImplementation(() => new Promise(() => {}));

    renderDashboard();

    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
