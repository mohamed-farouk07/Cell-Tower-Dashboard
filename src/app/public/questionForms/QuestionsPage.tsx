import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ActionsMenu from "../../../components/ui/ActionsMenu";
import Table from "../../../components/ui/Table";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";
import SnackbarComponent from "../../../components/ui/SnackBar";
import DeleteDialog from "../../../components/ui/DeleteDialog";
import LargeModal from "../../../components/modals/LargeModal";

// Shared interfaces
export interface Answer {
  answerText: string;
  answerValue: string;
  trueValue?: string;
  falseValue?: string;
}

export interface Question {
  question: string;
  answers: Answer[];
  category: string; // Add this field
  categoryWeight?: string;  // For percentage type
  questionWeight?: string;  // For both percentage and points types
}

export interface QuestionsData {
  id: number;
  formName: string;
  formDescription: string;
  approvalRequired: boolean;
  agentResponseOption: string;
  formTypeOption?: string;
  categories: string[];
  severites: string;
  questions: Question[];
  active: boolean;
  evaluationScore: number[];
}

export interface FormData {
  formName: string;
  formDescription: string;
  approvalRequired: boolean;
  agentResponseOption: string;
  formTypeOption: string;
  categories: string[];
  severites: string;
  questions: Question[];
  status?: string;
  evaluationScore: number[];
}

const defaultFormValues: FormData = {
  formName: "",
  formDescription: "",
  approvalRequired: false,
  agentResponseOption: "noResponse",
  formTypeOption: "percentage",
  categories: [],
  severites: "",
  questions: [],
  status: "select",
  evaluationScore: [0, 0],
};

const QuestionsPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionsData | null>(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for snackbar message
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);

  const {
    control: addFormControl,
    handleSubmit: handleAddSubmit,
    formState: { errors: addFormErrors },
    reset: resetAddForm,
    setValue: setAddFormValue,
  } = useForm<FormData>({
    defaultValues: defaultFormValues,
  });

  const {
    control: editFormControl,
    handleSubmit: handleEditSubmit,
    formState: { errors: editFormErrors },
    reset: resetEditForm,
  } = useForm<FormData>({
    defaultValues: defaultFormValues,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onAddSubmit = (data: FormData) => {
    console.log("Add Form Data:", data);
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleEdit = (id: number) => {
    const questionToEdit = rows.find((question) => question.id === id);
    if (questionToEdit) {
      setSelectedQuestion(questionToEdit);
      resetEditForm({
        ...questionToEdit,
        status: questionToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedQuestion(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedQuestion(null);
    resetEditForm(defaultFormValues);
  };

  const handleDelete = (id: number) => {
    setDeleteQuestionId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteQuestionId !== null) {
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== deleteQuestionId)
      );
      setOpenDeleteDialog(false);
      setSnackbarMessage(t("questionDeleted"));
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const [rows, setRows] = useState<QuestionsData[]>([
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
            {
              answerText: "I have 3 years of experience",
              answerValue: "3",
            },
          ],
          category: "IT",
          categoryWeight: "100", // Dummy data for category weight
          questionWeight: "50", // Dummy data for question weight
        },
        {
          question: "How do you handle stress at work?",
          answers: [
            {
              answerText: "I manage it well",
              answerValue: "good",
            },
          ],
          category: "HR",
          categoryWeight: "60", // Dummy data for category weight
          questionWeight: "15", // Dummy data for question weight
        },
        {
          question: "What is your experience with project management?",
          answers: [
            {
              answerText: "I have 5 years of experience",
              answerValue: "5",
            },
          ],
          category: "HR",
          categoryWeight: "40", // Dummy data for category weight
          questionWeight: "10", // Dummy data for question weight
        },
      ],
      active: true,
      evaluationScore: [80, 90],
    },
  ]);  

  // Add a handler for the Copy/Clone action
  const handleCopy = (id: number) => {
    const questionToCopy = rows.find((question) => question.id === id);
    if (questionToCopy) {
      const copiedQuestion = {
        ...questionToCopy,
        id: rows.length + 1, // Generate a new ID for the copied record
        formName: questionToCopy.formName, // Remove the "(Copy)" append
      };
      // Update the state with the new copied record
      setRows((prevRows) => [...prevRows, copiedQuestion]);
      console.log("Copied Question:", copiedQuestion);
      setSnackbarMessage(t("questionCopied")); // Set copy success message
      setOpenSnackbar(true);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "categories", headerName: t("categories"), flex: 1 },
    { field: "severites", headerName: t("severites"), flex: 1 },
    {
      field: "questionsCount",
      headerName: t("questionsCount"),
      width: 130,
      renderCell: (params) => params.row.questions.length,
    },
    {
      field: "actions",
      headerName: t("actions"),
      width: 120,
      renderCell: (params) => (
        <ActionsMenu
          id={params.row.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {t("questions")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addQuestions")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <LargeModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addForm")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("submit")}
      >
        <Box sx={{ gridColumn: "1 / -1" }}>
          <AddForm
            formData={{
              formName: "", // New field
              formDescription: "", // New field
              approvalRequired: false, // New field
              agentResponseOption: "noResponse", // New field
              formTypeOption: "percentage", // New field
              categories: [],
              severites: "",
              questions: [],
              evaluationScore: [0, 0], // Updated field
            }}
            handleInputChange={handleInputChange}
            errors={addFormErrors}
            control={addFormControl}
            setValue={setAddFormValue}
          />
        </Box>
      </LargeModal>

      <LargeModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        title={t("editForm")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateQuestion")}
      >
        <Box sx={{ gridColumn: "1 / -1" }}>
          <EditForm
            selectedQuestion={selectedQuestion}
            handleEditInputChange={handleInputChange}
            errors={editFormErrors}
            control={editFormControl}
          />
        </Box>
      </LargeModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteQuestion")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={snackbarMessage} // Use the dynamic message
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default QuestionsPage;
