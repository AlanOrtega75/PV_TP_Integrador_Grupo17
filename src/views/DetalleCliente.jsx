import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Card, CardContent, Box, Stack, Typography, Avatar,
  Button, Divider, CircularProgress, Alert, IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  LocationOnOutlined as LocationIcon,
  MarkunreadMailboxOutlined as ZipIcon,
  BadgeOutlined as BadgeIcon,
  LockOutlined as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { obtenerClientePorId, obtenerClientesLocales } from '../services/clienteService';
import { iniciales } from '../utils/formato';

// Fila "icon + etiqueta + valor" para cada dato de la ficha. Si viene vacio
// mostramos "No disponible". accion es un control opcional a la derecha
// (ej: el ojo de la contraseña).
const Dato = ({ icono, etiqueta, valor, accion }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box sx={{ color: 'primary.main', mt: 0.25 }}>{icono}</Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary">
        {etiqueta}
      </Typography>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body1">{valor || 'No disponible'}</Typography>
        {accion}
      </Stack>
    </Box>
  </Stack>
);

// Ficha profunda del cliente (/clientes/:id). Recupera al cliente por su id y
// renderiza TODOS sus datos, incluida la dirección anidada y las credenciales.
const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // La contraseña arranca oculta, el ojo la muestra y oculta
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        // primero buscamos los clientes locales, que incluyen los que se dieron de alta en la app y no están en la API
        const locales = obtenerClientesLocales();
        const local = locales.find((c) => String(c.id) === String(id));
        if (local) {
          setCliente(local);
          return;
        }
        // 2do. Si no estaba local, segundo fetch puntual a /users/:id.
        const datos = await obtenerClientePorId(id);
        if (!datos || !datos.id) {
          throw new Error('No encontramos un cliente con ese identificador.');
        }
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [id]);

  const volver = () => navigate('/clientes');

  // Datos derivados, con ?. por si el cliente viene incompleto.
  const nombreCompleto = `${cliente?.name?.firstname || ''} ${cliente?.name?.lastname || ''}`.trim();
  const direccion = cliente?.address || {};
  const calleYNumero = [direccion.street, direccion.number].filter(Boolean).join(' ');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={volver} sx={{ mb: 2 }}>
        Volver a clientes
      </Button>

      {/* Estado de carga */}
      {cargando && (
        <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Cargando ficha del cliente...
          </Typography>
        </Stack>
      )}

      {/* Estado de error: avisamos en vez de dejar la pantalla en blanco */}
      {!cargando && error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={volver}>
              Volver
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Estado de exito: la ficha completa */}
      {!cargando && !error && cliente && (
        <Card elevation={2}>
          <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
            {/* Encabezado: avatar + nombre + email */}
            <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
              <Avatar
                sx={{ width: 72, height: 72, fontSize: 26, bgcolor: 'primary.main' }}
              >
                {iniciales(cliente.name?.firstname, cliente.name?.lastname)}
              </Avatar>
              <Box>
                <Typography variant="h5">
                  {nombreCompleto || 'Cliente sin nombre'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cliente #{cliente.id}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Grilla con todos los datos del cliente */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              <Dato icono={<EmailIcon />} etiqueta="Email" valor={cliente.email} />
              <Dato icono={<PhoneIcon />} etiqueta="Teléfono" valor={cliente.phone} />
              <Dato icono={<LocationIcon />} etiqueta="Dirección" valor={calleYNumero} />
              <Dato icono={<LocationIcon />} etiqueta="Ciudad" valor={direccion.city} />
              <Dato icono={<ZipIcon />} etiqueta="Código Postal" valor={direccion.zipcode} />
              <Dato icono={<BadgeIcon />} etiqueta="Usuario" valor={cliente.username} />
              <Dato
                icono={<LockIcon />}
                etiqueta="Contraseña"
                // Tapada con viñetas hasta tocar el ojo. Sin valor, queda en "No disponible".
                valor={cliente.password ? (mostrarPassword ? cliente.password : '•'.repeat(8)) : ''}
                accion={cliente.password ? (
                  <IconButton
                    size="small"
                    onClick={() => setMostrarPassword((v) => !v)}
                    aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {mostrarPassword
                      ? <VisibilityOffIcon fontSize="small" />
                      : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                ) : null}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default DetalleCliente;
