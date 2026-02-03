import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    veterinary: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    veterinary?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4facfe",
      light: "#00f2fe",
      dark: "#0f3460",
    },
    secondary: {
      main: "#00f2fe",
      light: "#33f4fe",
      dark: "#00a9b2",
    },
    background: {
      default: "#1a1a2e",
      paper: "#16213e",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    success: {
      main: "#10b981",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#ef4444",
    },
    info: {
      main: "#3b82f6",
    },
    veterinary: {
      main: "#4facfe",
      light: "#00f2fe",
      dark: "#0f3460",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      '"Open Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
