import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import Layout from './components/layout/Layout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ListaClientes from './views/ListaClientes';
import DetalleCliente from './views/DetalleCliente';

const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);
  return admin ? children : <Navigate to="/login" replace />;
};

function App({ cambiarTema, modo }) {
  const { admin } = useContext(AdminContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={admin ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Rutas protegidas: comparten el Layout (header + navegacion) y solo
          son accesibles con una sesion activa. */}
      <Route
        element={
          <RutaProtegida>
            <Layout cambiarTema={cambiarTema} modo={modo}/>
          </RutaProtegida>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalleCliente />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={admin ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
