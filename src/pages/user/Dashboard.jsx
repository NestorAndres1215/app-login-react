import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faClipboardList,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* ENCABEZADO */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Bienvenido a tu panel
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Hola, {user?.name || "Usuario"} 👋
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* TARJETAS DE INFORMACIÓN */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, borderLeft: "5px solid #1976d2" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faUser} size="2x" color="#1976d2" />
                <Box>
                  <Typography variant="h6">Tu Perfil</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gestiona tus datos personales
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, borderLeft: "5px solid #ed6c02" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FontAwesomeIcon icon={faBell} size="2x" color="#ed6c02" />
                <Box>
                  <Typography variant="h6">Notificaciones</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tienes 3 nuevas alertas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, borderLeft: "5px solid #2e7d32" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FontAwesomeIcon
                  icon={faClipboardList}
                  size="2x"
                  color="#2e7d32"
                />
                <Box>
                  <Typography variant="h6">Tus Actividades</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Última sesión: hace 2 días
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ACCIONES RÁPIDAS */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Acciones rápidas
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faUser} />}
              sx={{ py: 1.5 }}
              onClick={() => navigate("/profile")}
            >
              Ver mi perfil
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faCog} />}
              sx={{ py: 1.5 }}
              onClick={() => navigate("/settings")}
            >
              Configuración
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
