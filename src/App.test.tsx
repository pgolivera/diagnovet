import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const renderApp = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe("App", () => {
  it("renders home page in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    renderApp();
    expect(screen.getByText("Diagnovet")).toBeInTheDocument();
  });

  it("renders work in progress in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");
    renderApp();
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });
});
