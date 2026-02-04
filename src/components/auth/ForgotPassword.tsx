import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useLanguage } from "@i18n";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Simulate sending reset email
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      handleClose();
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>{t("auth.resetPassword")}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>
          {submitted ? t("auth.resetEmailSent") : t("auth.resetPasswordDescription")}
        </DialogContentText>
        {!submitted && (
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label={t("auth.emailAddress")}
            placeholder={t("auth.emailPlaceholder")}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>{t("common.cancel")}</Button>
        {!submitted && (
          <Button variant="contained" onClick={handleSubmit} disabled={!email}>
            {t("common.continue")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
