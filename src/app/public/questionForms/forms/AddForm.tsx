import React, { useState } from "react";
import { Box, Snackbar, Alert, Button } from "@mui/material";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormData, Question } from "../QuestionsPage";
import CategorySelectionRow from "../components/CategorySelectionRow";
import QuestionItem from "../components/QuestionItem";
import MainDataSection from "../components/MainData";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

interface AddFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
}

const AddForm: React.FC<AddFormProps> = ({ errors, control, setValue }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [formTypeOption, setFormTypeOption] = useState<string>("percentage"); // Track form type
  const [runTour, setRunTour] = useState(false);
  const { t } = useTranslation();

  // Joyride steps configuration
  const steps: Step[] = [
    {
      target: ".form-name-field",
      content: t("formNameDesc"),
      title: t("formName"),
      disableBeacon: true,
    },
    {
      target: ".form-description-field",
      content: t("formDescriptionDesc"),
      title: t("formDescription"),
    },
    {
      target: ".approval-required-checkbox",
      content: t("approvalRequiredDesc"),
      title: t("approvalRequired"),
    },
    {
      target: ".agent-response-options",
      content: t("evaluationResponseDesc"),
      title: t("evaluationResponseOptions"),
    },
    {
      target: ".form-type-options",
      content: t("formTypeDesc"),
      title: t("formType"),
    },
    {
      target: ".scoring-band-range",
      content: t("scoringBandDesc"),
      title: t("scoringBandRange"),
    },
    {
      target: ".categories-autocomplete",
      content: t("categoriesDesc"),
      title: t("categories"),
    },
    {
      target: ".severities-autocomplete",
      content: t("severityLevelDesc"),
      title: t("severityLevel"),
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
    }
  };

  const addQuestion = (category: string) => {
    const newQuestion: Question = {
      question: `Question for ${category}`,
      answers: [{ answerText: "", answerValue: "" }],
      category,
      categoryWeight: formTypeOption === "percentage" ? "" : undefined,
      questionWeight: "",
    };
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
    setValue("questions", newQuestions);
  };

  const removeQuestion = (globalIndex: number) => {
    const newQuestions = questions.filter((_, index) => index !== globalIndex);
    setQuestions(newQuestions);
    setValue("questions", newQuestions);
  };

  const updateQuestion = (globalIndex: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[globalIndex] = updatedQuestion;
    setQuestions(updatedQuestions);
    setValue("questions", updatedQuestions);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);

    // Remove questions for categories that are no longer selected
    const newQuestions = questions.filter((question) =>
      categories.includes(question.category)
    );
    setQuestions(newQuestions);
    setValue("questions", newQuestions);

    // Add questions for newly selected categories
    categories.forEach((category) => {
      if (!questions.some((question) => question.category === category)) {
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
    const resetQuestions = questions.map((question) => ({
      ...question,
      categoryWeight:
        type === "percentage" ? question.categoryWeight || "" : undefined,
      questionWeight: "",
    }));
    setQuestions(resetQuestions);
    setValue("questions", resetQuestions);
  };
  

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#824389",
            zIndex: 1500,
          },
        }}
        locale={{
          back: t("back"),
          close: t("close"),
          last: t("finish"),
          next: t("next"),
          skip: t("skip"),
        }}
      />

      {/* Tour start button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          startIcon={<TipsAndUpdatesIcon />}
          color="primary"
          onClick={() => setRunTour(true)}
          size="small"
        >
          {t("startFormTour")}
        </Button>
      </Box>
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
              (question) => question.category === category
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

export default AddForm;
