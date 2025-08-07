import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ConfirmationDialog from "../../../../components/ui/ConfirmationDialog";

interface FormData {
  categoryNameEn: string;
  categoryNameAr: string;
  status: string;
}

interface AddFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const AddForm: React.FC<AddFormProps> = ({ formData, errors, control }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(formData.status);
  const { t } = useTranslation();

  const handleSelectChange = (value: string) => {
    setSelectedStatus(value);
    if (value !== "") {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = (confirmed: boolean) => {
    setOpenDialog(false);
    if (confirmed) {
      setOpenSnackbar(true);
    }
  };

  const getConfirmationMessage = () => {
    return selectedStatus === "active"
      ? t("areYouSureActivateRole")
      : t("areYouSureSuspendRole");
  };

  return (
    <>
      {/* Category Name En */}
      <Controller
        name="categoryNameEn"
        control={control}
        defaultValue={formData.categoryNameEn}
        rules={{
          required: t("categoryEnRequired"),
          maxLength: {
            value: 30,
            message: t("categoryEnMessage"),
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: t("categoryEnPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("categoryEn")}
            fullWidth
            size="small"
            error={!!errors.categoryNameEn}
            helperText={errors.categoryNameEn?.message}
            required
          />
        )}
      />

      <Controller
        name="categoryNameAr"
        control={control}
        defaultValue={formData.categoryNameAr}
        rules={{
          required: t("categoryArRequired"),
          maxLength: {
            value: 30,
            message: t("categoryArMessage"),
          },
          pattern: {
            value: /^[\u0600-\u06FF\s]+$/,
            message: t("categoryArPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("categoryAr")}
            fullWidth
            size="small"
            error={!!errors.categoryNameAr}
            helperText={errors.categoryNameAr?.message}
            required
          />
        )}
      />

      {/* Status */}
      <Controller
        name="status"
        control={control}
        defaultValue={formData.status || ""}
        rules={{ required: t("statusRequired") }}
        render={({ field }) => (
          <FormControl fullWidth size="small" required>
            <Select
              {...field}
              value={selectedStatus || formData.status || ""}
              onChange={(e) => {
                const value = e.target.value;
                handleSelectChange(value);
                field.onChange(value); // Update the field value
              }}
              error={!!errors.status}
            >
              <MenuItem value="select" disabled>
                {t("selectStatus")}
              </MenuItem>
              <MenuItem value="active">{t("active")}</MenuItem>
              <MenuItem value="suspend">{t("suspend")}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      {/* Reusable Confirmation Dialog */}
      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        title={t("confirmation")}
        message={getConfirmationMessage()}
        confirmText={t("yes")}
        cancelText={t("no")}
        confirmColor="primary"
        cancelColor="error"
      />

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          {t("statusUpdated")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddForm;
