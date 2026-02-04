import type { ReactNode } from "react";
import { Box, Card, CardContent, Typography, Button, Chip, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WarningIcon from "@mui/icons-material/Warning";
import { SEO } from "@components/shared/seo";
import { useReports, useReportStats } from "@/hooks";
import type { ReportStatus } from "@/types";
import styles from "./Dashboard.module.css";

const statusConfig: Record<ReportStatus, { label: string; color: "success" | "warning" | "error" | "info" }> = {
  completed: { label: "Completed", color: "success" },
  processing: { label: "Processing", color: "info" },
  needs_review: { label: "Needs Review", color: "warning" },
  error: { label: "Error", color: "error" },
};

interface StatCardConfig {
  key: string;
  icon: ReactNode;
  getValue: (stats: { total: number; completed: number; processing: number; needsReview: number } | null) => number;
  color: string;
  title: string;
  description: string;
}

const statCards: StatCardConfig[] = [
  {
    key: "total",
    icon: <AssignmentIcon className={styles.statIcon} color="primary" />,
    getValue: (stats) => stats?.total ?? 0,
    color: "primary",
    title: "Total Reports",
    description: "All time reports",
  },
  {
    key: "completed",
    icon: <CheckCircleIcon className={styles.statIcon} color="success" />,
    getValue: (stats) => stats?.completed ?? 0,
    color: "success.main",
    title: "Completed",
    description: "Finalized reports",
  },
  {
    key: "processing",
    icon: <HourglassEmptyIcon className={styles.statIcon} color="info" />,
    getValue: (stats) => stats?.processing ?? 0,
    color: "info.main",
    title: "Processing",
    description: "In progress",
  },
  {
    key: "needsReview",
    icon: <WarningIcon className={styles.statIcon} color="warning" />,
    getValue: (stats) => stats?.needsReview ?? 0,
    color: "warning.main",
    title: "Needs Review",
    description: "Awaiting review",
  },
];

export default function Dashboard() {
  const { stats, loading: statsLoading } = useReportStats();
  const { reports, loading: reportsLoading } = useReports();

  const recentReports = reports.slice(0, 5);

  return (
    <>
      <SEO title="Dashboard" description="DiagnoVet Dashboard - Manage your veterinary reports" />
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/viewer">
            New Report
          </Button>
        </Box>

        <Box className={styles.stats}>
          {statCards.map((card) => (
            <Card key={card.key} className={styles.statCard}>
              <CardContent>
                {card.icon}
                {statsLoading ? (
                  <Skeleton variant="text" width={60} height={48} />
                ) : (
                  <Typography variant="h3" component="div" color={card.color}>
                    {card.getValue(stats)}
                  </Typography>
                )}
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card className={styles.recentReports}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Recent Reports
            </Typography>
            {reportsLoading ? (
              <Box className={styles.reportsList}>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
                ))}
              </Box>
            ) : recentReports.length > 0 ? (
              <Box className={styles.reportsList}>
                {recentReports.map((report) => (
                  <Box key={report.id} className={styles.reportItem}>
                    <Box className={styles.reportInfo}>
                      <Typography variant="subtitle2">{report.patient.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {report.patient.species} • {report.examType} • {report.veterinarianName}
                      </Typography>
                    </Box>
                    <Chip
                      label={statusConfig[report.status].label}
                      color={statusConfig[report.status].color}
                      size="small"
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No reports yet. Create your first report to get started.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
