
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  cancelColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  title,
  message,
  confirmText,
  cancelText,
  confirmColor = "primary",
  cancelColor = "error",
}) => {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onClose(true);
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title || t("confirmation")}</DialogTitle>
      <DialogContent>
        {message || t("areYouSure")}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          sx={{ color: `${cancelColor}.main` }}
        >
          {cancelText || t("no")}
        </Button>
        <Button onClick={handleConfirm} color={confirmColor}>
          {confirmText || t("yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;