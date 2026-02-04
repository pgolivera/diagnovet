import { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { SEO } from "@components/shared/seo";
import { AIPanel } from "@components/viewer";
import { useLanguage } from "@i18n";
import styles from "./Viewer.module.css";

export default function Viewer() {
  const { t } = useLanguage();
  const [hasImages] = useState(false);

  return (
    <>
      <SEO title={t("nav.viewer")} description="DiagnoVet Image Viewer - Analyze veterinary images" />
      <Box className={styles.container}>
        <Box className={styles.sidebar}>
          <Card className={styles.thumbnailList}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                {t("viewer.images")}
              </Typography>
              {hasImages ? (
                <Typography variant="body2">Image thumbnails here</Typography>
              ) : (
                <Box className={styles.emptyThumbnails}>
                  <ImageIcon sx={{ fontSize: 32, opacity: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t("viewer.noImagesLoaded")}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box className={styles.mainArea}>
          <Card className={styles.imageViewer}>
            <CardContent className={styles.imageContent}>
              <ImageIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                {t("viewer.dropImages")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t("viewer.supportedFormats")}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box className={styles.panel}>
          <AIPanel hasImages={hasImages} />
        </Box>
      </Box>
    </>
  );
}
