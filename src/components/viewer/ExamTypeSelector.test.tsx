import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "@/test-utils";
import ExamTypeSelector from "./ExamTypeSelector";

const renderSelector = (props = {}) => {
  const defaultProps = {
    value: "" as const,
    onChange: vi.fn(),
  };
  return renderWithTheme(<ExamTypeSelector {...defaultProps} {...props} />);
};

describe("ExamTypeSelector", () => {
  it("renders with label", () => {
    renderSelector();

    // Spanish: "Tipo de Examen", English: "Exam Type", Portuguese: "Tipo de Exame"
    expect(screen.getByLabelText(/tipo de exam|exam type/i)).toBeInTheDocument();
  });

  it("shows all exam type options when opened", () => {
    renderSelector();

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);

    expect(screen.getByRole("option", { name: /abdominal/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /cervical/i })).toBeInTheDocument();
    // Spanish/Portuguese: "Gestacional", English: "Gestational"
    expect(screen.getByRole("option", { name: /gestacion|gestational/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /ocular/i })).toBeInTheDocument();
    // Spanish/Portuguese: "Torácico", English: "Thoracic"
    expect(screen.getByRole("option", { name: /tor[aá]ci|thoracic/i })).toBeInTheDocument();
  });

  it("calls onChange when option is selected", () => {
    const onChange = vi.fn();
    renderSelector({ onChange });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    fireEvent.mouseDown(select);

    const option = screen.getByRole("option", { name: /abdominal/i });
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith("abdominal");
  });

  it("displays selected value", () => {
    renderSelector({ value: "thoracic" });

    // Spanish/Portuguese: "Torácico", English: "Thoracic"
    expect(screen.getByLabelText(/tipo de exam|exam type/i)).toHaveTextContent(/tor[aá]ci|thoracic/i);
  });

  it("can be disabled", () => {
    renderSelector({ disabled: true });

    const select = screen.getByLabelText(/tipo de exam|exam type/i);
    expect(select).toHaveAttribute("aria-disabled", "true");
  });
});
