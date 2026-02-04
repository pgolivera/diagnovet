import { useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { SEO } from "@components/shared/seo";
import { AIPanel } from "@components/viewer";
import styles from "./Viewer.module.css";

export default function Viewer() {
  const [hasImages] = useState(false);

  return (
    <>
      <SEO title="Image Viewer" description="DiagnoVet Image Viewer - Analyze veterinary images" />
      <Box className={styles.container}>
        <Box className={styles.sidebar}>
          <Card className={styles.thumbnailList}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Images
              </Typography>
              {hasImages ? (
                <Typography variant="body2">Image thumbnails here</Typography>
              ) : (
                <Box className={styles.emptyThumbnails}>
                  <ImageIcon sx={{ fontSize: 32, opacity: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    No images loaded
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
                Drop images here or click to upload
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: JPEG, PNG, DICOM
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
