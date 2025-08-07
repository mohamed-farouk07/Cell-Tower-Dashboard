import React from "react";
import { Box, TextField, IconButton, Typography, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@mui/icons-material/Remove";
import { Answer } from "../QuestionsPage";

interface RangeAnswerItemProps {
  answer: Answer;
  qIndex: number;
  aIndex: number;
  onUpdate: (updatedAnswer: Answer) => void;
  onRemove: () => void;
}

const RangeAnswerItem: React.FC<RangeAnswerItemProps> = ({ 
  answer, 
  onUpdate, 
  onRemove 
}) => {
  const { t } = useTranslation();

  // Unique value validation - would need to be implemented by checking against all answers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAnswerDuplicate = (value: string, field: keyof Answer) => {
    return false; // Placeholder - implement actual logic with context or props
  };

  const handleTextChange = (field: keyof Answer, value: string) => {
    onUpdate({ ...answer, [field]: value });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: 2,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", gridColumn: "1 / -1" }}>
        {t("rangeAnswer")}
      </Typography>

      <TextField
        label={t("answerText")}
        fullWidth
        size="small"
        value={answer.answerText}
        onChange={(e) => handleTextChange("answerText", e.target.value)}
        required
        error={isAnswerDuplicate(answer.answerText, "answerText")}
        helperText={
          isAnswerDuplicate(answer.answerText, "answerText")
            ? t("answerTextMustBeUnique")
            : ""
        }
        sx={{
          "& .MuiInputBase-root": { height: "30px" },
          "& .MuiFormLabel-root": { fontSize: "14px" },
        }}
      />
      <TextField
        label={t("answerValue")}
        fullWidth
        size="small"
        value={answer.answerValue}
        onChange={(e) => handleTextChange("answerValue", e.target.value)}
        required
        error={isAnswerDuplicate(answer.answerValue, "answerValue")}
        helperText={
          isAnswerDuplicate(answer.answerValue, "answerValue")
            ? t("answerValueMustBeUnique")
            : ""
        }
        sx={{
          "& .MuiInputBase-root": { height: "30px" },
          "& .MuiFormLabel-root": { fontSize: "14px" },
        }}
      />

      <Tooltip title={t("removeAnswers")} arrow>
        <IconButton
          onClick={onRemove}
          color="error"
          sx={{
            border: "1px solid #d32f2f",
            borderRadius: 1,
            padding: "4px",
            height: "30px",
            minWidth: "30px",
            "&:hover": { backgroundColor: "#ffebee" },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RangeAnswerItem;