import React from "react";
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../styles/SideBar.scss";

const DashboardIcon = React.memo(() => <MdDashboard />);
const BarsIcon = React.memo(() => <FaBars />);

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  currentLanguage: string;
  isMobile: boolean;
}

const SideBar: React.FC<SideBarProps> = React.memo(
  ({ isCollapsed, setIsCollapsed, currentLanguage, isMobile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [activePath, setActivePath] = React.useState(location.pathname);

    React.useEffect(() => {
      setActivePath(location.pathname);
    }, [location.pathname]);

    const menuItems = React.useMemo(
      () => [
        { label: t("dashboard"), icon: <DashboardIcon />, path: "/dashboard" },
      ],
      [t, currentLanguage]
    );

    const handleNavigate = React.useCallback((path: string) => {
      navigate(path);
    }, [navigate]);

    const handleToggle = React.useCallback(() => {
      setIsCollapsed(!isCollapsed);
    }, [isCollapsed, setIsCollapsed]);

    const isActive = React.useCallback(
      (path: string) => activePath === path,
      [activePath]
    );

    // On mobile, sidebar is always collapsed and toggle is hidden
    const showToggle = !isMobile;
    const sidebarCollapsed = isMobile ? true : isCollapsed;

    return (
      <div
        className={`sidebar sidebar-background ${sidebarCollapsed ? "collapsed" : ""} ${
          currentLanguage === "ar" ? "rtl" : "ltr"
        }`}
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        <div className="sidebar-header">
          {!sidebarCollapsed && <span className="sidebar-title"></span>}
          {showToggle && (
            <div className="sidebar-toggle" onClick={handleToggle}>
              <BarsIcon />
            </div>
          )}
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => handleNavigate(item.path)}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="sidebar-label">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default SideBar;