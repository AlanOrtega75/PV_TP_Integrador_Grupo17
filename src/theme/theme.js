import { createTheme } from '@mui/material/styles';

// Tema claro y unificado para toda la app (panel de administración).
// Centralizar la paleta, la tipografía y la forma de los componentes acá
// garantiza una apariencia coherente en todas las vistas y evita repetir
// estilos sueltos en cada archivo.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3949ab' },   // índigo: barra de navegación y acciones
    secondary: { main: '#00897b' },  // verde azulado: acentos y chips
    background: {
      default: '#f4f6f8',           // gris muy claro: fondo general
      paper: '#ffffff',             // blanco: superficies (cards, tablas)
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    // Botones sin MAYÚSCULAS forzadas, se ven más prolijos y legibles.
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 1 },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 12 },
      },
    },
  },
});

export default theme;
