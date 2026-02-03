import type { StudyImage } from "@/types";

export interface UploadImageResult {
  id: string;
  url: string;
  thumbnailUrl: string;
  filename: string;
  uploadedAt: string;
}

export const imageService = {
  async upload(file: File): Promise<UploadImageResult> {
    await delay(800);

    const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const url = URL.createObjectURL(file);

    return {
      id,
      url,
      thumbnailUrl: url,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
    };
  },

  async uploadMultiple(files: File[]): Promise<UploadImageResult[]> {
    const results: UploadImageResult[] = [];

    for (const file of files) {
      const result = await this.upload(file);
      results.push(result);
    }

    return results;
  },

  async delete(imageId: string): Promise<boolean> {
    await delay(200);
    console.debug(`Image ${imageId} deleted`);
    return true;
  },

  toStudyImage(result: UploadImageResult, order: number): StudyImage {
    return {
      id: result.id,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      filename: result.filename,
      uploadedAt: result.uploadedAt,
      order,
    };
  },
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
