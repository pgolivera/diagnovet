import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import AIPanel from "./AIPanel";

const renderPanel = (props = {}) => {
  const defaultProps = {
    hasImages: false,
  };
  return render(
    <ThemeProvider theme={theme}>
      <AIPanel {...defaultProps} {...props} />
    </ThemeProvider>
  );
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

    expect(screen.getByText("Exam Configuration")).toBeInTheDocument();
    expect(screen.getByLabelText("Exam Type")).toBeInTheDocument();
  });

  it("renders observations textarea", () => {
    renderPanel();

    expect(screen.getByText("Initial Observations")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter initial observations...")).toBeInTheDocument();
  });

  it("renders analyze button", () => {
    renderPanel();

    expect(screen.getByRole("button", { name: /analyze with ai/i })).toBeInTheDocument();
  });

  it("renders AI findings section", () => {
    renderPanel();

    expect(screen.getByText("AI Findings")).toBeInTheDocument();
  });

  it("disables controls when no images", () => {
    renderPanel({ hasImages: false });

    const select = screen.getByLabelText("Exam Type");
    const textarea = screen.getByPlaceholderText("Enter initial observations...");
    const button = screen.getByRole("button", { name: /analyze with ai/i });

    expect(select).toHaveAttribute("aria-disabled", "true");
    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("enables controls when images are present", () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText("Exam Type");
    const textarea = screen.getByPlaceholderText("Enter initial observations...");

    expect(select).not.toHaveAttribute("aria-disabled", "true");
    expect(textarea).not.toBeDisabled();
  });

  it("shows empty state message when no images", () => {
    renderPanel({ hasImages: false });

    expect(screen.getByText("Upload images to start analysis")).toBeInTheDocument();
  });

  it("shows prompt message when images but no analysis", () => {
    renderPanel({ hasImages: true });

    expect(screen.getByText("Select exam type and click Analyze")).toBeInTheDocument();
  });

  it("allows entering observations", () => {
    renderPanel({ hasImages: true });

    const textarea = screen.getByPlaceholderText("Enter initial observations...");
    fireEvent.change(textarea, { target: { value: "Test observation" } });

    expect(textarea).toHaveValue("Test observation");
  });

  it("enables analyze button when exam type selected and has images", () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: "Abdominal" }));

    const button = screen.getByRole("button", { name: /analyze with ai/i });
    expect(button).not.toBeDisabled();
  });

  it("shows analyzing state when analyzing", async () => {
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: "Abdominal" }));

    const button = screen.getByRole("button", { name: /analyze with ai/i });
    fireEvent.click(button);

    expect(screen.getByRole("button", { name: /analyzing/i })).toBeInTheDocument();
  });

  it("shows findings after analysis completes", async () => {
    vi.useRealTimers();
    renderPanel({ hasImages: true });

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: "Abdominal" }));

    const button = screen.getByRole("button", { name: /analyze with ai/i });
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

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByRole("option", { name: "Abdominal" }));

    const button = screen.getByRole("button", { name: /analyze with ai/i });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(onAnalyze).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });
});
