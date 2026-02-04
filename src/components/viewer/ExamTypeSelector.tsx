import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import type { ExamType } from "@/types";
import { useLanguage } from "@i18n";

interface ExamTypeSelectorProps {
  value: ExamType | "";
  onChange: (value: ExamType) => void;
  disabled?: boolean;
}

const examTypes: ExamType[] = ["abdominal", "cervical", "gestational", "ocular", "thoracic"];

export default function ExamTypeSelector({ value, onChange, disabled = false }: ExamTypeSelectorProps) {
  const { t } = useLanguage();

  const handleChange = (event: SelectChangeEvent<ExamType | "">) => {
    const newValue = event.target.value as ExamType;
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <InputLabel id="exam-type-label">{t("aiPanel.examType")}</InputLabel>
      <Select
        labelId="exam-type-label"
        id="exam-type-select"
        value={value}
        label={t("aiPanel.examType")}
        onChange={handleChange}
      >
        {examTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {t(`examType.${type}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
