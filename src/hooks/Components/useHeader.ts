import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useHeader = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Language and direction handling
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Dialog handling
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = (e: React.MouseEvent) => {
    if (isLoggingOut) return;
    if (e.currentTarget === e.target || e.currentTarget.classList.contains("dialog-button")) {
      setOpenDialog(false);
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setOpenDialog(false);
  };

  // Menu handling
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Click outside menu handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorEl && !(event.target as Element).closest(".profile-menu")) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return {
    t,
    i18n,
    openDialog,
    isLoggingOut,
    anchorEl,
    changeLanguage,
    handleMenuOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmLogout
  };
};