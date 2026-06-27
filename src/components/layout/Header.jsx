import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import {
  Groups as GroupsIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { AdminContext } from "../../context/AdminContext";
import { COLOR_POR_SECTOR } from "../../constants/sectores";

// Enlaces de navegación definidos como datos para recorrerlos con un .map()
// y mantener la barra consistente.
const ENLACES = [
  { to: "/dashboard", etiqueta: "Dashboard", icono: <DashboardIcon /> },
  { to: "/clientes", etiqueta: "Clientes", icono: <PeopleIcon /> },
];

// Barra de encabezado: muestra la marca, la navegación, los datos del
// administrador conectado (nombre + sector) y el botón de cierre de sesión.
const Header = ({ cambiarTema, modo }) => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  // Sin sesión activa no hay barra que mostrar.
  if (!admin) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          gap: { xs: 1, sm: 2 },
          flexWrap: "wrap",
          rowGap: 1,
          py: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <GroupsIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Panel de Clientes
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 0.5, ml: { sm: 1 } }}>
          {ENLACES.map(({ to, etiqueta, icono }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              color="inherit"
              startIcon={icono}
              // NavLink agrega la clase .active en la ruta actual; la resaltamos.
              sx={{ "&.active": { bgcolor: "rgba(255, 255, 255, 0.16)" } }}
            >
              {etiqueta}
            </Button>
          ))}
        </Box>

        {/* ml: auto empuja la sesión a la derecha en escritorio y la mantiene
            alineada a la derecha en su fila cuando la barra se envuelve en mobile. */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", width: 38, height: 38 }}>
            {admin.iniciales}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1.3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {admin.nombre}
            </Typography>
            <Chip
              label={admin.sector}
              size="small"
              color={COLOR_POR_SECTOR[admin.sector]}
              sx={{ height: 20 }}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            // Se oculta en mobile, donde el nombre y el sector no se muestran.
            sx={{
              display: { xs: "none", sm: "block" },
              borderColor: "rgba(255, 255, 255, 0.3)",
              mx: 0.5,
            }}
          />
          <Button
            color="inherit"
            variant="outlined"
            onClick={cambiarTema}
            startIcon={modo === "light"
              ? <DarkModeIcon /> 
              : <LightModeIcon />
            }
            sx={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
          >
            {modo === "light" ? "Oscuro" : "Claro"}
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
