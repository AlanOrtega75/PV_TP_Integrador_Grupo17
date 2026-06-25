import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, CircularProgress, Alert, Typography, Box,
  Button, Stack, Snackbar,
} from '@mui/material';
import FormularioAltaCliente from '../components/common/FormularioAltaCliente';
import { crearCliente } from '../services/clienteService';

// Estado inicial del Snackbar de notificaciones.
const SNACKBAR_INICIAL = { abierto: false, severidad: 'success', mensaje: '' };

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // control del modal, del envío del POST y del aviso.
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INICIAL);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/users');
        if (!respuesta.ok) throw new Error('Error al obtener los clientes');
        const datos = await respuesta.json();
        setClientes(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchClientes();
  }, []);

  const clientesFiltrados = clientes.filter((c) => {
    const texto = busqueda.toLowerCase();
    return (
      c.name.lastname.toLowerCase().includes(texto) ||
      c.address.city.toLowerCase().includes(texto)
    );
  });

  const cerrarSnackbar = () => setSnackbar((s) => ({ ...s, abierto: false }));

  // recibe los datos del formulario, dispara el POST a la API y,
  // si todo sale bien, agrega el nuevo cliente a la tabla con el ID devuelto.
  const handleGuardarCliente = async (datosFormulario) => {
    setEnviando(true);
    try {
      const creado = await crearCliente(datosFormulario);

      // FakeStore API no persiste los datos y siempre responde
      // { id: 1 } ante un alta. Capturamos ese id para el aviso,
      // pero para la tabla generamos un id local único, el siguiente al
      // mayor existente, para no romper las keys de React ni mostrar IDs repetidos.
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
    <Box sx={{ padding: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Lista de Clientes</Typography>
        <Button
          variant="contained"
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

      <TextField
        label="Buscar por apellido o ciudad"
        variant="outlined"
        fullWidth
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: '#ffffff', borderRadius: 1 }}
      />

      {cargando && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!cargando && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nombre completo</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Teléfono</strong></TableCell>
                <TableCell><strong>Ciudad</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.name.firstname} {cliente.name.lastname}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.phone}</TableCell>
                  <TableCell>{cliente.address.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
    </Box>
  );
};

export default ListaClientes;
