import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { RegisterUser } from "../../models/RegisterUser";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { showConfirm, showError } from "../../utils/alertMessages";
import { registerInitialState } from "../../constants/registerInitialState"; // ✅ importación del estado inicial

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(registerInitialState); // ✅ uso del estado importado

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = new RegisterUser(form);
      const response = await registerUser(newUser);

      showConfirm("Registro exitoso 🎉", "Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión.")
      navigate("/login");
    } catch (error) {
      showError("Error en el registro", "Ocurrió un error al registrar el usuario.")
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {/* Ícono superior */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            size="3x"
            style={{ marginBottom: "10px", color: "#1976d2" }}
          />
          <Typography variant="h5" gutterBottom>
            Crear cuenta
          </Typography>
        </Box>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombre completo"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              name="roleName"
              value={form.roleName}
              label="Rol"
              onChange={handleChange}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.2,
              fontSize: "1rem",
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Registrarme
          </Button>
        </Box>

        {/* 🔹 Enlace fuera del form para evitar submit */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          ¿Ya tienes una cuenta?{" "}
          <Link
            component="button"
            underline="hover"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
