import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
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
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  description: string;
  role: string;
  status: string;
  project: string;
}

interface EditFormProps {
  selectedUser: {
    id: number;
    username: string;
    email: string;
    mobile: string;
    description: string;
    role: string;
    active: boolean;
    project: string;
  } | null;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roles: string[];
  projects: string[];
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const EditForm: React.FC<EditFormProps> = ({
  selectedUser,
  handleEditInputChange,
  roles,
  projects,
  errors,
  control,
}) => {
  const { t } = useTranslation();
  const initialStatus = selectedUser?.active ? "active" : "suspend";
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [previousStatus, setPreviousStatus] = useState(initialStatus);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pendingFieldChange, setPendingFieldChange] = useState<((value: string) => void) | null>(null);

  const handleSelectChange = (value: string, onChange: (value: string) => void) => {
    setPreviousStatus(selectedStatus);
    setSelectedStatus(value);
    setPendingFieldChange(() => onChange);
    setOpenDialog(true);
  };

  const handleDialogClose = (confirmed: boolean) => {
    setOpenDialog(false);
    if (confirmed) {
      setOpenSnackbar(true);
    } else {
      setSelectedStatus(previousStatus);
      if (pendingFieldChange) {
        pendingFieldChange(previousStatus);
      }
    }
  };

  const getConfirmationMessage = () => {
    return selectedStatus === "active"
      ? t("areYouSureActivateUser")
      : t("areYouSureSuspendUser");
  };

  return (
    <>
      {/* Username */}
      <Controller
        name="username"
        control={control}
        defaultValue={selectedUser?.username || ""}
        rules={{ required: t("usernameRequired") }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("username")}
            fullWidth
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}
            required
          />
        )}
      />
      {/* Email */}
      <Controller
        name="email"
        control={control}
        defaultValue={selectedUser?.email || ""}
        rules={{
          required: t("emailRequired"),
          pattern: { value: /^\S+@\S+$/i, message: t("invalidEmailAddress") },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("email")}
            fullWidth
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
        )}
      />
      {/* Mobile */}
      <Controller
        name="mobile"
        control={control}
        defaultValue={selectedUser?.mobile || ""}
        rules={{
          required: t("mobileRequired"),
          pattern: {
            value: /^[0-9]+$/,
            message: t("mobileInvalid"),
          },
          minLength: {
            value: 11,
            message: t("mobileTooShort"),
          },
          maxLength: {
            value: 15,
            message: t("mobileTooLong"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("mobile")}
            fullWidth
            size="small"
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            required
          />
        )}
      />
      {/* Description */}
      <Controller
        name="description"
        control={control}
        defaultValue={selectedUser?.description || ""}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("description")}
            fullWidth
            size="small"
            error={!!errors.description}
            helperText={errors.description?.message}
            required
          />
        )}
      />
      {/* Role */}
      <Controller
        name="role"
        control={control}
        defaultValue={selectedUser?.role || ""}
        rules={{ required: t("roleRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={roles}
            onChange={(_, value) => {
              field.onChange(value);
              handleEditInputChange({
                target: { name: "role", value: value || "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("role")}
                fullWidth
                size="small"
                error={!!errors.role}
                helperText={errors.role?.message}
                required
              />
            )}
          />
        )}
      />
      {/* Project */}
      <Controller
        name="project"
        control={control}
        defaultValue={selectedUser?.project || ""}
        rules={{ required: t("projectRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={projects}
            onChange={(_, value) => {
              field.onChange(value);
              handleEditInputChange({
                target: { name: "project", value: value || "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("project")}
                fullWidth
                size="small"
                error={!!errors.project}
                helperText={errors.project?.message}
                required
              />
            )}
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
