import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLanguage, type Language } from "@i18n";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "es", label: "Español", flag: "ES" },
  { code: "en", label: "English", flag: "EN" },
  { code: "pt", label: "Português", flag: "PT" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (code: Language) => {
    setLanguage(code);
    handleClose();
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          color: "text.secondary",
          textTransform: "none",
          minWidth: "auto",
        }}
      >
        {currentLang?.flag}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === language}
            onClick={() => handleSelect(lang.code)}
            sx={{ display: "flex", gap: 1 }}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
