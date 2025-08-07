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

interface EditFormProps {
  selectedRole: {
    id: number;
    roleNameEn: string;
    roleNameAr: string;
    description: string;
    active: boolean;
  } | null;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>; // Explicitly type errors
  control: Control<FormData>; // Explicitly type control
}

const EditForm: React.FC<EditFormProps> = ({
  selectedRole,
  errors,
  control,
}) => {
  const initialStatus = selectedRole?.active ? "active" : "suspend";
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [previousStatus, setPreviousStatus] = useState(initialStatus);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pendingFieldChange, setPendingFieldChange] = useState<
    ((value: string) => void) | null
  >(null);
  const { t } = useTranslation();

  const handleSelectChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    setPreviousStatus(selectedStatus); // Save current
    setSelectedStatus(value); // Update temp
    setPendingFieldChange(() => onChange); // Save handler for potential revert
    setOpenDialog(true); // Show confirm
  };

  const handleDialogClose = (confirmed: boolean) => {
    setOpenDialog(false);
    if (confirmed) {
      setOpenSnackbar(true);
    } else {
      setSelectedStatus(previousStatus); // Revert UI
      if (pendingFieldChange) {
        pendingFieldChange(previousStatus); // Revert form state
      }
    }
  };

  const getConfirmationMessage = () => {
    return selectedStatus === "active"
      ? t("areYouSureActivateRole")
      : t("areYouSureSuspendRole");
  };

  return (
    <>
      {/* Project Name English */}
      <Controller
        name="roleNameEn"
        control={control}
        defaultValue={selectedRole?.roleNameEn || ""}
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
            helperText={errors.roleNameEn?.message} // Safely access the message
            required
          />
        )}
      />

      <Controller
        name="roleNameAr"
        control={control}
        defaultValue={selectedRole?.roleNameAr || ""}
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
            helperText={errors.roleNameAr?.message} // Safely access the message
            required
          />
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        defaultValue={selectedRole?.description || ""}
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
        defaultValue={selectedRole?.active ? "active" : "suspend"}
        rules={{ required: t("statusRequired") }}
        render={({ field }) => (
          <FormControl fullWidth size="small" required>
            <Select
              {...field}
              value={selectedStatus}
              onChange={(e) =>
                handleSelectChange(e.target.value, field.onChange)
              }
              error={!!errors.status}
            >
              <MenuItem value="" disabled>
                {t("selectStatus")}
              </MenuItem>
              <MenuItem value="active">{t("active")}</MenuItem>
              <MenuItem value="suspend">{t("suspend")}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      {/* Confirmation Dialog */}
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

export default EditForm;
