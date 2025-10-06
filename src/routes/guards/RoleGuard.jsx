// src/routes/guards/RoleGuard.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ user, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  const isAllowed = allowedRoles.includes(user.role?.name);

  if (!isAllowed) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RoleGuard;
