import React from "react";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Question } from "../../QuestionsPage";

interface QuestionDetailsProps {
  question: Question;
  formTypeOption: string;
  updateQuestionText: (value: string) => void;
  updateQuestionWeight: (value: string) => void;
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({
  question,
  formTypeOption,
  updateQuestionText,
  updateQuestionWeight,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        label={t("question")}
        fullWidth
        size="small"
        value={question.question}
        onChange={(e) => updateQuestionText(e.target.value)}
        required
      />

      {/* Question Weight Field (Percentage or Points) */}
      {(formTypeOption === "percentage" || formTypeOption === "points") && (
        <TextField
          label={
            formTypeOption === "percentage" ? t("questionWeight") + " (%)" : t("points")
          }
          size="small"
          value={question.questionWeight || ""}
          onChange={(e) => updateQuestionWeight(e.target.value)}
          sx={{ width: "100px" }}
          type="number"
          inputProps={{
            min: 0,
            max: formTypeOption === "percentage" ? 100 : undefined,
          }}
        />
      )}
    </Box>
  );
};

export default QuestionDetails;