import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Question } from "../QuestionsPage";
import QuestionHeader from "./QuestionItems/QuestionHeader";
import QuestionDetails from "./QuestionItems/QuestionDetails";
import AnswersList from "./QuestionItems/AnswersList";
import { useTranslation } from "react-i18next";

interface QuestionItemProps {
  question: Question;
  category: string;
  qIndex: number; // This is the index within the filtered category questions
  globalIndex: number; // This is the actual index in the overall questions array
  onRemove: (globalIndex: number) => void;
  onUpdate: (globalIndex: number, updatedQuestion: Question) => void;
  onAddQuestion: (category: string) => void;
  isFirstQuestionInCategory: boolean;
  formTypeOption: string;
  allQuestions?: Question[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  category,
  qIndex,
  globalIndex, // Use this for updates instead of qIndex
  onRemove,
  onUpdate,
  onAddQuestion,
  isFirstQuestionInCategory,
  formTypeOption,
  allQuestions = [],
}) => {
  const [expanded, setExpanded] = useState(true);
  const [weightError, setWeightError] = useState<string | null>(null);
  const { t } = useTranslation();
  // Calculate total category weight
  const calculateCategoryTotal = (currentValue: string): number => {
    if (formTypeOption !== "percentage") return 0;

    const newValue = parseFloat(currentValue) || 0;
    let total = 0;

    // Sum weights for all questions with the same category, excluding this question
    allQuestions.forEach((q, index) => {
      if (q.category === category && index !== globalIndex) {
        const weight = parseFloat(q.categoryWeight || "0");
        if (!isNaN(weight)) {
          total += weight;
        }
      }
    });

    return total + newValue;
  };

  const updateCategoryWeight = (value: string) => {
    // Parse the input value
    const numValue = parseFloat(value) || 0;
    const total = calculateCategoryTotal(numValue.toString());

    if (total > 100) {
      setWeightError(
        t("weightExceedError", {
          category,
          total,
        })
      );
    } else {
      setWeightError(null);
    }

    // Create a completely new question object with the updated category weight
    const updatedQuestion = {
      ...question,
      categoryWeight: value,
    };

    // Use the globalIndex for updating the question in the overall array
    onUpdate(globalIndex, updatedQuestion);
  };

  const updateQuestionText = (value: string) => {
    const updatedQuestion = {
      ...question,
      question: value,
    };
    onUpdate(globalIndex, updatedQuestion);
  };

  const updateQuestionWeight = (value: string) => {
    const updatedQuestion = {
      ...question,
      questionWeight: value,
    };
    onUpdate(globalIndex, updatedQuestion);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      sx={{ boxShadow: 3 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="question-content"
        id={`question-header-${globalIndex}`}
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper": {
            marginLeft: "auto",
            marginX: 2,
            border: "1px solid #999900",
            borderRadius: 1,
          },
        }}
      >
        <QuestionHeader
          category={category}
          question={question}
          qIndex={qIndex}
          onAddQuestion={onAddQuestion}
          onRemove={() => onRemove(globalIndex)}
          updateCategoryWeight={updateCategoryWeight}
          isFirstQuestionInCategory={isFirstQuestionInCategory}
          formTypeOption={formTypeOption}
          weightError={!!weightError}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Display weight error if exists */}
          {weightError && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {weightError}
            </Alert>
          )}

          {/* Question Details Section */}
          <QuestionDetails
            question={question}
            formTypeOption={formTypeOption}
            updateQuestionText={updateQuestionText}
            updateQuestionWeight={updateQuestionWeight}
          />

          {/* Answers Section */}
          <AnswersList
            question={question}
            qIndex={globalIndex}
            onUpdate={onUpdate}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionItem;
