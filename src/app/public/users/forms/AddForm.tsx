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
import { Controller, Control, FieldErrors, useWatch } from "react-hook-form";
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

interface AddFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (value: string | null) => void;
  roles: string[];
  projects: string[];
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const AddForm: React.FC<AddFormProps> = ({
  formData,
  handleInputChange,
  handleRoleChange,
  roles,
  projects,
  errors,
  control,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(formData.status);
  const { t } = useTranslation();

  // Use `useWatch` to get the current value of the `password` field
  const passwordValue = useWatch({
    control,
    name: "password",
  });

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
      ? t("areYouSureActivateUser")
      : t("areYouSureSuspendUser");
  };

  return (
    <>
      {/* Username */}
      <Controller
        name="username"
        control={control}
        defaultValue={formData.username}
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
        defaultValue={formData.email}
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

      {/* Password */}
      <Controller
        name="password"
        control={control}
        defaultValue={formData.password}
        rules={{
          required: t("passwordRequired"),
          minLength: {
            value: 6,
            message: t("passwordMustBe"),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("password")}
            type="password"
            fullWidth
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue={formData.confirmPassword}
        rules={{
          required: t("confirmPasswordRequired"),
          validate: (value) =>
            value === passwordValue || t("passwordsDoNotMatch"), // Compare with the current password value
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("confirmPassword")}
            type="password"
            fullWidth
            size="small"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            required
          />
        )}
      />

      {/* Mobile */}
      <Controller
        name="mobile"
        control={control}
        defaultValue={formData.mobile}
        rules={{
          required: t("mobileRequired"), // Validation: Required
          pattern: {
            value: /^[0-9]+$/, // Accepts only numbers
            message: t("mobileInvalid"), // Validation message for invalid format
          },
          minLength: {
            value: 11, // Minimum length
            message: t("mobileTooShort"), // Validation message for too short
          },
          maxLength: {
            value: 15, // Maximum length
            message: t("mobileTooLong"), // Validation message for too long
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("mobile")}
            fullWidth
            type="number"
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
        defaultValue={formData.description}
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
        defaultValue={formData.role}
        rules={{ required: t("roleRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={roles}
            onChange={(_, value) => {
              field.onChange(value);
              handleRoleChange(value);
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
        defaultValue={formData.project}
        rules={{ required: t("projectRequired") }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={projects}
            onChange={(_, value) => {
              field.onChange(value);
              handleInputChange({
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
