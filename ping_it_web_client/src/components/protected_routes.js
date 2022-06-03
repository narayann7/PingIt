import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Auth from "../services/auth";

function ProtectedRoutes() {
  const location = useLocation();
  const token = Auth.getRefreshToken();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export const Layout = () => {
  return <Outlet />;
};

export default ProtectedRoutes;
