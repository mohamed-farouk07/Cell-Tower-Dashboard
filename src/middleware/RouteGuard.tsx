import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  children: ReactNode;
  isAuthenticated: boolean; // or any condition to protect the route
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
