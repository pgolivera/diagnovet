import type { Report, Patient, ExamType, StudyImage } from "@/types";
import { mockReports } from "@/data";

const STORAGE_KEY = "diagnovet-reports";

function getStoredReports(): Report[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReports));
  return mockReports;
}

function saveReports(reports: Report[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

function generateId(): string {
  return `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export interface CreateReportPayload {
  patient: Omit<Patient, "id">;
  veterinarianName: string;
  examType: ExamType;
  examDate: string;
  images: Omit<StudyImage, "id">[];
}

export interface UpdateReportPayload {
  presumptiveDiagnosis?: string;
  initialObservations?: string;
  status?: Report["status"];
}

export const reportService = {
  async getAll(): Promise<Report[]> {
    await delay(300);
    return getStoredReports();
  },

  async getById(id: string): Promise<Report | null> {
    await delay(200);
    const reports = getStoredReports();
    return reports.find((r) => r.id === id) || null;
  },

  async create(payload: CreateReportPayload): Promise<Report> {
    await delay(500);
    const reports = getStoredReports();

    const newReport: Report = {
      id: generateId(),
      patient: {
        ...payload.patient,
        id: `patient-${Date.now()}`,
      },
      veterinarianName: payload.veterinarianName,
      examType: payload.examType,
      examDate: payload.examDate,
      images: payload.images.map((img, index) => ({
        ...img,
        id: `img-${Date.now()}-${index}`,
      })),
      presumptiveDiagnosis: "",
      initialObservations: "",
      findings: [],
      status: "processing",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reports.unshift(newReport);
    saveReports(reports);

    return newReport;
  },

  async update(id: string, payload: UpdateReportPayload): Promise<Report | null> {
    await delay(300);
    const reports = getStoredReports();
    const index = reports.findIndex((r) => r.id === id);

    if (index === -1) {
      return null;
    }

    reports[index] = {
      ...reports[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    saveReports(reports);
    return reports[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(200);
    const reports = getStoredReports();
    const filtered = reports.filter((r) => r.id !== id);

    if (filtered.length === reports.length) {
      return false;
    }

    saveReports(filtered);
    return true;
  },

  async getStats(): Promise<{ total: number; completed: number; processing: number; needsReview: number }> {
    await delay(100);
    const reports = getStoredReports();

    return {
      total: reports.length,
      completed: reports.filter((r) => r.status === "completed").length,
      processing: reports.filter((r) => r.status === "processing").length,
      needsReview: reports.filter((r) => r.status === "needs_review").length,
    };
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
