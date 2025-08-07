import { Box, Typography, Paper, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UserData {
  username: string;
  email: string;
  mobile: string;
  description: string;
  role: string;
  active: boolean;
  project: string;
}

interface ViewFormProps {
  selectedUser: UserData | null;
}

const ViewForm = ({ selectedUser }: ViewFormProps) => {
  const { t } = useTranslation();

  if (!selectedUser) return null;

  const fields = [
    { label: "username", value: selectedUser.username },
    { label: "email", value: selectedUser.email },
    { label: "mobile", value: selectedUser.mobile },
    { label: "description", value: selectedUser.description },
    { label: "role", value: selectedUser.role },
    { label: "project", value: selectedUser.project },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2, // Alternative spacing method
      }}
    >
      {/* User Info Fields */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {fields.map((field) => (
          <Box key={field.label} sx={{ width: { xs: "100%", sm: "48%" } }}>
            <Typography variant="subtitle2" color="textSecondary">
              {t(field.label)}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {field.value || "-"}
            </Typography>
          </Box>
        ))}

        {/* Status Badge */}
        <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
          <Typography variant="subtitle2" color="textSecondary">
            {t("status")}
          </Typography>
          <Chip
            label={selectedUser.active ? t("active") : t("suspend")}
            sx={{
              bgcolor: selectedUser.active ? "success.main" : "error.main",
              color: "#fff",
              fontWeight: 500,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ViewForm;
