import { describe, it, expect, beforeEach, vi } from "vitest";
import { reportService } from "./reportService";
import { mockReports } from "@/data";
import type { Report } from "@/types";

const STORAGE_KEY = "diagnovet-reports";

describe("reportService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getAll", () => {
    it("returns mock reports when localStorage is empty", async () => {
      const promise = reportService.getAll();
      await vi.advanceTimersByTimeAsync(300);
      const reports = await promise;

      expect(reports).toHaveLength(mockReports.length);
      expect(reports[0].id).toBe("report-001");
    });

    it("returns stored reports from localStorage", async () => {
      const customReports: Report[] = [
        {
          ...mockReports[0],
          id: "custom-report",
          patient: { ...mockReports[0].patient, name: "Custom Pet" },
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customReports));

      const promise = reportService.getAll();
      await vi.advanceTimersByTimeAsync(300);
      const reports = await promise;

      expect(reports).toHaveLength(1);
      expect(reports[0].id).toBe("custom-report");
    });
  });

  describe("getById", () => {
    it("returns a report by id", async () => {
      const promise = reportService.getById("report-001");
      await vi.advanceTimersByTimeAsync(200);
      const report = await promise;

      expect(report).not.toBeNull();
      expect(report?.id).toBe("report-001");
      expect(report?.patient.name).toBe("Luna");
    });

    it("returns null for non-existent id", async () => {
      const promise = reportService.getById("non-existent");
      await vi.advanceTimersByTimeAsync(200);
      const report = await promise;

      expect(report).toBeNull();
    });
  });

  describe("create", () => {
    it("creates a new report with generated id", async () => {
      const payload = {
        patient: {
          name: "Buddy",
          species: "canine" as const,
          breed: "Labrador",
          age: 4,
          ageUnit: "years" as const,
          gender: "male" as const,
          ownerName: "Test Owner",
          ownerEmail: "test@test.com",
        },
        veterinarianName: "Dr. Test",
        examType: "abdominal" as const,
        examDate: "2026-02-03",
        images: [
          {
            url: "/test.jpg",
            thumbnailUrl: "/test-thumb.jpg",
            filename: "test.jpg",
            uploadedAt: "2026-02-03T10:00:00Z",
            order: 1,
          },
        ],
      };

      const promise = reportService.create(payload);
      await vi.advanceTimersByTimeAsync(500);
      const report = await promise;

      expect(report.id).toMatch(/^report-/);
      expect(report.patient.name).toBe("Buddy");
      expect(report.patient.id).toMatch(/^patient-/);
      expect(report.status).toBe("processing");
      expect(report.images).toHaveLength(1);
      expect(report.images[0].id).toMatch(/^img-/);
    });

    it("adds new report to the beginning of the list", async () => {
      const payload = {
        patient: {
          name: "NewPet",
          species: "feline" as const,
          breed: "Siamese",
          age: 2,
          ageUnit: "years" as const,
          gender: "female" as const,
          ownerName: "New Owner",
          ownerEmail: "new@test.com",
        },
        veterinarianName: "Dr. New",
        examType: "thoracic" as const,
        examDate: "2026-02-03",
        images: [],
      };

      const createPromise = reportService.create(payload);
      await vi.advanceTimersByTimeAsync(500);
      await createPromise;

      const getAllPromise = reportService.getAll();
      await vi.advanceTimersByTimeAsync(300);
      const reports = await getAllPromise;

      expect(reports[0].patient.name).toBe("NewPet");
    });
  });

  describe("update", () => {
    it("updates an existing report", async () => {
      const promise = reportService.update("report-002", {
        presumptiveDiagnosis: "Updated diagnosis",
        status: "completed",
      });
      await vi.advanceTimersByTimeAsync(300);
      const updated = await promise;

      expect(updated).not.toBeNull();
      expect(updated?.presumptiveDiagnosis).toBe("Updated diagnosis");
      expect(updated?.status).toBe("completed");
    });

    it("returns null for non-existent report", async () => {
      const promise = reportService.update("non-existent", {
        presumptiveDiagnosis: "Test",
      });
      await vi.advanceTimersByTimeAsync(300);
      const result = await promise;

      expect(result).toBeNull();
    });

    it("updates the updatedAt timestamp", async () => {
      const getPromise = reportService.getById("report-001");
      await vi.advanceTimersByTimeAsync(200);
      const original = await getPromise;

      vi.advanceTimersByTime(1000);

      const updatePromise = reportService.update("report-001", {
        initialObservations: "New observations",
      });
      await vi.advanceTimersByTimeAsync(300);
      const updated = await updatePromise;

      expect(updated?.updatedAt).not.toBe(original?.updatedAt);
    });
  });

  describe("delete", () => {
    it("deletes an existing report", async () => {
      const deletePromise = reportService.delete("report-001");
      await vi.advanceTimersByTimeAsync(200);
      const deleted = await deletePromise;

      expect(deleted).toBe(true);

      const getAllPromise = reportService.getAll();
      await vi.advanceTimersByTimeAsync(300);
      const reports = await getAllPromise;

      expect(reports.find((r) => r.id === "report-001")).toBeUndefined();
    });

    it("returns false for non-existent report", async () => {
      const promise = reportService.delete("non-existent");
      await vi.advanceTimersByTimeAsync(200);
      const result = await promise;

      expect(result).toBe(false);
    });
  });

  describe("getStats", () => {
    it("returns correct statistics for mock data", async () => {
      localStorage.clear();

      const promise = reportService.getStats();
      await vi.advanceTimersByTimeAsync(100);
      const stats = await promise;

      expect(stats.total).toBe(mockReports.length);
      expect(stats.completed).toBeGreaterThanOrEqual(0);
      expect(stats.processing).toBeGreaterThanOrEqual(0);
      expect(stats.needsReview).toBeGreaterThanOrEqual(0);
      expect(stats.completed + stats.processing + stats.needsReview).toBeLessThanOrEqual(stats.total);
    });

    it("updates stats after creating a report", async () => {
      localStorage.clear();

      const initialStatsPromise = reportService.getStats();
      await vi.advanceTimersByTimeAsync(100);
      const initialStats = await initialStatsPromise;

      const createPromise = reportService.create({
        patient: {
          name: "Test",
          species: "canine",
          breed: "Mixed",
          age: 1,
          ageUnit: "years",
          gender: "male",
          ownerName: "Owner",
          ownerEmail: "owner@test.com",
        },
        veterinarianName: "Dr. Test",
        examType: "abdominal",
        examDate: "2026-02-03",
        images: [],
      });
      await vi.advanceTimersByTimeAsync(500);
      await createPromise;

      const statsPromise = reportService.getStats();
      await vi.advanceTimersByTimeAsync(100);
      const stats = await statsPromise;

      expect(stats.total).toBe(initialStats.total + 1);
      expect(stats.processing).toBe(initialStats.processing + 1);
    });
  });
});
