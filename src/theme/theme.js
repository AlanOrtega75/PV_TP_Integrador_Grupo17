import { createTheme } from '@mui/material/styles';

// Genera el tema de la aplicación según el modo recibido ("light" o "dark").
// Centralizar la configuración permite cambiar toda la apariencia de la app
// con solo modificar el modo desde el ThemeProvider.
const crearTema = (modo = 'light') =>
  createTheme({
    palette: {
      mode: modo,
      primary: { main: '#3949ab' },
      secondary: { main: '#00897b' },

      background:
        modo === 'light'
          ? {
              default: '#f4f6f8',
              paper: '#ffffff',
            }
          : {
              default: '#121212',
              paper: '#1e1e1e',
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
          rounded: {
            borderRadius: 12,
          },
        },
      },
    },
  });

export default crearTema;