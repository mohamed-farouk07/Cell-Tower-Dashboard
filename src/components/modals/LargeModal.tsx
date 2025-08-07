import React, { ReactNode } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  ModalProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface LargeModalProps extends Omit<ModalProps, "children"> {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  submitButtonText?: string;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const LargeModal: React.FC<LargeModalProps> = ({
  open,
  onClose,
  title,
  children,
  submitButtonText = "Submit",
  onSubmit,
  showSubmitButton = true,
  ...modalProps
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="large-modal"
      aria-describedby="large-modal-description"
      {...modalProps}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
          bgcolor: "background.paper",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title and Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: "1px solid #e0e0e0", // Add a border for separation
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "text.primary" }}
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1, // Take up remaining space
            overflowY: "auto", // Allow scrolling
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              {children}
            </Box>
          </form>
        </Box>

        {/* Submit Button at the Bottom */}
        {showSubmitButton && (
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #e0e0e0", // Add a border for separation
              backgroundColor: "background.paper",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1, fontWeight: "bold" }}
              onClick={handleSubmit} // Use onClick to handle form submission
            >
              {submitButtonText}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LargeModal;