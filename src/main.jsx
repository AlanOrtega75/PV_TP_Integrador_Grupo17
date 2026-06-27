import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AdminProvider } from "./context/AdminContext";
import crearTema from "./theme/theme";
import App from "./App";

const Main = () => {
  // El tema se guarda en localStorage para que persista entre recargas. Si no hay
  const [modo, setModo] = useState(() => {
    return localStorage.getItem("modoTema") || "light";
  });

  // Cambia entre modo claro y oscuro.
  const cambiarTema = () => {
    setModo((anterior) => (anterior === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("modoTema", modo);
  }, [modo]);

  // Solo se vuelve a crear el tema cuando cambia el modo.
  const theme = useMemo(() => crearTema(modo), [modo]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza estilos del navegador y aplica el fondo del tema. */}
      <CssBaseline />

      <AdminProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <App cambiarTema={cambiarTema} modo={modo} />
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
