import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardActions,
  Typography, Avatar, Chip, Button, Skeleton, Stack, Box,
} from '@mui/material';
import {
  People as PeopleIcon,
  Badge as BadgeIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { AdminContext } from '../context/AdminContext';
import { obtenerClientesCombinados } from '../services/clienteService';
import { COLOR_POR_SECTOR, DESCRIPCION_POR_SECTOR } from '../constants/sectores';

const Dashboard = () => {
  const { admin } = useContext(AdminContext);
  // null mientras carga la métrica; un número una vez obtenida.
  const [totalClientes, setTotalClientes] = useState(null);

  // Total de clientes = API + copia local, asi tambien cuenta las altas de la app
  useEffect(() => {
    obtenerClientesCombinados()
      .then((clientes) => setTotalClientes(clientes.length))
      .catch(() => setTotalClientes(null));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={0.5} sx={{ mb: 4 }}>
        <Typography variant="h4">Hola, {admin.nombre}</Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido al panel de control de clientes.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', width: 52, height: 52 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Clientes registrados
                  </Typography>
                  {totalClientes === null ? (
                    <Skeleton width={56} height={44} />
                  ) : (
                    <Typography variant="h4">{totalClientes}</Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 52, height: 52 }}>
                  <BadgeIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tu sector
                  </Typography>
                  <Chip
                    label={admin.sector}
                    color={COLOR_POR_SECTOR[admin.sector]}
                    size="small"
                  />
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {DESCRIPCION_POR_SECTOR[admin.sector]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Gestión de clientes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consultá el listado completo, buscá por apellido o ciudad y registrá nuevas altas.
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button
                component={RouterLink}
                to="/clientes"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
              >
                Ver clientes
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
