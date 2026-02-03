import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Language = "es" | "en" | "pt";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (code: Language) => {
    setCurrentLanguage(code);
    localStorage.setItem("diagnovet-language", code);
    handleClose();
  };

  const currentLang = languages.find((l) => l.code === currentLanguage);

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
            selected={lang.code === currentLanguage}
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
