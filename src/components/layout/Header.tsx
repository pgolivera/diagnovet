import { AppBar, Toolbar, Typography, Box, Button, IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PetsIcon from "@mui/icons-material/Pets";
import { useLanguage } from "@i18n";
import { useThemeMode } from "@/theme/ThemeContext";
import LanguageSelector from "./LanguageSelector";
import styles from "./Header.module.css";

interface NavItem {
  path: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { path: "/", labelKey: "nav.dashboard" },
  { path: "/viewer", labelKey: "nav.viewer" },
];

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar
      position="static"
      className={styles.header}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: 1,
      }}
    >
      <Toolbar className={styles.toolbar}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PetsIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: "primary.main" }}>
            DiagnoVet
          </Typography>
        </Box>

        <Box className={styles.nav}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              className={styles.navButton}
              sx={{
                color: location.pathname === item.path ? "primary.main" : "text.secondary",
                borderBottom: location.pathname === item.path ? 2 : 0,
                borderColor: "primary.main",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {t(item.labelKey)}
            </Button>
          ))}
        </Box>

        <Box className={styles.actions}>
          <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
            <IconButton onClick={toggleTheme} size="small" sx={{ color: "text.secondary" }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <LanguageSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
