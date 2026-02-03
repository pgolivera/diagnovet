import { Box, Typography, Card, CardContent } from "@mui/material";
import { SEO } from "@components/shared/seo";
import styles from "./Viewer.module.css";

export default function Viewer() {
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
              <Typography variant="body2" color="text.secondary">
                No images loaded
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box className={styles.mainArea}>
          <Card className={styles.imageViewer}>
            <CardContent className={styles.imageContent}>
              <Typography variant="body1" color="text.secondary">
                Drop images here or click to upload
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box className={styles.panel}>
          <Card className={styles.dataPanel}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Exam Type
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select exam type after uploading images
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
