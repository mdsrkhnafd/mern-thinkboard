import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};
