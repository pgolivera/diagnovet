import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkInProgress from "./WorkInProgress";

describe("WorkInProgress", () => {
  it("renders with default props", () => {
    render(<WorkInProgress />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    expect(screen.getByText(/Transforming veterinary medicine/)).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<WorkInProgress title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<WorkInProgress message="Custom message" />);
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("renders logo by default", () => {
    render(<WorkInProgress />);
    expect(screen.getByText("DV")).toBeInTheDocument();
  });

  it("hides logo when showLogo is false", () => {
    render(<WorkInProgress showLogo={false} />);
    expect(screen.queryByText("DV")).not.toBeInTheDocument();
  });
});
