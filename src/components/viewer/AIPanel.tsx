import { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Divider, CircularProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import type { ExamType, AIFinding } from "@/types";
import ExamTypeSelector from "./ExamTypeSelector";
import styles from "./AIPanel.module.css";

interface AIPanelProps {
  hasImages: boolean;
  onAnalyze?: () => void;
}

export default function AIPanel({ hasImages, onAnalyze }: AIPanelProps) {
  const [examType, setExamType] = useState<ExamType | "">("");
  const [observations, setObservations] = useState("");
  const [findings, setFindings] = useState<AIFinding[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!examType || !hasImages) return;

    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockFindings: AIFinding[] = [
      { id: "f1", description: "Normal organ size and echogenicity", organ: "Liver" },
      { id: "f2", description: "No abnormal fluid collections detected", organ: "Abdomen" },
      { id: "f3", description: "Regular parenchymal pattern observed", organ: "Spleen" },
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
            <Typography variant="subtitle2">Exam Configuration</Typography>
          </Box>
          <ExamTypeSelector value={examType} onChange={setExamType} disabled={!hasImages} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box className={styles.section}>
          <Typography variant="subtitle2">Initial Observations</Typography>
          <TextField
            multiline
            rows={3}
            placeholder="Enter initial observations..."
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
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box className={styles.section}>
          <Box className={styles.sectionTitle}>
            <AutoAwesomeIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2">AI Findings</Typography>
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
                {hasImages ? "Select exam type and click Analyze" : "Upload images to start analysis"}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
