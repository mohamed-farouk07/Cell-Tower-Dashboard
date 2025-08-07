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
interface CategoryData {
  id: number;
  categoryNameEn: string;
  categoryNameAr: string;
  active: boolean;
}

// Define interface for form data
interface FormData {
  categoryNameEn: string;
  categoryNameAr: string;
  status: string;
}

const defaultFormValues: FormData = {
  categoryNameEn: "",
  categoryNameAr: "",
  status: "select",
};

const CategoriesPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

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
    const categoryToEdit = rows.find((category) => category.id === id);
    if (categoryToEdit) {
      setSelectedCategory(categoryToEdit);
      resetEditForm({
        ...categoryToEdit,
        status: categoryToEdit.active ? "active" : "suspend",
      });
      setOpenEditModal(true);
    }
  };

  const onEditSubmit = (data: FormData) => {
    console.log("Edit Form Data:", data);
    setOpenEditModal(false);
    setSelectedCategory(null);
    resetEditForm(defaultFormValues);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    resetAddForm(defaultFormValues);
    setFormData(defaultFormValues);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCategory(null);
    resetEditForm(defaultFormValues);
  };

  // Rest of the code (handleDelete, confirmDelete, columns, rows) remains the same
  const handleDelete = (id: number) => {
    setDeleteCategoryId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteCategoryId !== null) {
      console.log(`Delete category with ID: ${deleteCategoryId}`);
      setOpenDeleteDialog(false);
      setOpenSnackbar(true);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "categoryNameEn", headerName: t("categoryEn"), width: 350 },
    { field: "categoryNameAr", headerName: t("categoryAr"),  width: 350 },
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

  const rows: CategoryData[] = [
    {
      id: 1,
      categoryNameEn: "Digital Marketing",
      categoryNameAr: "التسويق الرقمي",
      active: true,
    },
    {
      id: 2,
      categoryNameEn: "Cloud Infrastructure",
      categoryNameAr: "البنية التحتية السحابية",
      active: true,
    },
    {
      id: 3,
      categoryNameEn: "AI and Machine Learning",
      categoryNameAr: "الذكاء الاصطناعي والتعلم الآلي",
      active: false,
    },
    {
      id: 4,
      categoryNameEn: "Cybersecurity Solutions",
      categoryNameAr: "حلول الأمن السيبراني",
      active: true,
    },
    {
      id: 5,
      categoryNameEn: "UI/UX Design",
      categoryNameAr: "تصميم واجهة المستخدم وتجربة المستخدم",
      active: false,
    },
    {
      id: 6,
      categoryNameEn: "Content Management Systems",
      categoryNameAr: "أنظمة إدارة المحتوى",
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
          {t("categories")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setOpenAddModal(true)}
        >
          {t("addCategory")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <AddModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        title={t("addCategory")}
        onSubmit={handleAddSubmit(onAddSubmit)}
        submitButtonText={t("addCategory")}
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
        title={t("editCategory")}
        onSubmit={handleEditSubmit(onEditSubmit)}
        submitButtonText={t("updateCategory")}
      >
        <EditForm
          selectedCategory={selectedCategory}
          handleEditInputChange={handleInputChange}
          errors={editFormErrors}
          control={editFormControl}
        />
      </EditModal>

      <DeleteDialog
        open={openDeleteDialog}
        message={t("areYouSureDeleteCategory")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SnackbarComponent
        open={openSnackbar}
        message={t("categoryDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default CategoriesPage;
