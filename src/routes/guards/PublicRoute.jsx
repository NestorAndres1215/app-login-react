import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si ya hay usuario autenticado, redirigirlo según su rol
  if (user) {
    if (user.role?.name === "ADMIN") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Si no está autenticado, puede ver la página pública (login/register)
  return children;
};

export default PublicRoute;
