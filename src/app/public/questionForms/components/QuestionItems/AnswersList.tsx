import React, { useState, useEffect } from "react";
import { Box, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { Question, Answer } from "../../QuestionsPage";
import RangeAnswerItem from "../RangeAnswerItem";
import RadioAnswerItem from "../RadioAnswerItem";
import TextareaAnswerItem from "../TextareaAnswerItem";

interface AnswersListProps {
  question: Question;
  qIndex: number;
  onUpdate: (qIndex: number, updatedQuestion: Question) => void;
}

const AnswersList: React.FC<AnswersListProps> = ({
  question,
  qIndex,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const [isRangeAnswerDisabled, setIsRangeAnswerDisabled] = useState(false);
  const [isRadioAnswerDisabled, setIsRadioAnswerDisabled] = useState(false);
  const [isRadioAnswerAdded, setIsRadioAnswerAdded] = useState(false);

  // Check if there are any boolean answers
  const hasBooleanAnswer = question.answers.some(
    (answer) => answer.answerText === "Boolean"
  );
  // Check if there are any range answers
  const hasRangeAnswer = question.answers.some(
    (answer) =>
      answer.answerText !== "Boolean" && answer.answerText !== "Textarea"
  );

  // Update button disabled states when answers change
  useEffect(() => {
    if (question.answers.length === 0) {
      setIsRangeAnswerDisabled(false);
      setIsRadioAnswerDisabled(false);
      setIsRadioAnswerAdded(false);
      return;
    }

    setIsRangeAnswerDisabled(hasBooleanAnswer);
    setIsRadioAnswerDisabled(hasRangeAnswer);
  }, [question.answers, hasBooleanAnswer, hasRangeAnswer]);

  const addAnswer = () => {
    const updatedAnswers = [
      ...question.answers,
      { answerText: "", answerValue: "" },
    ];
    onUpdate(qIndex, { ...question, answers: updatedAnswers });
  };

  const addBooleanAnswer = () => {
    const updatedAnswers = [
      ...question.answers,
      {
        answerText: "Boolean",
        answerValue: "true",
        trueValue: "",
        falseValue: "",
      },
    ];
    onUpdate(qIndex, { ...question, answers: updatedAnswers });
    setIsRadioAnswerAdded(true);
  };

  const addTextareaAnswer = () => {
    const updatedAnswers = [
      ...question.answers,
      {
        answerText: "Textarea",
        answerValue: "",
      },
    ];
    onUpdate(qIndex, { ...question, answers: updatedAnswers });
  };

  const removeAnswer = (aIndex: number) => {
    const updatedAnswers = question.answers.filter(
      (_, index) => index !== aIndex
    );
    onUpdate(qIndex, { ...question, answers: updatedAnswers });
  };

  const updateAnswer = (aIndex: number, updatedAnswer: Answer) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[aIndex] = updatedAnswer;
    onUpdate(qIndex, { ...question, answers: updatedAnswers });
  };

  return (
    <>
      {/* Add Answer Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addAnswer}
          disabled={isRangeAnswerDisabled}
        >
          {t("addRangeAnswer")}
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addBooleanAnswer}
          disabled={isRadioAnswerDisabled || isRadioAnswerAdded}
        >
          {t("addRadioAnswer")}
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addTextareaAnswer}
        >
          {t("addCommentAnswer")}
        </Button>
      </Box>

      {/* Answers Display */}
      {question.answers.map((answer, aIndex) => (
        <Paper
          key={aIndex}
          elevation={3}
          sx={{ p: 3, my: 1, borderRadius: 1, width: "100%" }}
        >
          {answer.answerText === "Boolean" ? (
            <RadioAnswerItem
              answer={answer}
              onUpdate={(updatedAnswer) => updateAnswer(aIndex, updatedAnswer)}
              onRemove={() => removeAnswer(aIndex)}
            />
          ) : answer.answerText === "Textarea" ? (
            <TextareaAnswerItem
              answer={answer}
              onUpdate={(updatedAnswer) => updateAnswer(aIndex, updatedAnswer)}
              onRemove={() => removeAnswer(aIndex)}
            />
          ) : (
            <RangeAnswerItem
              answer={answer}
              qIndex={qIndex}
              aIndex={aIndex}
              onUpdate={(updatedAnswer) => updateAnswer(aIndex, updatedAnswer)}
              onRemove={() => removeAnswer(aIndex)}
            />
          )}
        </Paper>
      ))}
    </>
  );
};

export default AnswersList;