import { useState, useEffect, useCallback } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginPage from "./app/auth/LoginPage";
import DashboardPage from "./app/public/dashboard/DashboardPage";
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";
import "./styles/App.scss";

const RouteGuard = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

interface AuthenticatedRoutesProps {
  currentLanguage: string;
}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({ currentLanguage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contentStyle = {
    marginLeft: isMobile ? "60px" : (isCollapsed ? "60px" : "240px"),
  };

  return (
    <div className="app-layout">
      <Header />
      <div className="app-content">
        <SideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          currentLanguage={currentLanguage}
          isMobile={isMobile}
        />
        <div 
          className="main-content" 
          style={contentStyle}
        >
          <div className="content-wrapper">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const { i18n } = useTranslation();

  const checkAuth = useCallback(() => {
    setIsAuthenticated(!!localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [checkAuth]);

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={checkAuth} />} />
        <Route
          path="/*"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <AuthenticatedRoutes currentLanguage={i18n.language} />
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;