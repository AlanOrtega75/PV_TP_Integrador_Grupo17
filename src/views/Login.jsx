import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Paper, Stack, Avatar, Typography, TextField, MenuItem, Button,
} from '@mui/material';
import { AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material';
import { AdminContext } from '../context/AdminContext';
import { SECTORES, LISTA_SECTORES } from '../constants/sectores';

const Login = () => {
  const { login } = useContext(AdminContext);
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState(SECTORES.SOPORTE);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    login(nombre.trim(), sector);
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{ width: '100%', maxWidth: 420, p: { xs: 3, sm: 4 } }}
      >
        <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AdminPanelSettingsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5">Iniciar sesión</Typography>
          <Typography variant="body2" color="text.secondary">
            Panel de administración de clientes
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre del administrador"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Ignacio Gutiérrez"
            required
            fullWidth
            autoFocus
          />
          <TextField
            select
            id="sector"
            name="sector"
            label="Sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            fullWidth
          >
            {LISTA_SECTORES.map((opcion) => (
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" size="large" fullWidth>
            Ingresar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
