import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../auth/useAuth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;
