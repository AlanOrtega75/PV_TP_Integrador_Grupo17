// Pequeños helpers de validación reutilizables en toda la app.

// Verifica que un texto tenga el formato básico de un email (algo@algo.algo).
export const esEmailValido = (email) => {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(email);
};
