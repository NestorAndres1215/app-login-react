// src/routes/guards/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log("🧩 [PrivateRoute] Renderizado");
  console.log("🔑 Usuario en contexto:", user);

  if (!user) {
    console.log("🚫 No hay usuario autenticado → redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ Usuario autenticado → acceso permitido");
  return <>{children}</>;
};

export default PrivateRoute;
