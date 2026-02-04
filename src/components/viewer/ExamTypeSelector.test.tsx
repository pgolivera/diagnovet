import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import ExamTypeSelector from "./ExamTypeSelector";

const renderSelector = (props = {}) => {
  const defaultProps = {
    value: "" as const,
    onChange: vi.fn(),
  };
  return render(
    <ThemeProvider theme={theme}>
      <ExamTypeSelector {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe("ExamTypeSelector", () => {
  it("renders with label", () => {
    renderSelector();

    expect(screen.getByLabelText("Exam Type")).toBeInTheDocument();
  });

  it("shows all exam type options when opened", () => {
    renderSelector();

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);

    expect(screen.getByRole("option", { name: "Abdominal" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cervical" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Gestational" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Ocular" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Thoracic" })).toBeInTheDocument();
  });

  it("calls onChange when option is selected", () => {
    const onChange = vi.fn();
    renderSelector({ onChange });

    const select = screen.getByLabelText("Exam Type");
    fireEvent.mouseDown(select);

    const option = screen.getByRole("option", { name: "Abdominal" });
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith("abdominal");
  });

  it("displays selected value", () => {
    renderSelector({ value: "thoracic" });

    expect(screen.getByLabelText("Exam Type")).toHaveTextContent("Thoracic");
  });

  it("can be disabled", () => {
    renderSelector({ disabled: true });

    const select = screen.getByLabelText("Exam Type");
    expect(select).toHaveAttribute("aria-disabled", "true");
  });
});
