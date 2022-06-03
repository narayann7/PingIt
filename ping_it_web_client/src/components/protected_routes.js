import React from "react";
import { Route, Navigate, useLocation,Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RootContext } from "../context_api/root_context";

function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useContext(RootContext);
  console.log("pto", isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Redirect to="/test" />;
  // }

  return children;
}

export default ProtectedRoutes;
