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
  faUsers,
  faUserShield,
  faChartLine,
  faSignOutAlt,
  faPlus,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const AdminPanel = () => {
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
            Panel de Administración
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bienvenido, {user?.name || "Administrador"} 👋
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

      {/* TARJETAS DE RESUMEN */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, borderLeft: "5px solid #1976d2" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FontAwesomeIcon
                  icon={faUsers}
                  size="2x"
                  color="#1976d2"
                />
                <Box>
                  <Typography variant="h6">Usuarios registrados</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    125
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
                  icon={faUserShield}
                  size="2x"
                  color="#2e7d32"
                />
                <Box>
                  <Typography variant="h6">Roles del sistema</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    2
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
                <FontAwesomeIcon
                  icon={faChartLine}
                  size="2x"
                  color="#ed6c02"
                />
                <Box>
                  <Typography variant="h6">Actividad reciente</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    +12%
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
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              sx={{ py: 1.5 }}
              onClick={() => navigate("/admin/users/create")}
            >
              Nuevo Usuario
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faCogs} />}
              sx={{ py: 1.5 }}
              onClick={() => navigate("/admin/settings")}
            >
              Configuración
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faChartLine} />}
              sx={{ py: 1.5 }}
              onClick={() => navigate("/admin/reports")}
            >
              Ver Reportes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPanel;
