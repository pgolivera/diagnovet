import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Viewer from "./Viewer";

const renderViewer = () => {
  return render(
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <Viewer />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

describe("Viewer", () => {
  it("renders the viewer page", () => {
    renderViewer();

    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("No images loaded")).toBeInTheDocument();
  });

  it("renders the three-panel layout", () => {
    renderViewer();

    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Drop images here or click to upload")).toBeInTheDocument();
    expect(screen.getByText("Exam Type")).toBeInTheDocument();
  });

  it("displays upload instructions in main area", () => {
    renderViewer();

    expect(screen.getByText("Drop images here or click to upload")).toBeInTheDocument();
  });

  it("displays exam type section in data panel", () => {
    renderViewer();

    expect(screen.getByText("Exam Type")).toBeInTheDocument();
    expect(screen.getByText("Select exam type after uploading images")).toBeInTheDocument();
  });
});
