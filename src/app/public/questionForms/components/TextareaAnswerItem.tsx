import React from "react";
import { Box, TextareaAutosize, IconButton, Typography, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@mui/icons-material/Remove";
import { Answer } from "../QuestionsPage";

interface TextareaAnswerItemProps {
  answer: Answer;
  onUpdate: (updatedAnswer: Answer) => void;
  onRemove: () => void;
}

const TextareaAnswerItem: React.FC<TextareaAnswerItemProps> = ({ answer, onUpdate, onRemove }) => {
  const { t } = useTranslation();

  const handleTextChange = (value: string) => {
    onUpdate({ ...answer, answerValue: value });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          {t("commentAnswer")}
        </Typography>

        <TextareaAutosize
          minRows={4}
          value={answer.answerValue}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={t("comment")}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
            resize: "vertical",
          }}
        />
      </Box>

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
            marginLeft: 2,
            "&:hover": { backgroundColor: "#ffebee" },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TextareaAnswerItem;