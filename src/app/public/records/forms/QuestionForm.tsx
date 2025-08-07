import {
  Box,
  TextField,
  MenuItem,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { QuestionsData } from "../../questionForms/QuestionsPage";
import { QuestionFormProps } from "./types";
import { useAuth } from "../../../../context/AuthContext";
import { useState } from "react";
import EvaluationChart from "../../../../components/ui/EvaluationChart";

const questions: QuestionsData[] = [
  {
    id: 1,
    formName: "Employee Feedback Form",
    formDescription: "A form to collect feedback from employees.",
    approvalRequired: true,
    agentResponseOption: "allowAcknowledge",
    formTypeOption: "percentage",
    categories: ["IT", "HR"],
    severites: "Development",
    questions: [
      {
        question: "What is your experience with React?",
        answers: [
          { answerText: "I have 3 years of experience", answerValue: "3" },
          { answerText: "I have 5 years of experience", answerValue: "5" },
        ],
        category: "IT",
      },
      {
        question: "How do you rate your satisfaction with the tools provided?",
        answers: [
          { answerText: "Very satisfied", answerValue: "very_satisfied" },
          { answerText: "Satisfied", answerValue: "satisfied" },
          { answerText: "Neutral", answerValue: "neutral" },
          { answerText: "Dissatisfied", answerValue: "dissatisfied" },
        ],
        category: "IT",
      },
    ],
    active: true,
    evaluationScore: [80, 90],
  },
];

const QuestionForm = ({
  onSave,
  selectedAnswers,
  setSelectedAnswers,
}: QuestionFormProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionsData | null>(null);

  const isSupervisor = user?.roles?.includes("supervisor");

  const handleQuestionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questionId = event.target.value;
    const question = questions.find((q) => q.id === Number(questionId));
    setSelectedQuestion(question || null);
  };

  const handleAnswerChange = (questionIndex: number, answerValue: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerValue,
    }));
  };

  if (isSupervisor) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          p: 3,
          borderRadius: 2,
          bgcolor: "#f9f9f9",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {t("noQuestionPermission")}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        height: "calc(120vh - 120px)",
        overflow: "hidden",
      }}
    >
      {/* Save Answer button first */}
      {selectedQuestion && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave(selectedAnswers)}
          sx={{ alignSelf: "flex-start", mb: 1 }}
        >
          {t("saveAnswer")}
        </Button>
      )}

      {/* Select Dropdown after button */}
      <TextField
        select
        label={t("selectForm")}
        value={selectedQuestion?.id || ""}
        onChange={handleQuestionSelect}
        size="small"
        sx={{ minWidth: 200 }}
        variant="outlined"
      >
        {questions.map((question) => (
          <MenuItem key={question.id} value={question.id}>
            {question.formName}
          </MenuItem>
        ))}
      </TextField>

      {/* Scrollable question section */}
      {selectedQuestion && (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 3,
                "&:last-child": { paddingBottom: 3 },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {selectedQuestion.formName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedQuestion.formDescription}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                <strong>{t("category")}:</strong>{" "}
                {selectedQuestion.categories.join(", ")}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                <strong>{t("severity")}:</strong> {selectedQuestion.severites}
              </Typography>
              {selectedQuestion.questions.map((q, index) => (
                <Box key={index} sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {`${index + 1}. ${q.question}`}
                  </Typography>
                  <RadioGroup
                    value={selectedAnswers[index] || ""}
                    onChange={(event) =>
                      handleAnswerChange(index, event.target.value)
                    }
                  >
                    {q.answers.map((answer, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={answer.answerValue}
                        control={<Radio />}
                        label={answer.answerText}
                        sx={{ ml: 1 }}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}

              {selectedQuestion?.evaluationScore && (
                <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    {t("evaluationScore")}
                  </Typography>
                  <EvaluationChart scores={selectedQuestion.evaluationScore} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default QuestionForm;
