import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import styles from "./Header.module.css";

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Dashboard" },
  { path: "/viewer", label: "Viewer" },
];

export default function Header() {
  const location = useLocation();

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
              {item.label}
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
