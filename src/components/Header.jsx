import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Header = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  if (!admin) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="page-header">
      <div>
        <div className="header-title">Administrador conectado</div>
        <div className="header-info">
          <span>{admin.nombre}</span>
          <span>{admin.sector}</span>
        </div>
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
