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
interface SeverityData {
  id: number;
  severityNameEn: string;
  severityNameAr: string;
  active: boolean;
}

// Define interface for form data
interface FormData {
  severityNameEn: string;
  severityNameAr: string;
  status: string;
}

const defaultFormValues: FormData = {
  severityNameEn: "",
  severityNameAr: "",
  status: "select",
};

const SeverityPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityData | null>(
    null
  );
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

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
    const userToEdit = rows.find((user) => user.id === id);
    if (userToEdit) {
      setSelectedSeverity(userToEdit);
      resetEditForm({
        ...userToEdit,
        status: userToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedSeverity(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedSeverity(null);
    resetEditForm(defaultFormValues);
  };

  // Rest of the code (handleDelete, confirmDelete, columns, rows) remains the same
  const handleDelete = (id: number) => {
    setDeleteUserId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteUserId !== null) {
      console.log(`Delete severity with ID: ${deleteUserId}`);
      setOpenDeleteDialog(false);
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "severityNameEn", headerName: t("severityEn"), flex: 1 },
    { field: "severityNameAr", headerName: t("severityAr"), flex: 1 },
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

  const rows: SeverityData[] = [
    {
      id: 1,
      severityNameEn: "Critical",
      severityNameAr: "حرج",
      active: true,
    },
    {
      id: 2,
      severityNameEn: "High",
      severityNameAr: "عالي",
      active: true,
    },
    {
      id: 3,
      severityNameEn: "Medium",
      severityNameAr: "متوسط",
      active: true,
    },
    {
      id: 4,
      severityNameEn: "Low",
      severityNameAr: "منخفض",
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
          {t("severities")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addSeverity")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addSeverity")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("addSeverity")}
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
        title={t("editSeverity")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateSeverity")}
      >
        <EditForm
          selectedSeverity={selectedSeverity}
          handleEditInputChange={handleInputChange}
          errors={editFormErrors}
          control={editFormControl}
        />
      </EditModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteSeverity")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={t("severityDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default SeverityPage;
