import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  CircularProgress,
} from "@mui/material";
import { SEO } from "@components/shared/seo";
import { ForgotPassword, AuthCard, AuthContainer } from "@components/auth";
import { useAuth } from "@/auth";
import { useLanguage } from "@i18n";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithGoogle, loginWithCredentials } = useAuth();
  const { t } = useLanguage();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t("auth.invalidEmail"));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t("auth.passwordMinLength"));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    setIsSubmitting(true);
    await loginWithCredentials(data.get("email") as string, data.get("password") as string);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <AuthContainer direction="column" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />
      </AuthContainer>
    );
  }

  return (
    <>
      <SEO title={t("auth.login")} description="Login to DiagnoVet" />
      <AuthContainer direction="column" justifyContent="center" alignItems="center">
        <AuthCard
          title={t("auth.signIn")}
          onGoogleClick={loginWithGoogle}
          googleButtonText={t("auth.signInWithGoogle")}
          footerText={t("auth.noAccount")}
          footerLinkText={t("auth.signUp")}
          footerLinkTo="/signup"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">{t("auth.email")}</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder={t("auth.emailPlaceholder")}
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("auth.password")}</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label={t("auth.rememberMe")} />
            <ForgotPassword open={forgotPasswordOpen} handleClose={() => setForgotPasswordOpen(false)} />
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t("auth.signIn")}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              {t("auth.forgotPassword")}
            </Link>
          </Box>
        </AuthCard>
      </AuthContainer>
    </>
  );
}
