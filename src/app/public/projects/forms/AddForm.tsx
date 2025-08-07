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
  projectNameEn: string;
  projectNameAr: string;
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
      setOpenSnackbar(true); // Show success message
    }
  };

  const getConfirmationMessage = () => {
    return selectedStatus === "active"
      ? t("areYouSureActivateRole")
      : t("areYouSureSuspendRole");
  };

  return (
    <>
      {/* Project Name En */}
      <Controller
        name="projectNameEn"
        control={control}
        defaultValue={formData.projectNameEn}
        rules={{
          required: t("projectEnRequired"),
          maxLength: {
            value: 30,
            message: t("projectEnMessage"),
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: t("projectEnPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("projectEn")}
            fullWidth
            size="small"
            error={!!errors.projectNameEn}
            helperText={errors.projectNameEn?.message}
            required
          />
        )}
      />

      <Controller
        name="projectNameAr"
        control={control}
        defaultValue={formData.projectNameAr}
        rules={{
          required: t("projectArRequired"),
          maxLength: {
            value: 30,
            message: t("projectArMessage"),
          },
          pattern: {
            value: /^[\u0600-\u06FF\s]+$/,
            message: t("projectArPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("projectAr")}
            fullWidth
            size="small"
            error={!!errors.projectNameAr}
            helperText={errors.projectNameAr?.message}
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
