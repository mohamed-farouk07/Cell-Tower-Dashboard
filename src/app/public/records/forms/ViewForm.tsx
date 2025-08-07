import { Box } from "@mui/material";
import { useState } from "react";
import { ViewFormProps } from "./types";
import RecordDetails from "./RecordDetails";
import QuestionForm from "./QuestionForm";

const ViewForm = ({ selectedRecord }: ViewFormProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  if (!selectedRecord) return null;

  const handleSave = () => {
    console.log("Answers saved:", selectedAnswers);
  };

  return (
    <Box sx={{ display: "flex", gap: 3, width: "100%", minWidth: "1450px", margin: "auto" }}>
      <RecordDetails record={selectedRecord} />
      <QuestionForm 
        onSave={handleSave} 
        selectedAnswers={selectedAnswers} 
        setSelectedAnswers={setSelectedAnswers} 
      />
    </Box>
  );
};

export default ViewForm;