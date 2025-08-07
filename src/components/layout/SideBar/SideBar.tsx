import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SpeedIcon from "@mui/icons-material/Speed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const SideBar = React.memo(({ isCollapsed, setIsCollapsed }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { label: t("users"), icon: <GroupIcon />, path: "/users" },
    { label: t("severities"), icon: <SpeedIcon />, path: "/severities" },
    { label: t("roles"), icon: <ManageAccountsIcon />, path: "/roles" },
    { label: t("projects"), icon: <DescriptionIcon />, path: "/projects" },
    { label: t("categories"), icon: <LayersIcon />, path: "/categories" },
    {
      label: t("configurations"),
      icon: <SettingsIcon />,
      path: "/configurations",
    },
    { label: t("records"), icon: <SupportAgentIcon />, path: "/records" },
    {
      label: t("evaluationForms"),
      icon: <DynamicFormIcon />,
      path: "/evaluation-form",
    },
  ];

  return (
    <Box
      className="sidebar-background"
      sx={{
        position: "fixed",
        top: "105px",
        left: 0,
        zIndex: 40,
        height: "calc(100vh - 105px)",
        width: isCollapsed ? "60px" : "240px",
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: activePath ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 1)",
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isCollapsed ? "center" : "flex-end",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MenuIcon sx={{ color: "#fff" }} />
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          mt: 0,
          overflowY: "auto",
          height: "100%",
          paddingTop: 2,
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ marginY: "10px" }}>
              <Tooltip title={isCollapsed ? item.label : ""} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    px: isCollapsed ? 2 : 3,
                    color: "#fff",
                    backgroundColor:
                      activePath === item.path
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#fff",
                      fontSize: "20px",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: { fontSize: "14px", fontWeight: "bold" },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
});

export default SideBar;
