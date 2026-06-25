// Sectores de la empresa a los que puede pertenecer un administrador.
// Centralizar estos valores evita repetir los textos sueltos ("magic strings")
// en el Login, el encabezado y la lógica de permisos por sector (módulo D).
export const SECTORES = {
  SOPORTE: 'Soporte',
  GERENCIA: 'Gerencia',
};

// Lista de sectores para poblar el desplegable de selección.
export const LISTA_SECTORES = Object.values(SECTORES);

// Color del Chip según el sector, usado en el encabezado.
export const COLOR_POR_SECTOR = {
  [SECTORES.SOPORTE]: 'info',
  [SECTORES.GERENCIA]: 'warning',
};

// Descripción de los permisos de cada sector (se muestra en el Dashboard).
export const DESCRIPCION_POR_SECTOR = {
  [SECTORES.SOPORTE]: 'Acceso de solo lectura a la información de los clientes.',
  [SECTORES.GERENCIA]: 'Acceso total, incluida la eliminación de clientes.',
};
