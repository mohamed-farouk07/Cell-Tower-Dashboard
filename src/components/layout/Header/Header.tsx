import { FaSignOutAlt, FaUserCircle, FaGlobe } from "react-icons/fa";
import Loader from "../../ui/Loader";
import "../../../styles/Header.scss";
import { useHeader } from "../../../hooks/Components/useHeader";

const Header = () => {
  const {
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
  } = useHeader();

  return (
    <>
      <header className="app-header">
        <div className="toolbar">
          <div className="title-container">
            <h1 className="title">Cell Tower Dashboard</h1>
          </div>

          <div className="language-toggle">
            <button
              className="language-button"
              onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
              disabled={isLoggingOut}
            >
              <FaGlobe className="language-icon" />
              {i18n.language === "en" ? "عربي" : "English"}
            </button>
          </div>

          <div className="profile-menu">
            <div className="tooltip-container" title={t("profileMenu")}>
              <button 
                className="avatar-button" 
                onClick={handleMenuOpen}
                disabled={isLoggingOut}
              >
                <div className="avatar">
                  <FaUserCircle className="avatar-icon" />
                </div>
              </button>
            </div>
            {anchorEl && !isLoggingOut && (
              <div className="menu-container">
                <div className="menu">
                  <div className="menu-item" onClick={handleOpenDialog}>
                    <FaSignOutAlt className="logout-icon" />
                    {t("logout")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {openDialog && (
        <div className="dialog-overlay" onClick={handleCloseDialog}>
          <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-title">{t("confirmLogout")}</div>
            <div className="dialog-content">
              <p>{t("logoutDescription")}</p>
            </div>
            <div className="dialog-actions">
              <button 
                className="dialog-button" 
                onClick={handleCloseDialog}
                disabled={isLoggingOut}
              >
                {t("no")}
              </button>
              <button
                className="dialog-button confirm"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? t("loggingOut") : t("yesLogout")}
              </button>
            </div>
          </div>
        </div>
      )}

      <Loader 
        isLoading={isLoggingOut} 
        message={t("loggingOut") || "Logging out..."}
      />
    </>
  );
};

export default Header;