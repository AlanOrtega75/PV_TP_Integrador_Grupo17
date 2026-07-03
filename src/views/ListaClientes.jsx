import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Card, CardContent, Stack, Typography, Button, TextField,
  InputAdornment, Avatar, Alert, Snackbar, Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  PeopleOutline as PeopleOutlineIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import FormularioAltaCliente from '../components/common/FormularioAltaCliente';
import { obtenerClientes, crearCliente, STORAGE_KEY } from '../services/clienteService';
import { iniciales } from '../utils/formato';

// Estado inicial del Snackbar de notificaciones.
const SNACKBAR_INICIAL = { abierto: false, severidad: 'success', mensaje: '' };

const normalizarCliente = (cliente) => ({
  ...cliente,
  name: cliente?.name || { firstname: '', lastname: '' },
  address: cliente?.address || {},
  email: cliente?.email || '',
  phone: cliente?.phone || '',
});

const ListaClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Control del modal, del envío del POST y del aviso.
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INICIAL);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const datos = await obtenerClientes();
        const clientesApi = datos.map(normalizarCliente);
        const clientesGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const combinados = [
          ...clientesGuardados,
          ...clientesApi.filter((cliente) => !clientesGuardados.some((guardado) => guardado.id === cliente.id)),
        ];
        setClientes(combinados);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(combinados));
      } catch (err) {
        const clientesGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        setClientes(clientesGuardados);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarClientes();
  }, []);

  useEffect(() => {
    if (!cargando) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
    }
  }, [clientes, cargando]);

  const clientesFiltrados = clientes.filter((c) => {
    const texto = busqueda.toLowerCase();
    const nombre = `${c.name?.firstname || ''} ${c.name?.lastname || ''}`.toLowerCase();
    const ciudad = `${c.address?.city || ''}`.toLowerCase();
    return nombre.includes(texto) || ciudad.includes(texto);
  });

  const cerrarSnackbar = () => setSnackbar((s) => ({ ...s, abierto: false }));

  // Recibe los datos del formulario, dispara el POST a la API y, si todo sale
  // bien, agrega el nuevo cliente a la lista. Además lo guarda localmente para
  // que se vea inmediatamente aunque la API no persista el registro.
  const handleGuardarCliente = async (datosFormulario) => {
    setEnviando(true);

    const nuevoCliente = {
      id: Date.now(),
      name: { firstname: datosFormulario.nombre, lastname: datosFormulario.apellido },
      email: datosFormulario.email,
      phone: datosFormulario.telefono,
      address: {
        city: datosFormulario.ciudad,
        street: datosFormulario.direccion,
        zipcode: datosFormulario.codigoPostal,
      },
      username: datosFormulario.usuario,
      password: datosFormulario.password,
    };

    setClientes((anteriores) => {
      const actualizados = [nuevoCliente, ...anteriores];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
      return actualizados;
    });

    setModalAbierto(false);

    try {
      // La API devuelve el cliente creado con el id que le asigna el servidor.
      // Lo capturamos para mostrarlo en el aviso de exito.
      const respuestaApi = await crearCliente(datosFormulario);
      setSnackbar({
        abierto: true,
        severidad: 'success',
        mensaje: respuestaApi?.id
          ? `Cliente agregado correctamente. ID asignado por la API: ${respuestaApi.id}`
          : 'Cliente agregado correctamente.',
      });
    } catch (err) {
      setSnackbar({
        abierto: true,
        severidad: 'warning',
        mensaje: 'Cliente agregado en la vista. La API no pudo confirmar el registro.',
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4">Clientes</Typography>
          <Typography variant="body2" color="text.secondary">
            Listado de clientes registrados
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          // Quitamos el foco del botón antes de abrir el modal para evitar el aviso
          // de accesibilidad de MUI (aria-hidden sobre un elemento que retiene el foco).
          onClick={(e) => {
            e.currentTarget.blur();
            setModalAbierto(true);
          }}
        >
          Agregar Cliente
        </Button>
      </Stack>

      <Card elevation={2}>
        <CardContent>
          <TextField
            placeholder="Buscar por apellido o ciudad"
            variant="outlined"
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {error && <Alert severity="error">{error}</Alert>}

          {!error && (
            <Stack spacing={2}>
              {/* Estado de carga: tarjetas Skeleton mientras responde la API. */}
              {cargando &&
                Array.from({ length: 5 }).map((_, fila) => (
                  <Card key={fila} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Stack>
                    </CardContent>
                  </Card>
                ))}

              {/* Estado de éxito: una grilla de tarjetas por cada cliente filtrado. */}
              {!cargando && (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      lg: 'repeat(4, minmax(0, 1fr))',
                    },
                    gap: 2,
                  }}
                >
                  {clientesFiltrados.map((cliente) => {
                    const nombreCompleto = `${cliente.name?.firstname || ''} ${cliente.name?.lastname || ''}`.trim();
                    const ciudad = cliente.address?.city || 'No disponible';
                    const telefono = cliente.phone || 'No disponible';

                    return (
                      <Card key={cliente.id} variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Box>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                              <Avatar sx={{ width: 40, height: 40, fontSize: 15, bgcolor: 'primary.light' }}>
                                {iniciales(cliente.name?.firstname, cliente.name?.lastname)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {nombreCompleto || 'Cliente sin nombre'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {cliente.email}
                                </Typography>
                              </Box>
                            </Stack>

                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                <strong>Teléfono:</strong> {telefono}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Ciudad:</strong> {ciudad}
                              </Typography>
                            </Stack>
                          </Box>

                          {/* "Ver más" navega a la ficha completa del cliente. */}
                          <Button
                            variant="text"
                            size="small"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ mt: 1.5, px: 0, alignSelf: 'flex-start' }}
                            onClick={() => navigate(`/clientes/${cliente.id}`)}
                          >
                            Ver más
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              )}

              {/* Estado vacío: la búsqueda no devolvió resultados. */}
              {!cargando && clientesFiltrados.length === 0 && (
                <Card variant="outlined">
                  <CardContent>
                    <Stack alignItems="center" spacing={1} sx={{ py: 5, color: 'text.secondary' }}>
                      <PeopleOutlineIcon fontSize="large" />
                      <Typography variant="body2">
                        No se encontraron clientes.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>

      <FormularioAltaCliente
        abierto={modalAbierto}
        enviando={enviando}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={handleGuardarCliente}
      />

      <Snackbar
        open={snackbar.abierto}
        autoHideDuration={6000}
        onClose={cerrarSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={cerrarSnackbar}
          severity={snackbar.severidad}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaClientes;
