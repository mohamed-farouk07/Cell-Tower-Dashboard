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
import ViewModal from "../../../components/modals/ViewModal";
import ViewForm from "./forms/ViewForm";

// Define interface for user data
interface UserData {
  id: number;
  username: string;
  email: string;
  mobile: string;
  description: string;
  role: string;
  active: boolean;
  project: string;
}

// Define interface for form data
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  description: string;
  role: string;
  status: string;
  project: string;
}

const defaultFormValues: FormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  description: "",
  role: "",
  status: "select",
  project: "",
};

const UsersPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const roles = ["Admin", "Support", "Marketing", "IT"];
  const projects = ["Project A", "Project B", "Project C", "Project D"];

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

  const handleRoleChange = (value: string | null) => {
    setFormData({ ...formData, role: value || "" });
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
      setSelectedUser(userToEdit);
      resetEditForm({
        ...userToEdit,
        password: "",
        confirmPassword: "",
        status: userToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const handleView = (id: number) => {
    const userToView = rows.find((user) => user.id === id);
    if (userToView) {
      setSelectedUser(userToView);
      setOpenViewModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedUser(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedUser(null);
  };

  // Rest of the code (handleDelete, confirmDelete, columns, rows) remains the same
  const handleDelete = (id: number) => {
    setDeleteUserId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteUserId !== null) {
      console.log(`Delete user with ID: ${deleteUserId}`);
      setOpenDeleteDialog(false);
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "username", headerName: t("username"), flex: 1 },
    { field: "email", headerName: t("email"), flex: 1 },
    { field: "mobile", headerName: t("mobile"), flex: 1 },
    { field: "description", headerName: t("description"), flex: 1 },
    { field: "role", headerName: t("role"), flex: 1 },
    { field: "project", headerName: t("project"), flex: 1 },
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
          onView={handleView}
          showViewAction={true} // This will show the view action in the users page
        />
      ),
    },
  ];

  const rows: UserData[] = [
    {
      id: 1,
      username: "John Doe",
      email: "johndoe@example.com",
      mobile: "123-456-7890",
      description: "Team leader and developer",
      role: "Admin",
      active: true,
      project: "Project A",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "janesmith@example.com",
      mobile: "987-654-3210",
      description: "Handles customer support",
      role: "Support",
      active: false,
      project: "Project B",
    },
    {
      id: 3,
      username: "Alice Johnson",
      email: "alicejohnson@example.com",
      mobile: "456-789-1234",
      description: "Marketing and SEO specialist",
      role: "Marketing",
      active: true,
      project: "Project C",
    },
    {
      id: 4,
      username: "Bob Brown",
      email: "bobbrown@example.com",
      mobile: "321-654-9870",
      description: "Responsible for system maintenance",
      role: "IT",
      active: false,
      project: "Project D",
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
          {t("users")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addUser")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addUser")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("addUser")}
      >
        <AddForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleRoleChange={handleRoleChange}
          roles={roles}
          projects={projects}
          errors={addFormErrors}
          control={addFormControl}
        />
      </AddModal>

      <EditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        title={t("editUser")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateUser")}
      >
        <EditForm
          selectedUser={selectedUser}
          handleEditInputChange={handleInputChange}
          roles={roles}
          projects={projects}
          errors={editFormErrors}
          control={editFormControl}
        />
      </EditModal>

      <ViewModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        title={t("viewUser")}
      >
        <ViewForm selectedUser={selectedUser} />
      </ViewModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteUser")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={t("userDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default UsersPage;
