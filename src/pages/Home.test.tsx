import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Home";

const renderHome = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("Home", () => {
  it("renders the heading", () => {
    renderHome();
    expect(screen.getByRole("heading", { name: "Diagnovet" })).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderHome();
    expect(screen.getByText(/Transforming veterinary medicine/)).toBeInTheDocument();
  });

  it("renders the development mode hint", () => {
    renderHome();
    expect(screen.getByText(/only visible in development mode/)).toBeInTheDocument();
  });
});
