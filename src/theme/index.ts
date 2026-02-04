import { createTheme, type Theme } from "@mui/material/styles";

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

const commonSettings = {
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
          textTransform: "none" as const,
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
};

// Veterinary green color
const veterinaryGreen = {
  main: "#2e7d32",
  light: "#4caf50",
  dark: "#1b5e20",
};

export const lightTheme: Theme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    primary: veterinaryGreen,
    secondary: {
      main: "#00897b",
      light: "#4db6ac",
      dark: "#00695c",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#ed6c02",
    },
    error: {
      main: "#d32f2f",
    },
    info: {
      main: "#0288d1",
    },
    veterinary: veterinaryGreen,
  },
});

export const darkTheme: Theme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
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
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#29b6f6",
    },
    veterinary: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
  },
});

// Default export for backwards compatibility
export default lightTheme;
