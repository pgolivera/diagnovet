import { useState, useCallback, useRef } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SEO } from "@components/shared/seo";
import { AIPanel } from "@components/viewer";
import { useLanguage } from "@i18n";
import styles from "./Viewer.module.css";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export default function Viewer() {
  const { t } = useLanguage();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

      const newImages: UploadedImage[] = imageFiles.map((file) => ({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);

      if (newImages.length > 0 && !selectedImage) {
        setSelectedImage(newImages[0]);
      }
    },
    [selectedImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasImages = images.length > 0;

  return (
    <>
      <SEO title={t("nav.viewer")} description="DiagnoVet Image Viewer - Analyze veterinary images" />
      <Box className={styles.container}>
        <Box className={styles.sidebar}>
          <Card className={styles.thumbnailList}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                {t("viewer.images")} ({images.length})
              </Typography>
              {hasImages ? (
                <Box className={styles.thumbnailGrid}>
                  {images.map((img) => (
                    <Box
                      key={img.id}
                      className={`${styles.thumbnail} ${selectedImage?.id === img.id ? styles.selected : ""}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img.preview} alt={img.file.name} />
                    </Box>
                  ))}
                </Box>
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
          <Card
            className={`${styles.imageViewer} ${isDragOver ? styles.dragOver : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={!selectedImage ? handleClick : undefined}
          >
            <CardContent className={styles.imageContent}>
              {selectedImage ? (
                <img src={selectedImage.preview} alt={selectedImage.file.name} className={styles.mainImage} />
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    {t("viewer.dropImages")}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t("viewer.supportedFormats")}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
        </Box>

        <Box className={styles.panel}>
          <AIPanel hasImages={hasImages} />
        </Box>
      </Box>
    </>
  );
}
