import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROLES } from "../constants/roles"; // Ajusta la ruta según tu proyecto
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import AdminPanel from "../pages/admin/AdminPanel";
import { AuthContext } from "../context/AuthContext";
import PrivateRoute from "./guards/PrivateRoute";
import RoleGuard from "./guards/RoleGuard";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  // Redirección si el usuario ya está autenticado e intenta ir a login/register
  const handlePublicAccess = (component) => {
    if (user) {
      return user.roleName === ROLES.ADMIN  ? (
        <Navigate to="/admin" replace />
      ) : (
        <Navigate to="/dashboard" replace />
      );
    }
    return component;
  };

  return (
    <Router>
      <Routes>
        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/login" element={handlePublicAccess(<Login />)} />
        <Route path="/register" element={handlePublicAccess(<Register />)} />

        {/* ===== RUTAS PRIVADAS ===== */}
        <Route
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleGuard role={ROLES.ADMIN}>
                <AdminPanel />
              </RoleGuard>
            </PrivateRoute>
          }
        />

        {/* ===== RUTA POR DEFECTO ===== */}
        <Route
          path="*"
          element={
            user ? (
              user.roleName === ROLES.ADMIN ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
