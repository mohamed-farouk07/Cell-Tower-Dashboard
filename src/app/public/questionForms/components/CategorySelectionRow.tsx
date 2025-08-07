import React from "react";
import { Box, TextField, Autocomplete, Chip } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormData } from "../QuestionsPage";

interface CategorySelectionRowProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onCategoryChange: (categories: string[]) => void;
  onSeverityChange: (severity: string) => void;
}

const CategorySelectionRow: React.FC<CategorySelectionRowProps> = ({ 
  control, 
  errors, 
  onCategoryChange, 
  onSeverityChange 
}) => {
  const { t } = useTranslation();
  const categories = ["IT", "HR", "Finance", "Marketing"];
  const severities = ["Development", "Support", "Sales", "Design"];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      <Controller
        name="categories"
        control={control}
        rules={{ required: t("categoryRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            className="categories-autocomplete"
            multiple
            options={categories}
            onChange={(_, value) => {
              field.onChange(value);
              onCategoryChange(value);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("categories")}
                fullWidth
                size="small"
                error={!!errors.categories}
                helperText={errors.categories?.message}
                required
                sx={{
                  "& .MuiInputBase-root": { height: "40px" },
                  "& .MuiFormLabel-root": { fontSize: "14px" },
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="severites"
        control={control}
        rules={{ required: t("severitesRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            className="severities-autocomplete"
            options={severities}
            onChange={(_, value) => {
              if (value !== null) {
                field.onChange(value);
                onSeverityChange(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("severites")}
                fullWidth
                size="small"
                error={!!errors.severites}
                helperText={errors.severites?.message}
                required
                sx={{
                  "& .MuiInputBase-root": { height: "40px" },
                  "& .MuiFormLabel-root": { fontSize: "14px" },
                }}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default CategorySelectionRow;