import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import ActionsMenu from "../../../components/ui/ActionsMenu";
import Table from "../../../components/ui/Table";
import AddModal from "../../../components/modals/AddModal";
import EditModal from "../../../components/modals/EditModal";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";
import { useForm } from "react-hook-form";
import SnackbarComponent from "../../../components/ui/SnackBar";
import DeleteDialog from "../../../components/ui/DeleteDialog";
import { useTranslation } from "react-i18next";

// Define interface for user data
interface ProjectData {
  id: number;
  projectNameEn: string;
  projectNameAr: string;
  active: boolean;
}

// Define interface for form data
interface FormData {
  projectNameEn: string;
  projectNameAr: string;
  status: string;
}

const defaultFormValues: FormData = {
  projectNameEn: "",
  projectNameAr: "",
  status: "select",
};

const ProjectsPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);

  const {
    control: addFormControl,
    handleSubmit: handleAddSubmit,
    formState: { errors: addFormErrors },
    reset: resetAddForm,
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
    const projectToEdit = rows.find((project) => project.id === id);
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      resetEditForm({
        ...projectToEdit,
        status: projectToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedProject(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedProject(null);
    resetEditForm(defaultFormValues);
  };

  // Rest of the code (handleDelete, confirmDelete, columns, rows) remains the same
  const handleDelete = (id: number) => {
    setDeleteProjectId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteProjectId !== null) {
      console.log(`Delete project with ID: ${deleteProjectId}`);
      setOpenDeleteDialog(false);
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "projectNameEn", headerName: t("projectEn"), flex: 1 },
    { field: "projectNameAr", headerName: t("projectAr"), flex: 1 },
    {
      field: "active",
      headerName: t("active"),
      width: 120,
      renderCell: (params) => {
        return params.value ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            {t("active")}
          </span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {t("suspend")}
          </span>
        );
      },
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
        />
      ),
    },
  ];

  const rows: ProjectData[] = [
    {
      id: 1,
      projectNameEn: "Website Redesign",
      projectNameAr: "إعادة تصميم الموقع",
      active: true,
    },
    {
      id: 2,
      projectNameEn: "Mobile App Development",
      projectNameAr: "تطوير تطبيق الجوال",
      active: true,
    },
    {
      id: 3,
      projectNameEn: "E-commerce Platform",
      projectNameAr: "منصة التجارة الإلكترونية",
      active: true,
    },
    {
      id: 4,
      projectNameEn: "Internal System Upgrade",
      projectNameAr: "ترقية النظام الداخلي",
      active: false,
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
          {t("projects")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addProject")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addProject")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("addProject")}
      >
        <AddForm
          formData={formData}
          handleInputChange={handleInputChange}
          errors={addFormErrors}
          control={addFormControl}
        />
      </AddModal>

      <EditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        title={t("editProject")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateProject")}
      >
        <EditForm
          selectedProject={selectedProject}
          handleEditInputChange={handleInputChange}
          errors={editFormErrors}
          control={editFormControl}
        />
      </EditModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteProject")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={t("projectDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default ProjectsPage;
