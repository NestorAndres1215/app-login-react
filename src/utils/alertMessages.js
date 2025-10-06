// src/utils/alertMessages.js
import Swal from "sweetalert2";

// ✅ Éxito genérico
export const showSuccess = (title, text, timer = 1800) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    timer,
    showConfirmButton: false,
  });
};

// ⚠️ Advertencia
export const showWarning = (title, text) => {
  Swal.fire({
    icon: "warning",
    title,
    text,
  });
};

// ❌ Error genérico
export const showError = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};

// ✅ Confirmación genérica
export const showConfirm = async (title, text) => {
  const result = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
};

// 🔹 Logout reutilizable
export const handleLogout = async (logoutFunction, navigate) => {
  const confirmed = await showConfirm(
    "¿Cerrar sesión?",
    "Tu sesión se cerrará."
  );
  if (confirmed) {
    logoutFunction();
    navigate("/login");
  }
};
