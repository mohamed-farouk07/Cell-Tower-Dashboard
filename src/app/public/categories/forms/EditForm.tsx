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

interface EditFormProps {
  selectedCategory: {
    id: number;
    categoryNameEn: string;
    categoryNameAr: string;
    active: boolean;
  } | null;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>; // Explicitly type errors
  control: Control<FormData>; // Explicitly type control
}

const EditForm: React.FC<EditFormProps> = ({
  selectedCategory,
  errors,
  control,
}) => {
   const initialStatus = selectedCategory?.active ? "active" : "suspend";
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
      {/* Category Name English */}
      <Controller
        name="categoryNameEn"
        control={control}
        defaultValue={selectedCategory?.categoryNameEn || ""}
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
            helperText={errors.categoryNameEn?.message} // Safely access the message
            required
          />
        )}
      />

      <Controller
        name="categoryNameAr"
        control={control}
        defaultValue={selectedCategory?.categoryNameAr || ""}
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
            helperText={errors.categoryNameAr?.message} // Safely access the message
            required
          />
        )}
      />

      {/* Status */}
      <Controller
        name="status"
        control={control}
        defaultValue={selectedCategory?.active ? "active" : "suspend"}
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
