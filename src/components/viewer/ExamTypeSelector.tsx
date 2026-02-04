import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import type { ExamType } from "@/types";

interface ExamTypeSelectorProps {
  value: ExamType | "";
  onChange: (value: ExamType) => void;
  disabled?: boolean;
}

const examTypes: { value: ExamType; label: string }[] = [
  { value: "abdominal", label: "Abdominal" },
  { value: "cervical", label: "Cervical" },
  { value: "gestational", label: "Gestational" },
  { value: "ocular", label: "Ocular" },
  { value: "thoracic", label: "Thoracic" },
];

export default function ExamTypeSelector({ value, onChange, disabled = false }: ExamTypeSelectorProps) {
  const handleChange = (event: SelectChangeEvent<ExamType | "">) => {
    const newValue = event.target.value as ExamType;
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth size="small" disabled={disabled}>
      <InputLabel id="exam-type-label">Exam Type</InputLabel>
      <Select labelId="exam-type-label" id="exam-type-select" value={value} label="Exam Type" onChange={handleChange}>
        {examTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
