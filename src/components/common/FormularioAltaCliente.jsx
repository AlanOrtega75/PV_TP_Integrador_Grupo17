import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, CircularProgress,
} from '@mui/material';
import { CLIENTE_INICIAL, CAMPOS_CLIENTE } from '../../constants/cliente';
import { esEmailValido } from '../../utils/validaciones';

// formulario de alta de clientes presentado dentro de un modal (Dialog).
// solo recolecta y valida los datos, y delega el guardado real en el padre
// a través de la prop onGuardar. Así la logica de la API (el POST)
// vive en la vista, no acá (separación de responsabilidades).
const FormularioAltaCliente = ({ abierto, enviando, onCerrar, onGuardar }) => {
  const [form, setForm] = useState(CLIENTE_INICIAL);
  const [errores, setErrores] = useState({});

  // Cada vez que el modal se abre, reseteamos el formulario para empezar limpio.
  useEffect(() => {
    if (abierto) {
      setForm(CLIENTE_INICIAL);
      setErrores({});
    }
  }, [abierto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  // Valida los campos obligatorios y el formato del email.
  // Devuelve true si no hubo errores.
  const validar = () => {
    const nuevosErrores = {};

    CAMPOS_CLIENTE.forEach(({ name, label, requerido }) => {
      if (requerido && !form[name].trim()) {
        nuevosErrores[name] = `${label} es obligatorio`;
      }
    });

    if (form.email.trim() && !esEmailValido(form.email)) {
      nuevosErrores.email = 'Ingresá un email válido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onGuardar(form);
    }
  };

  return (
    <Dialog
      open={abierto}
      onClose={onCerrar}
      fullWidth
      maxWidth="sm"
      // Montamos el <form> sobre el Paper del Dialog para que "Enter" envíe
      // el formulario y el botón type="submit" funcione de forma nativa.
      // noValidate desactiva la validación nativa del navegador para que los
      // errores se muestren de forma consistente con MUI (helperText).
      PaperProps={{ component: 'form', onSubmit: handleSubmit, noValidate: true }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Nuevo Cliente</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {CAMPOS_CLIENTE.map(({ name, label, type, requerido, autoComplete }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              type={type}
              autoComplete={autoComplete}
              value={form[name]}
              onChange={handleChange}
              required={requerido}
              error={Boolean(errores[name])}
              helperText={errores[name]}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCerrar} color="inherit" disabled={enviando}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={enviando}
          startIcon={enviando ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {enviando ? 'Guardando...' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioAltaCliente;
