import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import RootContext from "../context_api/root_context";

function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useContext(RootContext);
  console.log(isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoutes;
