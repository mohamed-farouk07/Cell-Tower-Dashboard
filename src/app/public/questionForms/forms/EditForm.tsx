import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormData, Question, QuestionsData } from "../QuestionsPage";
import CategorySelectionRow from "../components/CategorySelectionRow";
import QuestionItem from "../components/QuestionItem";
import MainDataSection from "../components/MainData";

interface EditFormProps {
  selectedQuestion: QuestionsData | null;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const EditForm: React.FC<EditFormProps> = ({
  selectedQuestion,
  errors,
  control,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [formTypeOption, setFormTypeOption] = useState<string>("percentage");
  const { t } = useTranslation();

  // Initialize form with selected question data
  useEffect(() => {
    if (selectedQuestion) {
      setQuestions(selectedQuestion.questions);
      setSelectedCategories(selectedQuestion.categories);
      setSelectedSeverity(selectedQuestion.severites);
      setFormTypeOption(selectedQuestion.formTypeOption || "percentage");
    }
  }, [selectedQuestion]);

  const addQuestion = (category: string) => {
    const newQuestion: Question = {
      question: `Question for ${category}`,
      answers: [{ answerText: "", answerValue: "" }],
      category,
      categoryWeight: formTypeOption === "percentage" ? "" : undefined,
      questionWeight: ""
    };
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
  };

  const removeQuestion = (globalIndex: number) => {
    const newQuestions = questions.filter((_, index) => index !== globalIndex);
    setQuestions(newQuestions);
  };

  const updateQuestion = (globalIndex: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[globalIndex] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);

    // Remove questions for categories that are no longer selected
    const newQuestions = questions.filter(question =>
      categories.includes(question.category)
    );
    setQuestions(newQuestions);

    // Add questions for newly selected categories
    categories.forEach((category) => {
      if (!questions.some(question => question.category === category)) {
        addQuestion(category);
      }
    });
  };

  const handleSeverityChange = (severity: string) => {
    setSelectedSeverity(severity);
  };

  const handleFormTypeChange = (type: string) => {
    setFormTypeOption(type);
    // Reset weights when changing form type
    const resetQuestions = questions.map(question => ({
      ...question,
      categoryWeight: type === "percentage" ? question.categoryWeight || "" : undefined,
      questionWeight: ""
    }));
    setQuestions(resetQuestions);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {/* Main Data Section - Pass formTypeOption and handler */}
      <MainDataSection 
        control={control} 
        errors={errors}
        onFormTypeChange={handleFormTypeChange}
      />

      {/* Categories & Severities Row */}
      <CategorySelectionRow
        control={control}
        errors={errors}
        onCategoryChange={handleCategoryChange}
        onSeverityChange={handleSeverityChange}
      />

      {/* Question List */}
      {selectedCategories.length > 0 && selectedSeverity && (
        <>
          {selectedCategories.map((category) => {
            const categoryQuestions = questions.filter(
              question => question.category === category
            );
            
            return (
              <Box key={category} sx={{ mb: 3 }}>
                {categoryQuestions.map((question, categoryIndex) => {
                  // Find the global index of this question in the main questions array
                  const globalIndex = questions.findIndex(
                    (q) => q === question
                  );
                  
                  return (
                    <QuestionItem
                      key={globalIndex}
                      question={question}
                      category={category}
                      qIndex={categoryIndex} // Local index within this category
                      globalIndex={globalIndex} // Global index in the questions array
                      onRemove={removeQuestion}
                      onUpdate={updateQuestion}
                      onAddQuestion={addQuestion}
                      isFirstQuestionInCategory={categoryIndex === 0}
                      formTypeOption={formTypeOption}
                      allQuestions={questions} // Pass all questions for weight calculation
                    />
                  );
                })}
              </Box>
            );
          })}
        </>
      )}

      {/* Snackbar for Status Update */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          {t("statusUpdated")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditForm;