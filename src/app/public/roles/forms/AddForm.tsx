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
  roleNameEn: string;
  roleNameAr: string;
  description: string;
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
        name="roleNameEn"
        control={control}
        defaultValue={formData.roleNameEn}
        rules={{
          required: t("roleEnRequired"),
          maxLength: {
            value: 30,
            message: t("roleEnMessage"),
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: t("roleEnPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("roleEn")}
            fullWidth
            size="small"
            error={!!errors.roleNameEn}
            helperText={errors.roleNameEn?.message}
            required
          />
        )}
      />

      <Controller
        name="roleNameAr"
        control={control}
        defaultValue={formData.roleNameAr}
        rules={{
          required: t("roleArRequired"),
          maxLength: {
            value: 30,
            message: t("roleArMessage"),
          },
          pattern: {
            value: /^[\u0600-\u06FF\s]+$/,
            message: t("roleArPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("roleAr")}
            fullWidth
            size="small"
            error={!!errors.roleNameAr}
            helperText={errors.roleNameAr?.message}
            required
          />
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        defaultValue={formData.description || ""}
        rules={{
          required: t("descRequired"),
          maxLength: {
            value: 200,
            message: t("descMessage"),
          },
          pattern: {
            value: /^[A-Za-z\u0600-\u06FF0-9\s.,?!-]+$/,
            message: t("descPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("description")}
            fullWidth
            size="small"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
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
