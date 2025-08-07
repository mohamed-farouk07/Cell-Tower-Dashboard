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

interface DynamicModalProps extends Omit<ModalProps, "children"> {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  submitButtonText?: string;
  onSubmit?: (e: React.FormEvent) => void;
  modalWidth?: number | string;
  showSubmitButton?: boolean;
}

const AddModal: React.FC<DynamicModalProps> = ({
  open,
  onClose,
  title,
  children,
  submitButtonText = "Submit",
  onSubmit,
  modalWidth = 1200,
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
      aria-labelledby="dynamic-modal"
      aria-describedby="dynamic-modal-description"
      {...modalProps}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: modalWidth,
          maxWidth: "90vw", // Set max width based on the viewport
          maxHeight: "80vh", // Limit the height
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          overflowY: "auto", // Allow scrolling if content overflows
        }}
      >
        {/* Title and Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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

        {/* Modal Content */}
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {children}

            {/* Conditionally render submit button */}
            {showSubmitButton && (
              <Box sx={{ gridColumn: "1 / -1" }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1, fontWeight: "bold" }}
                >
                  {submitButtonText}
                </Button>
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
