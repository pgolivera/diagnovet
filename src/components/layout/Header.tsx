import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLanguage } from "@i18n";
import { useThemeMode } from "@/theme/ThemeContext";
import { useAuth } from "@/auth";
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
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

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

        {isAuthenticated && (
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
        )}

        <Box className={styles.actions}>
          <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
            <IconButton onClick={toggleTheme} size="small" sx={{ color: "text.secondary" }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <LanguageSelector />

          {isAuthenticated && user && (
            <>
              <Tooltip title={user.name}>
                <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2">{user.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  {t("auth.logout")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
