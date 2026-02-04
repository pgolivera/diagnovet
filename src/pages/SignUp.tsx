import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";
import { SEO } from "@components/shared/seo";
import { AuthCard, AuthContainer } from "@components/auth";
import { useAuth } from "@/auth";
import { useLanguage } from "@i18n";

export default function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithGoogle, register } = useAuth();
  const { t } = useLanguage();

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateInputs = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let isValid = true;

    if (!name.value || name.value.length < 2) {
      setNameError(true);
      setNameErrorMessage(t("auth.nameRequired"));
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

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
    await register(data.get("name") as string, data.get("email") as string, data.get("password") as string);
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
      <SEO title={t("auth.signUp")} description="Sign up for DiagnoVet" />
      <AuthContainer direction="column" justifyContent="center" alignItems="center">
        <AuthCard
          title={t("auth.signUp")}
          onGoogleClick={loginWithGoogle}
          googleButtonText={t("auth.signUpWithGoogle")}
          footerText={t("auth.alreadyHaveAccount")}
          footerLinkText={t("auth.signIn")}
          footerLinkTo="/login"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">{t("auth.fullName")}</FormLabel>
              <TextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="text"
                name="name"
                placeholder={t("auth.namePlaceholder")}
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
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
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label={t("auth.receiveUpdates")}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : t("auth.signUp")}
            </Button>
          </Box>
        </AuthCard>
      </AuthContainer>
    </>
  );
}
