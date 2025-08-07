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
interface RoleData {
  id: number;
  roleNameEn: string;
  roleNameAr: string;
  description: string;
  active: boolean;
}

// Define interface for form data
interface FormData {
  roleNameEn: string;
  roleNameAr: string;
  description: string;
  status: string;
}

const defaultFormValues: FormData = {
  roleNameEn: "",
  roleNameAr: "",
  description: "",
  status: "select",
};

const RolesPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(
    null
  );
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<number | null>(null);

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
    const roleToEdit = rows.find((role) => role.id === id);
    if (roleToEdit) {
      setSelectedRole(roleToEdit);
      resetEditForm({
        ...roleToEdit,
        status: roleToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedRole(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedRole(null);
    resetEditForm(defaultFormValues);
  };

  // Rest of the code (handleDelete, confirmDelete, columns, rows) remains the same
  const handleDelete = (id: number) => {
    setDeleteRoleId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteRoleId !== null) {
      console.log(`Delete role with ID: ${deleteRoleId}`);
      setOpenDeleteDialog(false);
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "roleNameEn", headerName: t("roleEn"), flex: 1 },
    { field: "roleNameAr", headerName: t("roleAr"), flex: 1 },
    { field: "description", headerName: t("description"), flex: 1 },
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

  const rows: RoleData[] = [
    {
      id: 1,
      roleNameEn: "Project Manager",
      roleNameAr: "مدير المشروع",
      description:
        "Responsible for planning, execution, and delivery of the project. (الوصف: مسؤول عن التخطيط والتنفيذ وتسليم المشروع)",
      active: true,
    },
    {
      id: 2,
      roleNameEn: "Developer",
      roleNameAr: "مطور",
      description:
        "Writes and maintains code to meet project requirements. (الوصف: يكتب ويحافظ على الكود لتلبية متطلبات المشروع)",
      active: false,
    },
    {
      id: 3,
      roleNameEn: "Designer",
      roleNameAr: "مصمم",
      description:
        "Creates visual designs and user experiences for the project. (الوصف: يقوم بإنشاء التصاميم المرئية وتجربة المستخدم للمشروع)",
      active: true,
    },
    {
      id: 4,
      roleNameEn: "Quality Assurance",
      roleNameAr: "ضمان الجودة",
      description:
        "Ensures the project meets quality standards and performs testing. (الوصف: يضمن أن المشروع يفي بمعايير الجودة ويقوم بإجراء الاختبارات)",
      active: false,
    },
    {
      id: 5,
      roleNameEn: "Business Analyst",
      roleNameAr: "محلل الأعمال",
      description:
        "Analyzes business requirements and ensures alignment with project goals. (الوصف: يحلل متطلبات العمل ويضمن توافقها مع أهداف المشروع)",
      active: true,
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
          {t("roles")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addRole")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addRole")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("addRole")}
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
        title={t("editRole")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateRole")}
      >
        <EditForm
          selectedRole={selectedRole}
          handleEditInputChange={handleInputChange}
          errors={editFormErrors}
          control={editFormControl}
        />
      </EditModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteRole")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={t("roleDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default RolesPage;
