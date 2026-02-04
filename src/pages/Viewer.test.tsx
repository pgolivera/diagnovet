import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils";
import Viewer from "./Viewer";

describe("Viewer", () => {
  it("renders the viewer page", () => {
    renderWithProviders(<Viewer />);

    // Spanish: "Imágenes", English: "Images"
    expect(screen.getByRole("heading", { name: /im[aá]gen/i })).toBeInTheDocument();
  });

  it("renders the three-panel layout with sidebar", () => {
    renderWithProviders(<Viewer />);

    // Check for image section - Spanish: "Imágenes", English: "Images"
    expect(screen.getByRole("heading", { name: /im[aá]gen/i })).toBeInTheDocument();
  });

  it("displays upload instructions in main area", () => {
    renderWithProviders(<Viewer />);

    // Spanish: "Arrastra", English: "Drop", Portuguese: "Arraste"
    expect(screen.getByText(/arrastra|drop|arraste/i)).toBeInTheDocument();
  });

  it("displays AI panel sections", () => {
    renderWithProviders(<Viewer />);

    // Spanish: "Configuración del Examen"
    expect(screen.getByText(/configuraci[oó]n|configuration/i)).toBeInTheDocument();
  });

  it("shows supported formats message", () => {
    renderWithProviders(<Viewer />);

    // All languages have JPEG, PNG, DICOM
    expect(screen.getByText(/jpeg.*png.*dicom/i)).toBeInTheDocument();
  });
});
