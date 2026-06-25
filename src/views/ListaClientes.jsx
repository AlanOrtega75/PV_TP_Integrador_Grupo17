import React, { useState, useEffect } from 'react';
import {
  Container, Box, Card, CardContent, Stack, Typography, Button, TextField,
  InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Avatar, Alert, Snackbar, Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  PeopleOutline as PeopleOutlineIcon,
} from '@mui/icons-material';
import FormularioAltaCliente from '../components/common/FormularioAltaCliente';
import { obtenerClientes, crearCliente } from '../services/clienteService';
import { iniciales } from '../utils/formato';

// Estado inicial del Snackbar de notificaciones.
const SNACKBAR_INICIAL = { abierto: false, severidad: 'success', mensaje: '' };

// Títulos de las columnas de la tabla.
const COLUMNAS = ['ID', 'Cliente', 'Email', 'Teléfono', 'Ciudad'];

const ListaClientes = () => {
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
        setClientes(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((c) => {
    const texto = busqueda.toLowerCase();
    return (
      c.name.lastname.toLowerCase().includes(texto) ||
      c.address.city.toLowerCase().includes(texto)
    );
  });

  const cerrarSnackbar = () => setSnackbar((s) => ({ ...s, abierto: false }));

  // Recibe los datos del formulario, dispara el POST a la API y, si todo sale
  // bien, agrega el nuevo cliente a la tabla con un id local único.
  const handleGuardarCliente = async (datosFormulario) => {
    setEnviando(true);
    try {
      const creado = await crearCliente(datosFormulario);

      // FakeStore API no persiste los datos y siempre responde { id: 1 } ante un
      // alta. Capturamos ese id para el aviso, pero para la tabla generamos un id
      // local único (el siguiente al mayor existente) para no romper las keys de
      // React ni mostrar IDs repetidos.
      setClientes((anteriores) => {
        const idLocal = anteriores.reduce((max, c) => Math.max(max, c.id), 0) + 1;
        const nuevoCliente = {
          id: idLocal,
          name: { firstname: datosFormulario.nombre, lastname: datosFormulario.apellido },
          email: datosFormulario.email,
          phone: datosFormulario.telefono,
          address: { city: datosFormulario.ciudad },
        };
        return [nuevoCliente, ...anteriores];
      });

      setModalAbierto(false);
      setSnackbar({
        abierto: true,
        severidad: 'success',
        mensaje: `Cliente registrado con éxito (ID asignado por la API: ${creado.id})`,
      });
    } catch (err) {
      setSnackbar({ abierto: true, severidad: 'error', mensaje: err.message });
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
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'grey.50' } }}>
                    {COLUMNAS.map((columna) => (
                      <TableCell key={columna}>{columna}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Estado de carga: filas Skeleton mientras responde la API. */}
                  {cargando &&
                    Array.from({ length: 5 }).map((_, fila) => (
                      <TableRow key={fila}>
                        {COLUMNAS.map((columna) => (
                          <TableCell key={columna}>
                            <Skeleton />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}

                  {/* Estado de éxito: una fila por cada cliente filtrado. */}
                  {!cargando &&
                    clientesFiltrados.map((cliente) => (
                      <TableRow key={cliente.id} hover>
                        <TableCell>{cliente.id}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ width: 34, height: 34, fontSize: 14, bgcolor: 'primary.light' }}>
                              {iniciales(cliente.name.firstname, cliente.name.lastname)}
                            </Avatar>
                            <Typography variant="body2">
                              {cliente.name.firstname} {cliente.name.lastname}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{cliente.email}</TableCell>
                        <TableCell>{cliente.phone}</TableCell>
                        <TableCell>{cliente.address.city}</TableCell>
                      </TableRow>
                    ))}

                  {/* Estado vacío: la búsqueda no devolvió resultados. */}
                  {!cargando && clientesFiltrados.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={COLUMNAS.length}>
                        <Stack alignItems="center" spacing={1} sx={{ py: 5, color: 'text.secondary' }}>
                          <PeopleOutlineIcon fontSize="large" />
                          <Typography variant="body2">
                            No se encontraron clientes.
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
