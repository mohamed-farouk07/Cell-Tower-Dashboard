import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTranslation } from "react-i18next";
import { Question } from "../../QuestionsPage";

interface QuestionHeaderProps {
  category: string;
  question: Question;
  qIndex: number;
  isFirstQuestionInCategory: boolean;
  formTypeOption: string;
  onAddQuestion: (category: string) => void;
  onRemove: (qIndex: number) => void;
  updateCategoryWeight: (value: string) => void;
  weightError: boolean;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  category,
  question,
  qIndex,
  isFirstQuestionInCategory,
  formTypeOption,
  onAddQuestion,
  onRemove,
  updateCategoryWeight,
  weightError,
}) => {
  const { t } = useTranslation();

  // Handle mouse event to prevent clicks from closing accordion
  const handleMouseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // Handle focus event
  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {category}
        </Typography>

        {/* Category Weight Field (Percentage only) */}
        {formTypeOption === "percentage" && (
          <TextField
            label={t("categoryWeight") + " (%)"}
            size="small"
            value={question.categoryWeight || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0 && value <= 100) {
                updateCategoryWeight(e.target.value);
              }
            }}
            onClick={handleMouseClick}
            onFocus={handleFocus}
            sx={{
              width: "120px",
              "& .MuiOutlinedInput-root": {
                borderColor: weightError ? "error.main" : undefined,
              },
            }}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
            }}
            error={weightError}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2 }} onClick={handleMouseClick}>
        {isFirstQuestionInCategory && (
          <Tooltip title={t("addQuestion")} arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onAddQuestion(category);
              }}
              color="primary"
              sx={{
                border: "1px solid #1976d2",
                borderRadius: 1,
                padding: "4px",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={t("removeQuestion")} arrow>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onRemove(qIndex);
            }}
            color="error"
            sx={{
              border: "1px solid #d32f2f",
              borderRadius: 1,
              padding: "4px",
              "&:hover": { backgroundColor: "#ffebee" },
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default QuestionHeader;