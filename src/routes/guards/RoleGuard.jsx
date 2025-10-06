// src/routes/guards/RoleGuard.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RoleGuard = ({ user, allowedRoles, children }) => {
  console.log("🟢 === RoleGuard ejecutado ===");
  console.log("👤 Usuario recibido:", user);
  console.log("✅ Roles permitidos:", allowedRoles);

  // 1️⃣ Verificar si hay usuario
  if (!user) {
    console.log("⚠️ No hay usuario. Redirigiendo a /login...");
    return <Navigate to="/login" />;
  }

  // 2️⃣ Mostrar info del rol actual
  console.log("🎭 Rol del usuario:", user.role);
  console.log("🧩 Nombre del rol:", user.role?.name);

  // 3️⃣ Validar si el rol está permitido
  const isAllowed = allowedRoles.includes(user.role?.name);
  console.log("🔎 ¿Rol permitido?:", isAllowed);

  if (!isAllowed) {
    console.log(
      `🚫 El rol '${user.role?.name}' NO está autorizado. Redirigiendo a /login...`
    );
    return <Navigate to="/login" />;
  }

  // 4️⃣ Si todo bien, renderizar contenido
  console.log("✅ Acceso permitido. Renderizando contenido protegido...");
  return children;
};

export default RoleGuard;
