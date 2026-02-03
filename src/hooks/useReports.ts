import { useState, useEffect, useCallback } from "react";
import type { Report } from "@/types";
import { reportService } from "@/services";

interface UseReportsResult {
  reports: Report[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useReports(): UseReportsResult {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await reportService.getAll();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    loading,
    error,
    refresh: fetchReports,
  };
}

interface UseReportResult {
  report: Report | null;
  loading: boolean;
  error: string | null;
}

export function useReport(id: string | undefined): UseReportResult {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await reportService.getById(id);
        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  return { report, loading, error };
}

interface UseReportStatsResult {
  stats: {
    total: number;
    completed: number;
    processing: number;
    needsReview: number;
  } | null;
  loading: boolean;
}

export function useReportStats(): UseReportStatsResult {
  const [stats, setStats] = useState<UseReportStatsResult["stats"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await reportService.getStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
