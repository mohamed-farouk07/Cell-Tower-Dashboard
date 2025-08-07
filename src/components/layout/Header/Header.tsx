import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutApi, updateTokenApi } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";

const Header = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = async () => {
    try {
      await updateTokenApi();
      const pkid = localStorage.getItem("pkid");
      if (pkid) {
        await logoutApi(pkid);
        navigate("/");
      } else {
        throw new Error("User not logged in.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setOpenDialog(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>  

          {/* Centered Typography */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>
              {t("welcome")}
            </Typography>
          </Box>

          {/* Language Toggle Button */}
          <Box sx={{ marginX: 2 }}>
            <Button
              variant="text"
              onClick={() =>
                changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
              startIcon={<LanguageIcon />}
              sx={{
                color: "primary",
                textTransform: "none",
              }}
            >
              {i18n.language === "en" ? "عربي" : "English"}
            </Button>
          </Box>

          {/* Profile Menu with Tooltip */}
          <Box>
            <Tooltip title={t("profileMenu")} arrow>
              <IconButton onClick={handleMenuOpen}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleOpenDialog}>
                <LogoutIcon sx={{ marginRight: 1, color: "error.main" }} />
                {t("logout")}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {t("confirmLogout")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            {t("logoutDescription")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t("no")}
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus>
            {t("yesLogout")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
