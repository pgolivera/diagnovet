import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";

const renderSEO = (props = {}) => {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>
  );
};

describe("SEO", () => {
  it("renders with default values", async () => {
    renderSEO();
    await waitFor(() => {
      expect(document.title).toBe("Diagnovet");
    });
  });

  it("renders with custom title", async () => {
    renderSEO({ title: "Custom Page" });
    await waitFor(() => {
      expect(document.title).toBe("Custom Page | Diagnovet");
    });
  });

  it("renders meta description", async () => {
    renderSEO({ description: "Test description" });
    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute("content")).toBe("Test description");
    });
  });
});
