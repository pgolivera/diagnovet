import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@/test-utils";
import AIPanel from "./AIPanel";

const renderPanel = (props = {}) => {
  const defaultProps = {
    hasImages: false,
  };
  return renderWithTheme(<AIPanel {...defaultProps} {...props} />);
};

describe("AIPanel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders exam configuration section", () => {
    renderPanel();

    // Spanish: "Configuración del Examen", English: "Exam Configuration"
    expect(screen.getByText(/configura[cç]i[oó]n|configuration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de exam|exam type/i)).toBeInTheDocument();
  });

  it("renders observations textarea", () => {
    renderPanel();

    // Spanish: "Observaciones Iniciales", English: "Initial Observations"
    expect(screen.getByText(/observa[cç][ioõ]|observations/i)).toBeInTheDocument();
    // Spanish: "Ingresa las observaciones...", English: "Enter initial observations..."
    expect(screen.getByPlaceholderText(/ingresa|enter|digite/i)).toBeInTheDocument();
  });

  it("renders analyze button", () => {
    renderPanel();

    // Spanish: "Analizar con IA", English: "Analyze with AI"
    expect(screen.getByRole("button", { name: /analizar|analyze/i })).toBeInTheDocument();
  });

  it("renders AI findings section", () => {
    renderPanel();

    // Spanish: "Hallazgos de IA", English: "AI Findings"
    expect(screen.getByText(/hallazgos|findings|descobertas/i)).toBeInTheDocument();
  });

  it("disables controls when no images", () => {
    renderPanel({ hasImages: false });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    const textarea = screen.getByPlaceholderText(/ingresa|enter|digite/i);
    const button = screen.getByRole("button", { name: /analizar|analyze/i });

    expect(select).toHaveAttribute("aria-disabled", "true");
    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("enables controls when images are present", () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    const textarea = screen.getByPlaceholderText(/ingresa|enter|digite/i);

    expect(select).not.toHaveAttribute("aria-disabled", "true");
    expect(textarea).not.toBeDisabled();
  });

  it("shows empty state message when no images", () => {
    renderPanel({ hasImages: false });

    // Spanish: "Sube imágenes...", English: "Upload images..."
    expect(screen.getByText(/sube|upload|envie/i)).toBeInTheDocument();
  });

  it("shows prompt message when images but no analysis", () => {
    renderPanel({ hasImages: true });

    // Spanish: "Selecciona tipo de examen...", English: "Select exam type..."
    expect(screen.getByText(/selecciona|select|selecione/i)).toBeInTheDocument();
  });

  it("allows entering observations", () => {
    renderPanel({ hasImages: true });

    const textarea = screen.getByPlaceholderText(/ingresa|enter|digite/i);
    fireEvent.change(textarea, { target: { value: "Test observation" } });

    expect(textarea).toHaveValue("Test observation");
  });

  it("enables analyze button when exam type selected and has images", () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: /abdominal/i }));

    const button = screen.getByRole("button", { name: /analizar|analyze/i });
    expect(button).not.toBeDisabled();
  });

  it("shows analyzing state when analyzing", async () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: /abdominal/i }));

    const button = screen.getByRole("button", { name: /analizar|analyze/i });
    fireEvent.click(button);

    // Spanish: "Analizando...", English: "Analyzing..."
    expect(screen.getByRole("button", { name: /analizando|analyzing/i })).toBeInTheDocument();
  });

  it("shows findings after analysis completes", async () => {
    vi.useRealTimers();
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: /abdominal/i }));

    const button = screen.getByRole("button", { name: /analizar|analyze/i });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(screen.getByText("Normal organ size and echogenicity")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Liver")).toBeInTheDocument();
  });

  it("calls onAnalyze callback after analysis", async () => {
    vi.useRealTimers();
    const onAnalyze = vi.fn();
    renderPanel({ hasImages: true, onAnalyze });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: /abdominal/i }));

    const button = screen.getByRole("button", { name: /analizar|analyze/i });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(onAnalyze).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });
});
