import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import Header from './Header';

const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          mt: 4,
          py: 4,
          px: { xs: 2, md: 4 },
          backgroundColor: 'grey.900',
          color: 'white',
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'flex-start' }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Gestión de Proyectos
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Una plataforma diseñada para organizar, planificar y realizar el seguimiento de tus proyectos y tareas con total claridad y eficiencia.
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Enlaces
              </Typography>
              <Stack spacing={0.5}>
                <MuiLink component={Link} to="/dashboard" color="inherit" underline="hover">
                  Inicio
                </MuiLink>
                <MuiLink component={Link} to="/clientes" color="inherit" underline="hover">
                  Clientes
                </MuiLink>
              </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Integrantes - Grupo 17
              </Typography>
              <Stack spacing={0.5}>
                <MuiLink href="https://github.com/AlanOrtega75" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
                  Alan M. Ortega
                </MuiLink>
                <MuiLink href="https://github.com/Emanuel-J-Valeriano" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
                  Emanuel J. Valeriano
                </MuiLink>
                <MuiLink href="https://github.com/IgnacioG04" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
                  Ignacio V. Gutierrez
                </MuiLink>
                <MuiLink href="https://github.com/Barr09" target="_blank" rel="noopener noreferrer" color="inherit" underline="hover">
                  Bárbara L. Alavar
                </MuiLink>
              </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                Información
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong>Materia:</strong> Programación Visual
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong>Trabajo Práctico:</strong> Integrador React Router + MUI
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong>Año:</strong> {new Date().getFullYear()}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
              © {new Date().getFullYear()} Grupo 17 - Todos los derechos reservados.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
