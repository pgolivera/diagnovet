import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import LanguageSelector from "./LanguageSelector";

const renderLanguageSelector = () => {
  return render(
    <ThemeProvider theme={theme}>
      <LanguageSelector />
    </ThemeProvider>
  );
};

describe("LanguageSelector", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders with default language ES", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("ES");
  });

  it("opens menu when button is clicked", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Português")).toBeInTheDocument();
  });

  it("changes language when option is selected", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const englishOption = screen.getByText("English");
    fireEvent.click(englishOption);

    expect(button).toHaveTextContent("EN");
  });

  it("saves language to localStorage on selection", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const portugueseOption = screen.getByText("Português");
    fireEvent.click(portugueseOption);

    expect(localStorage.getItem("diagnovet-language")).toBe("pt");
  });

  it("closes menu after selection", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    const englishOption = screen.getByText("English");
    fireEvent.click(englishOption);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes menu when clicking outside", () => {
    renderLanguageSelector();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("shows all three language options", () => {
    renderLanguageSelector();

    fireEvent.click(screen.getByRole("button"));

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(3);
  });

  it("marks current language as selected in menu", () => {
    renderLanguageSelector();

    fireEvent.click(screen.getByRole("button"));

    const menuItems = screen.getAllByRole("menuitem");
    const selectedItem = menuItems.find((item) => item.classList.contains("Mui-selected"));

    expect(selectedItem).toHaveTextContent("Español");
  });

  it("updates selected state when language changes", () => {
    renderLanguageSelector();

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("English"));

    fireEvent.click(screen.getByRole("button"));

    const menuItems = screen.getAllByRole("menuitem");
    const selectedItem = menuItems.find((item) => item.classList.contains("Mui-selected"));

    expect(selectedItem).toHaveTextContent("English");
  });
});
