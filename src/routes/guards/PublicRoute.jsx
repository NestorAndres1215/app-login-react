import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si ya hay usuario autenticado, redirigirlo según su rol
  if (user) {
    if (user.role?.name === ROLES.ADMIN) {
      return <Navigate to="/admin" replace />;
    } else if (user.role?.name === ROLES.USER) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />; // fallback por seguridad
    }
  }

  return children;
};

export default PublicRoute;
