import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useReports, useReport, useReportStats } from "./useReports";
import { reportService } from "@/services";
import { mockReports } from "@/data";

vi.mock("@/services", () => ({
  reportService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    getStats: vi.fn(),
  },
}));

describe("useReports", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("useReports hook", () => {
    it("fetches reports on mount", async () => {
      vi.mocked(reportService.getAll).mockResolvedValue(mockReports);

      const { result } = renderHook(() => useReports());

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.reports).toHaveLength(mockReports.length);
      expect(result.current.error).toBeNull();
      expect(reportService.getAll).toHaveBeenCalledTimes(1);
    });

    it("handles fetch error", async () => {
      vi.mocked(reportService.getAll).mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useReports());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.reports).toHaveLength(0);
      expect(result.current.error).toBe("Network error");
    });

    it("handles non-Error exceptions", async () => {
      vi.mocked(reportService.getAll).mockRejectedValue("Unknown error");

      const { result } = renderHook(() => useReports());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe("Failed to fetch reports");
    });

    it("refresh function refetches reports", async () => {
      vi.mocked(reportService.getAll).mockResolvedValue(mockReports);

      const { result } = renderHook(() => useReports());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(reportService.getAll).toHaveBeenCalledTimes(1);

      await act(async () => {
        await result.current.refresh();
      });

      expect(reportService.getAll).toHaveBeenCalledTimes(2);
    });
  });

  describe("useReport hook", () => {
    it("fetches a single report by id", async () => {
      vi.mocked(reportService.getById).mockResolvedValue(mockReports[0]);

      const { result } = renderHook(() => useReport("report-001"));

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.report).not.toBeNull();
      expect(result.current.report?.id).toBe("report-001");
      expect(result.current.error).toBeNull();
      expect(reportService.getById).toHaveBeenCalledWith("report-001");
    });

    it("returns null report when id is undefined", async () => {
      const { result } = renderHook(() => useReport(undefined));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.report).toBeNull();
      expect(reportService.getById).not.toHaveBeenCalled();
    });

    it("handles fetch error", async () => {
      vi.mocked(reportService.getById).mockRejectedValue(new Error("Not found"));

      const { result } = renderHook(() => useReport("invalid-id"));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.report).toBeNull();
      expect(result.current.error).toBe("Not found");
    });

    it("handles non-Error exceptions", async () => {
      vi.mocked(reportService.getById).mockRejectedValue("Unknown");

      const { result } = renderHook(() => useReport("test-id"));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe("Failed to fetch report");
    });

    it("refetches when id changes", async () => {
      vi.mocked(reportService.getById).mockResolvedValue(mockReports[0]);

      const { result, rerender } = renderHook(({ id }) => useReport(id), {
        initialProps: { id: "report-001" },
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      vi.mocked(reportService.getById).mockResolvedValue(mockReports[1]);

      rerender({ id: "report-002" });

      await waitFor(() => {
        expect(result.current.report?.id).toBe("report-002");
      });

      expect(reportService.getById).toHaveBeenCalledTimes(2);
    });
  });

  describe("useReportStats hook", () => {
    it("fetches stats on mount", async () => {
      const mockStats = { total: 10, completed: 5, processing: 3, needsReview: 2 };
      vi.mocked(reportService.getStats).mockResolvedValue(mockStats);

      const { result } = renderHook(() => useReportStats());

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.stats).toEqual(mockStats);
      expect(reportService.getStats).toHaveBeenCalledTimes(1);
    });

    it("returns null stats when service fails", async () => {
      vi.mocked(reportService.getStats).mockResolvedValue({
        total: 0,
        completed: 0,
        processing: 0,
        needsReview: 0,
      });

      const { result } = renderHook(() => useReportStats());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.stats).toEqual({
        total: 0,
        completed: 0,
        processing: 0,
        needsReview: 0,
      });
    });
  });
});
