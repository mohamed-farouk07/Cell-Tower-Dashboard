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
  severityNameEn: string;
  severityNameAr: string;
  status: string;
}

interface EditFormProps {
  selectedSeverity: {
    id: number;
    severityNameEn: string;
    severityNameAr: string;
    active: boolean;
  } | null;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const EditForm: React.FC<EditFormProps> = ({
  selectedSeverity,
  errors,
  control,
}) => {
  const { t } = useTranslation();

  const initialStatus = selectedSeverity?.active ? "active" : "suspend";
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [previousStatus, setPreviousStatus] = useState(initialStatus);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pendingFieldChange, setPendingFieldChange] = useState<((value: string) => void) | null>(null);

  const handleSelectChange = (value: string, onChange: (value: string) => void) => {
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
      ? t("areYouSureActivateSeverity")
      : t("areYouSureSuspendSeverity");
  };

  return (
    <>
      {/* Severity Name in English */}
      <Controller
        name="severityNameEn"
        control={control}
        defaultValue={selectedSeverity?.severityNameEn || ""}
        rules={{
          required: t("severityEnRequired"),
          maxLength: {
            value: 30,
            message: t("severityEnMessage"),
          },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: t("severityEnPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("severityEn")}
            fullWidth
            size="small"
            error={!!errors.severityNameEn}
            helperText={errors.severityNameEn?.message}
            required
          />
        )}
      />

      {/* Severity Name in Arabic */}
      <Controller
        name="severityNameAr"
        control={control}
        defaultValue={selectedSeverity?.severityNameAr || ""}
        rules={{
          required: t("severityArRequired"),
          maxLength: {
            value: 30,
            message: t("severityArMessage"),
          },
          pattern: {
            value: /^[\u0600-\u06FF\s]+$/,
            message: t("severityArPattern"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("severityAr")}
            fullWidth
            size="small"
            error={!!errors.severityNameAr}
            helperText={errors.severityNameAr?.message}
            required
          />
        )}
      />

      {/* Status */}
      <Controller
        name="status"
        control={control}
        defaultValue={initialStatus}
        rules={{ required: t("statusRequired") }}
        render={({ field }) => (
          <FormControl fullWidth size="small" required>
            <Select
              {...field}
              value={selectedStatus}
              onChange={(e) => handleSelectChange(e.target.value, field.onChange)}
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
