import { describe, it, expect, beforeEach, vi } from "vitest";
import { imageService } from "./imageService";

describe("imageService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("upload", () => {
    it("uploads a file and returns result with generated id", async () => {
      const file = new File(["test"], "test-image.jpg", { type: "image/jpeg" });

      const promise = imageService.upload(file);
      await vi.advanceTimersByTimeAsync(800);
      const result = await promise;

      expect(result.id).toMatch(/^img-/);
      expect(result.url).toBe("blob:mock-url");
      expect(result.thumbnailUrl).toBe("blob:mock-url");
      expect(result.filename).toBe("test-image.jpg");
      expect(result.uploadedAt).toBeDefined();
    });

    it("returns correct ISO timestamp", async () => {
      const file = new File(["test"], "test.png", { type: "image/png" });

      const promise = imageService.upload(file);
      await vi.advanceTimersByTimeAsync(800);
      const result = await promise;

      expect(new Date(result.uploadedAt).toISOString()).toBe(result.uploadedAt);
    });
  });

  describe("uploadMultiple", () => {
    it("uploads multiple files sequentially", async () => {
      const files = [
        new File(["test1"], "image1.jpg", { type: "image/jpeg" }),
        new File(["test2"], "image2.jpg", { type: "image/jpeg" }),
        new File(["test3"], "image3.jpg", { type: "image/jpeg" }),
      ];

      const promise = imageService.uploadMultiple(files);
      await vi.advanceTimersByTimeAsync(2400);
      const results = await promise;

      expect(results).toHaveLength(3);
      expect(results[0].filename).toBe("image1.jpg");
      expect(results[1].filename).toBe("image2.jpg");
      expect(results[2].filename).toBe("image3.jpg");
    });

    it("returns empty array for no files", async () => {
      const promise = imageService.uploadMultiple([]);
      const results = await promise;

      expect(results).toHaveLength(0);
    });

    it("generates unique ids for each upload", async () => {
      const files = [
        new File(["test1"], "a.jpg", { type: "image/jpeg" }),
        new File(["test2"], "b.jpg", { type: "image/jpeg" }),
      ];

      const promise = imageService.uploadMultiple(files);
      await vi.advanceTimersByTimeAsync(1600);
      const results = await promise;

      expect(results[0].id).not.toBe(results[1].id);
    });
  });

  describe("delete", () => {
    it("deletes an image and returns true", async () => {
      const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

      const promise = imageService.delete("img-123");
      await vi.advanceTimersByTimeAsync(200);
      const result = await promise;

      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith("Image img-123 deleted");

      consoleSpy.mockRestore();
    });
  });

  describe("toStudyImage", () => {
    it("converts upload result to StudyImage format", () => {
      const uploadResult = {
        id: "img-123",
        url: "blob:test-url",
        thumbnailUrl: "blob:test-thumb",
        filename: "test.jpg",
        uploadedAt: "2026-02-03T10:00:00Z",
      };

      const studyImage = imageService.toStudyImage(uploadResult, 5);

      expect(studyImage.id).toBe("img-123");
      expect(studyImage.url).toBe("blob:test-url");
      expect(studyImage.thumbnailUrl).toBe("blob:test-thumb");
      expect(studyImage.filename).toBe("test.jpg");
      expect(studyImage.uploadedAt).toBe("2026-02-03T10:00:00Z");
      expect(studyImage.order).toBe(5);
    });

    it("sets correct order for multiple images", () => {
      const result = {
        id: "img-1",
        url: "url",
        thumbnailUrl: "thumb",
        filename: "file.jpg",
        uploadedAt: "2026-02-03T10:00:00Z",
      };

      const image1 = imageService.toStudyImage(result, 0);
      const image2 = imageService.toStudyImage(result, 1);
      const image3 = imageService.toStudyImage(result, 2);

      expect(image1.order).toBe(0);
      expect(image2.order).toBe(1);
      expect(image3.order).toBe(2);
    });
  });
});
