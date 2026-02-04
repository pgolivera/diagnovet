import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils";
import Dashboard from "./Dashboard";
import { reportService } from "@/services";
import { mockReports } from "@/data";

vi.mock("@/services", () => ({
  reportService: {
    getAll: vi.fn(),
    getStats: vi.fn(),
  },
}));

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
    renderWithProviders(<Dashboard />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the New Report button", () => {
    renderWithProviders(<Dashboard />);

    const button = screen.getByRole("link", { name: /new|nuevo|novo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/viewer");
  });

  it("renders all stat cards", async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      // Spanish: "Total Reportes", English: "Total Reports"
      const totalElements = screen.getAllByText(/total/i);
      expect(totalElements.length).toBeGreaterThan(0);
    });
  });

  it("displays stat values from service", async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  it("renders the recent reports section", () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/recent|recientes/i)).toBeInTheDocument();
  });

  it("displays recent reports from service", async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Luna")).toBeInTheDocument();
    });

    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByText("Michi")).toBeInTheDocument();
  });

  it("shows loading skeletons while fetching data", () => {
    vi.mocked(reportService.getAll).mockImplementation(() => new Promise(() => {}));
    vi.mocked(reportService.getStats).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<Dashboard />);

    const skeletons = document.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
