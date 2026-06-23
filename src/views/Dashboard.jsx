import React from 'react';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div className="page-shell">
      <Header />
      <div className="card">
        <h1>Panel de administrador</h1>
        <p>Has iniciado sesión correctamente. Esta sesión se guarda en localStorage y se mantendrá tras recargar la página.</p>
      </div>
    </div>
  );
};

export default Dashboard;
