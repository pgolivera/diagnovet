export type ReportStatus = "processing" | "completed" | "error" | "needs_review";

export type ExamType = "abdominal" | "cervical" | "gestational" | "ocular" | "thoracic";

export type Species = "canine" | "feline" | "equine" | "other";

export type Gender = "male" | "female" | "unknown";

export type AgeUnit = "years" | "months";

export interface Patient {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  ageUnit: AgeUnit;
  gender: Gender;
  ownerName: string;
  ownerEmail: string;
}

export interface StudyImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  uploadedAt: string;
  order: number;
}

export interface AIFinding {
  id: string;
  description: string;
  organ?: string;
}

export interface Report {
  id: string;
  patient: Patient;
  veterinarianName: string;
  examType: ExamType;
  examDate: string;
  images: StudyImage[];
  presumptiveDiagnosis: string;
  initialObservations: string;
  findings: AIFinding[];
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}
