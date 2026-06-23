import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AdminProvider } from './src/context/AdminContext';
import App from './App';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121218', // Fondo oscuro de las imágenes
      paper: 'rgba(25, 25, 35, 0.6)',
    },
    primary: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    button: { textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121218',
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(40, 40, 60, 0.15) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(30, 30, 50, 0.2) 0%, transparent 45%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AdminProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  </React.StrictMode>
);