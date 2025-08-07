import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteGuard from "./middleware/RouteGuard";
import LoginPage from "./app/auth/LoginPage";
import UsersPage from "./app/public/users/UsersPage";
import SeveritiesPage from "./app/public/severities/SeveritiesPage";
import RolesPage from "./app/public/roles/RolesPage";
import ProjectsPage from "./app/public/projects/ProjectsPage";
import ConfigurationsPage from "./app/public/configurations/configurationsPage";
import CategoriesPage from "./app/public/categories/CategoriesPage";
import RecordsPage from "./app/public/records/RecordsPage";
import DynamicFormPage from "./app/public/evaluationForms/FormsPage";
import QuestionsFormPage from "./app/public/questionForms/QuestionsPage";
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    // Check authentication status on mount and when localStorage changes
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    };

    checkAuth();

    // Listen for storage changes (in case of logout from another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const { i18n } = useTranslation();

  useEffect(() => {
    // Set the direction based on the current language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <AuthenticatedRoutes />
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
};

const AuthenticatedRoutes = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Memoize the setIsCollapsed function to ensure it's stable
  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Header */}
      <Header />

      {/* Main Content Area (Sidebar + Page Content) */}
      <Box display="flex" flex={1} overflow="hidden">
        {/* Sidebar */}
        <SideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={handleToggleCollapse}
        />

        {/* Page Content */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          sx={{
            marginLeft: isCollapsed ? "60px" : "240px",
            transition: "margin-left 0.3s ease",
          }}
          overflow="auto"
        >
          <Box flex={1} p={2}>
            <Routes>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/severities" element={<SeveritiesPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/configurations" element={<ConfigurationsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/evaluation-form" element={<DynamicFormPage />} />
              <Route path="/questions-form" element={<QuestionsFormPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;