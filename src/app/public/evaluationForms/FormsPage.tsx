import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../../components/ui/Table";
import SnackbarComponent from "../../../components/ui/SnackBar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface FormsData {
  id: number;
  formNameEn: string;
  formNameAr: string;
  active: boolean;
}

const FormsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 100 },
    { field: "formNameEn", headerName: t("formEn"), flex: 1 },
    { field: "formNameAr", headerName: t("formAr"), flex: 1 },
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
    // {
    //   field: "actions",
    //   headerName: t("actions"),
    //   width: 120,
    // },
  ];

  const rows: FormsData[] = [
    {
      id: 1,
      formNameEn: "Project Proposal Form",
      formNameAr: "نموذج اقتراح المشروع",
      active: true,
    },
    {
      id: 2,
      formNameEn: "Employee Onboarding Form",
      formNameAr: "نموذج تسجيل الموظف",
      active: false,
    },
    {
      id: 3,
      formNameEn: "Leave Request Form",
      formNameAr: "نموذج طلب إجازة",
      active: true,
    },
    {
      id: 4,
      formNameEn: "Expense Reimbursement Form",
      formNameAr: "نموذج استرداد المصروفات",
      active: false,
    },
    {
      id: 5,
      formNameEn: "Performance Evaluation Form",
      formNameAr: "نموذج تقييم الأداء",
      active: true,
    },
  ];

  // Handle navigation
  const handleNavigateToQuestionsPage = () => {
    navigate("../questions-form"); // Navigate to questions-form
  };

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
          {t("evaluationForms")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={handleNavigateToQuestionsPage} // Add click handler
        >
          {t("addForm")}
        </Button>
      </Box>

      <Table rows={rows} columns={columns} />

      <SnackbarComponent
        open={openSnackbar}
        message={t("roleDeleted")}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default FormsPage;
