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
import { useLanguage } from "@i18n";
import type { ReportStatus } from "@/types";
import styles from "./Dashboard.module.css";

const statusKeys: Record<ReportStatus, string> = {
  completed: "status.completed",
  processing: "status.processing",
  needs_review: "status.needsReview",
  error: "status.error",
};

const statusColors: Record<ReportStatus, "success" | "warning" | "error" | "info"> = {
  completed: "success",
  processing: "info",
  needs_review: "warning",
  error: "error",
};

interface StatCardConfig {
  key: string;
  icon: ReactNode;
  getValue: (stats: { total: number; completed: number; processing: number; needsReview: number } | null) => number;
  color: string;
  titleKey: string;
  descriptionKey: string;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const { stats, loading: statsLoading } = useReportStats();
  const { reports, loading: reportsLoading } = useReports();

  const recentReports = reports.slice(0, 5);

  const statCards: StatCardConfig[] = [
    {
      key: "total",
      icon: <AssignmentIcon className={styles.statIcon} color="primary" />,
      getValue: (s) => s?.total ?? 0,
      color: "primary",
      titleKey: "dashboard.totalReports",
      descriptionKey: "dashboard.allTimeReports",
    },
    {
      key: "completed",
      icon: <CheckCircleIcon className={styles.statIcon} color="success" />,
      getValue: (s) => s?.completed ?? 0,
      color: "success.main",
      titleKey: "dashboard.completed",
      descriptionKey: "dashboard.finalizedReports",
    },
    {
      key: "processing",
      icon: <HourglassEmptyIcon className={styles.statIcon} color="info" />,
      getValue: (s) => s?.processing ?? 0,
      color: "info.main",
      titleKey: "dashboard.processing",
      descriptionKey: "dashboard.inProgress",
    },
    {
      key: "needsReview",
      icon: <WarningIcon className={styles.statIcon} color="warning" />,
      getValue: (s) => s?.needsReview ?? 0,
      color: "warning.main",
      titleKey: "dashboard.needsReview",
      descriptionKey: "dashboard.awaitingReview",
    },
  ];

  return (
    <>
      <SEO title={t("dashboard.title")} description="DiagnoVet Dashboard - Manage your veterinary reports" />
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" component="h1">
            {t("dashboard.title")}
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/viewer">
            {t("dashboard.newReport")}
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
                  {t(card.titleKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(card.descriptionKey)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card className={styles.recentReports}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {t("dashboard.recentReports")}
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
                        {t(`species.${report.patient.species}`)} • {t(`examType.${report.examType}`)} •{" "}
                        {report.veterinarianName}
                      </Typography>
                    </Box>
                    <Chip label={t(statusKeys[report.status])} color={statusColors[report.status]} size="small" />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t("dashboard.noReports")}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
