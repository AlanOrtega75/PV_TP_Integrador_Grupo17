import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ListaClientes from './views/ListaClientes';

const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);
  return admin ? children : <Navigate to="/login" replace />;
};

function App() {
  const { admin } = useContext(AdminContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={admin ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        }
      />
      <Route
        path="/clientes"
        element={
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        }
      />
      <Route
        path="*"
        element={<Navigate to={admin ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
