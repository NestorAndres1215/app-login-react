# 🔐 Node Auth JWT MySQL + React Auth Frontend

Sistema completo de autenticación con **Node.js**, **Express**, **JWT**, **MySQL** (con Sequelize) y un **frontend en React** con manejo de roles (USER / ADMIN).

Permite **registro, inicio de sesión, cierre de sesión, protección de rutas y paneles separados** según el rol del usuario.

---

## 🚀 Características principales

✅ Backend con autenticación segura usando **JWT**  
✅ Frontend con **React Context API** para el manejo del estado de autenticación  
✅ Rutas protegidas (solo accesibles si el usuario está logueado)  
✅ Redirección automática según rol (`admin` o `user`)  
✅ Alerta informativa si el usuario intenta volver a `/login` o `/register` estando logueado  
✅ Sistema escalable y modular con estructura limpia  
✅ Manejo de errores y validaciones amigables  

---

## 🛠️ Tecnologías utilizadas

### 🔹 Backend
- Node.js
- Express
- JWT (jsonwebtoken)
- MySQL + Sequelize ORM
- dotenv
- bcryptjs
- cors

### 🔹 Frontend
- React (Vite o CRA)
- React Router DOM v6
- Material UI (MUI)
- SweetAlert2
- FontAwesome
- Context API
