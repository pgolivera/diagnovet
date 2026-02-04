import { ReactNode } from "react";
import { Box, Typography, Card as MuiCard, Stack, Divider, Button, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import { GoogleIcon } from "@components/shared/icons/CustomIcons";
import { useLanguage } from "@i18n";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const AuthContainer = styled(Stack)(({ theme }) => ({
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(142, 43%, 94%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(142, 43%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

interface AuthCardProps {
  title: string;
  children: ReactNode;
  onGoogleClick: () => void;
  googleButtonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

export function AuthCard({
  title,
  children,
  onGoogleClick,
  googleButtonText,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthCardProps) {
  const { t } = useLanguage();

  return (
    <Card variant="outlined">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <PetsIcon sx={{ color: "primary.main", fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
          DiagnoVet
        </Typography>
      </Box>
      <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        {title}
      </Typography>

      {children}

      <Divider>{t("common.or")}</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button fullWidth variant="outlined" onClick={onGoogleClick} startIcon={<GoogleIcon />}>
          {googleButtonText}
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          {footerText}{" "}
          <Link component={RouterLink} to={footerLinkTo} variant="body2">
            {footerLinkText}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
