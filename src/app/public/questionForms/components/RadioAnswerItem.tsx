import React from "react";
import { Box, TextField, IconButton, Typography, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@mui/icons-material/Remove";
import { Answer } from "../QuestionsPage";

interface RadioAnswerItemProps {
  answer: Answer;
  onUpdate: (updatedAnswer: Answer) => void;
  onRemove: () => void;
  isDisabled?: boolean; // Add this prop to control disabled state
}

const RadioAnswerItem: React.FC<RadioAnswerItemProps> = ({
  answer,
  onUpdate,
  onRemove,
  isDisabled, // Destructure the new prop
}) => {
  const { t } = useTranslation();

  const handleValueChange = (
    field: "trueValue" | "falseValue",
    value: string
  ) => {
    onUpdate({ ...answer, [field]: value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {t("radioAnswer")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label="True"
              fullWidth
              disabled
              size="small"
              value="True"
              slotProps={{
                input: { readOnly: true },
              }}
              sx={{
                "& .MuiInputBase-root": { height: "30px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
              }}
            />
            <TextField
              label="False"
              fullWidth
              disabled
              size="small"
              value="False"
              slotProps={{
                input: { readOnly: true },
              }}
              sx={{
                "& .MuiInputBase-root": { height: "30px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label={t("trueValue")}
              fullWidth
              size="small"
              value={answer.trueValue || ""}
              onChange={(e) => handleValueChange("trueValue", e.target.value)}
              disabled={isDisabled} // Disable when radio answer is added
              sx={{
                "& .MuiInputBase-root": { height: "30px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
                "& .Mui-disabled": { backgroundColor: "action.disabledBackground" },
              }}
            />
            <TextField
              label={t("falseValue")}
              fullWidth
              size="small"
              value={answer.falseValue || ""}
              onChange={(e) => handleValueChange("falseValue", e.target.value)}
              disabled={isDisabled} // Disable when radio answer is added
              sx={{
                "& .MuiInputBase-root": { height: "30px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
                "& .Mui-disabled": { backgroundColor: "action.disabledBackground" },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Tooltip title={isDisabled ? t("cannotRemoveDefaultAnswer") : t("removeAnswers")} arrow>
        <IconButton
          onClick={onRemove}
          color="error"
          disabled={isDisabled} // Disable remove button if needed
          sx={{
            border: "1px solid #d32f2f",
            borderRadius: 1,
            padding: "4px",
            height: "30px",
            minWidth: "30px",
            "&:hover": { backgroundColor: "#ffebee" },
            "&.Mui-disabled": {
              borderColor: "rgba(0, 0, 0, 0.26)",
            },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RadioAnswerItem;