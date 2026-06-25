import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Avatar, Chip,
} from '@mui/material';
import { AdminContext } from '../../context/AdminContext';

// Estilo aplicado al enlace de navegación activo para que resalte la sección actual.
const estiloEnlaceActivo = ({ isActive }) => ({
  fontWeight: isActive ? 700 : 400,
  textDecoration: isActive ? 'underline' : 'none',
});

// Barra de encabezado: muestra la navegación, los datos del
// administrador conectado (nombre + sector) y el botón de cierre de sesión.
const Header = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  // Sin sesión activa no hay barra que mostrar.
  if (!admin) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Panel de Clientes
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={NavLink} to="/dashboard" style={estiloEnlaceActivo}>
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/clientes" style={estiloEnlaceActivo}>
            Clientes
          </Button>
        </Box>

        {/* Empuja la info de sesión hacia la derecha. */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, fontSize: 14 }}>
            {admin.iniciales}
          </Avatar>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {admin.nombre}
            </Typography>
            <Chip label={admin.sector} size="small" color="secondary" sx={{ height: 18, fontSize: 11 }} />
          </Box>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
