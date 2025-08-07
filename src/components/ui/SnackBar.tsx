import React from "react";
import { Snackbar } from "@mui/material";

interface SnackbarComponentProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
};

export default SnackbarComponent;
