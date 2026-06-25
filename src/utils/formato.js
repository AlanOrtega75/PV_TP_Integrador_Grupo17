// Helpers de formato reutilizables en la interfaz.

// Devuelve las iniciales en mayúsculas a partir de una o varias partes de un
// nombre. Ej: iniciales("Lionel", "Messi") => "LM".
export const iniciales = (...partes) =>
  partes
    .filter(Boolean)
    .map((parte) => parte.trim().charAt(0))
    .join('')
    .toUpperCase();
