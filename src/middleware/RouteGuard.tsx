import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RouteGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted location for potential redirect after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;