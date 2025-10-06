import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import { Container, Box, TextField, Button, Typography, CircularProgress, Paper, InputAdornment, IconButton, Link, } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faSignInAlt, faEye, faEyeSlash, } from "@fortawesome/free-solid-svg-icons";
import { showError, showWarning, showSuccess } from "../../utils/alertMessages";
import { ROLES } from "../../constants/roles"; // Ajusta la ruta
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showWarning("Campos Requeridos", "Por favor, ingresa tu correo y contraseña.")
      return;
    }
    if (!password.trim()) {
      showWarning("Contraseña requerida", "Por favor, ingresa tu contraseña.")
      return;
    }
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const userData = response.data.user;
      const accessToken = response.data.accessToken;

      if (!userData || !accessToken) {
        showError("Error", "Respuesta inválida del servidor")
        return;
      }
      login({ ...userData, accessToken });
      showSuccess("Bienvenido", `Hola ${userData.username}`);

      if (userData.role?.name === ROLES.ADMIN) {
        navigate("/admin");
      } else if (userData.role?.name === ROLES.USER) {
        navigate("/dashboard");
      } else {
        navigate("/login"); // fallback por seguridad
      }
    } catch (error) {
      console.log(error)
      showError("Credenciales inválidas", "Verifica tu email y contraseña");
    } finally {
      setLoading(false);
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
        {/* Encabezado */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <FontAwesomeIcon
            icon={faUser}
            size="3x"
            style={{ marginBottom: "10px", color: "#1976d2" }}
          />
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
        </Box>

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
          noValidate
        >
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: 8, color: "#555" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ marginRight: 8, color: "#555" }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      style={{ color: "#555" }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* BOTÓN LOGIN */}
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              <>
                <FontAwesomeIcon icon={faSignInAlt} />
                Ingresar
              </>
            )}
          </Button>

          {/* LINK REGISTRO */}
          <Typography
            variant="body2"
            sx={{ mt: 3 }}
            textAlign="center"
          >
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              underline="hover"
              sx={{ fontWeight: "bold", color: "#1976d2", cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault(); // Evita que el form se envíe
                navigate("/register");
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
