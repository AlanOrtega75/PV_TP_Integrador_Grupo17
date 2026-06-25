import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AdminProvider } from './context/AdminContext';
import theme from './theme/theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza estilos del navegador y aplica el fondo del tema. */}
      <CssBaseline />
      <AdminProvider>
        {/* future: adopta desde ya el comportamiento de React Router v7
            (evita los avisos de deprecación en consola). */}
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  </React.StrictMode>
);
