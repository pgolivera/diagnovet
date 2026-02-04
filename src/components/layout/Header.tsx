import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@i18n";
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

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" component="div" className={styles.logo}>
          DiagnoVet
        </Typography>

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
              }}
            >
              {t(item.labelKey)}
            </Button>
          ))}
        </Box>

        <Box className={styles.actions}>
          <LanguageSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
