import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Requisito 1 y 3: Leer de localStorage al iniciar, si no existe es null
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('adminSession');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  // Requisito 3: Guardar en tiempo real los cambios del estado en localStorage
  useEffect(() => {
    if (admin) {
      localStorage.setItem('adminSession', JSON.stringify(admin));
    } else {
      localStorage.removeItem('adminSession');
    }
  }, [admin]);

  const login = (nombre, sector) => {
    const iniciales = nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    setAdmin({ nombre, sector, iniciales });
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};