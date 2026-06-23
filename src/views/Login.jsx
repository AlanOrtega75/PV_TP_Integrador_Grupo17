import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Login = () => {
  const { login } = useContext(AdminContext);
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('Soporte');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    login(nombre.trim(), sector);
    navigate('/dashboard');
  };

  return (
    <div className="page-shell">
      <div className="card">
        <h1>Iniciar sesión Administrador</h1>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Nombre de Usuario
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="ej. emanuel"
              required
            />
          </label>
          <label>
            Sector
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="Soporte">Soporte</option>
              <option value="Gerencia">Gerencia</option>
            </select>
          </label>
          <button type="submit" className="primary-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
