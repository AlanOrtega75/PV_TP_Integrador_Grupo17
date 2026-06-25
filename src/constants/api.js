// Configuración centralizada de la API FakeStore.
// Tener la URL base y los endpoints en un solo lugar evita repetir strings
// por toda la app: si la dirección cambia, se modifica únicamente acá.
export const API_BASE_URL = 'https://fakestoreapi.com';

export const ENDPOINTS = {
  // Listado y alta de clientes (GET /users y POST /users).
  usuarios: `${API_BASE_URL}/users`,
  // Ficha o eliminación de un cliente puntual (GET y DELETE /users/:id).
  usuario: (id) => `${API_BASE_URL}/users/${id}`,
};
