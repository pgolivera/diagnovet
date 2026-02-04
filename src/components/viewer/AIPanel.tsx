import { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Divider, CircularProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import type { ExamType, AIFinding } from "@/types";
import { useLanguage } from "@i18n";
import ExamTypeSelector from "./ExamTypeSelector";
import styles from "./AIPanel.module.css";

interface AIPanelProps {
  hasImages: boolean;
  onAnalyze?: () => void;
}

export default function AIPanel({ hasImages, onAnalyze }: AIPanelProps) {
  const { t } = useLanguage();
  const [examType, setExamType] = useState<ExamType | "">("");
  const [observations, setObservations] = useState("");
  const [findings, setFindings] = useState<AIFinding[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!examType || !hasImages) return;

    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockFindings: AIFinding[] = [
      { id: "f1", description: t("aiPanel.finding1"), organ: t("aiPanel.organ.liver") },
      { id: "f2", description: t("aiPanel.finding2"), organ: t("aiPanel.organ.abdomen") },
      { id: "f3", description: t("aiPanel.finding3"), organ: t("aiPanel.organ.spleen") },
    ];

    setFindings(mockFindings);
    setIsAnalyzing(false);
    onAnalyze?.();
  };

  const canAnalyze = hasImages && examType !== "";

  return (
    <Card className={styles.panel}>
      <CardContent>
        <Box className={styles.section}>
          <Box className={styles.sectionTitle}>
            <AnalyticsIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2">{t("aiPanel.examConfiguration")}</Typography>
          </Box>
          <ExamTypeSelector value={examType} onChange={setExamType} disabled={!hasImages} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box className={styles.section}>
          <Typography variant="subtitle2">{t("aiPanel.initialObservations")}</Typography>
          <TextField
            multiline
            rows={3}
            placeholder={t("aiPanel.enterObservations")}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            fullWidth
            size="small"
            disabled={!hasImages}
          />
        </Box>

        <Box className={styles.analyzeButton}>
          <Button
            variant="contained"
            fullWidth
            startIcon={isAnalyzing ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
          >
            {isAnalyzing ? t("aiPanel.analyzing") : t("aiPanel.analyzeWithAI")}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box className={styles.section}>
          <Box className={styles.sectionTitle}>
            <AutoAwesomeIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2">{t("aiPanel.aiFindings")}</Typography>
          </Box>

          {findings.length > 0 ? (
            <Box className={styles.findingsList}>
              {findings.map((finding) => (
                <Box key={finding.id} className={styles.findingItem}>
                  <Typography variant="body2">{finding.description}</Typography>
                  {finding.organ && (
                    <Typography variant="caption" className={styles.findingOrgan}>
                      {finding.organ}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Box className={styles.emptyState}>
              <AutoAwesomeIcon sx={{ fontSize: 32, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {hasImages ? t("aiPanel.selectExamType") : t("aiPanel.uploadImages")}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
