import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PrivilegesMatrix, {
  PrivilegesMatrixRef,
} from "../../../components/ui/PrivilegesMatrix";

const ConfigurationsPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const privilegesMatrixRef = useRef<PrivilegesMatrixRef>(null);
  const roles = ["Admin", "Editor", "Viewer", "Manager"];

  const handleRoleChange = (value: string | null) => {
    setSelectedRole(value);
  };

  const handleSave = () => {
    console.log("Selected Role:", selectedRole);
    // Add logic to save privileges here
  };

  const handleCancel = () => {
    setSelectedRole(null);
    privilegesMatrixRef.current?.resetPrivileges();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("configurations")}
        </Typography>
      </Box>

      <Box sx={{ padding: 1.5, paddingTop: 0 }}>
        <Autocomplete
          options={roles}
          value={selectedRole}
          onChange={(_, value) => handleRoleChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("selectRole")}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "40px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PrivilegesMatrix ref={privilegesMatrixRef} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: 1.5,
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          {t("cancel")}
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {t("save")}
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurationsPage;
