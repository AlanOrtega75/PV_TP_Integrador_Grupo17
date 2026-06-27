import { ENDPOINTS } from '../constants/api';

// Clave del localStorage donde guardamos la copia local de clientes (los que se
// dan de alta en la app, que FakeStore no guarda). La usan la lista,
// la ficha y el dashboard.
export const STORAGE_KEY = 'clientes-local';

// Lee la copia local de clientes (con try/catch por si el storage quedo roto).
export const obtenerClientesLocales = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Obtiene el listado completo de clientes (GET /users).
export const obtenerClientes = async () => {
  const respuesta = await fetch(ENDPOINTS.usuarios);
  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los clientes.');
  }
  return respuesta.json();
};

// Junta los de la API con los locales, sin repetir por id. Lo usa el dashboard
// para contar bien y no quedarse en los 10 que devuelve la API.
export const obtenerClientesCombinados = async () => {
  const locales = obtenerClientesLocales();
  try {
    const api = await obtenerClientes();
    const nuevosDeApi = api.filter(
      (cliente) => !locales.some((local) => local.id === cliente.id)
    );
    return [...locales, ...nuevosDeApi];
  } catch {
    // Si la API falla, al menos devolvemos lo que haya local.
    return locales;
  }
};

// Trae un cliente por id (GET /users/:id). FakeStore devuelve 200 con body
// vacio para ids que no existen, así que parseamos solo si vino algo: un
// JSON.parse('') rompia el render y dejaba la pantalla en blanco
export const obtenerClientePorId = async (id) => {
  const respuesta = await fetch(ENDPOINTS.usuario(id));
  if (!respuesta.ok) {
    throw new Error('No se pudo obtener la ficha del cliente.');
  }
  const texto = await respuesta.text();
  return texto ? JSON.parse(texto) : null;
};

// Transforma los campos planos del formulario al formato anidado que espera
// la API de fakestore (donde el nombre y la dirección son objetos). Mantener el
// estado del formulario "plano" simplifica el manejo de los inputs, y la
// conversión a la estructura del servidor vive acá, encapsulada en el servicio.
const construirPayload = (cliente) => ({
  email: cliente.email,
  username: cliente.usuario,
  password: cliente.password,
  name: {
    firstname: cliente.nombre,
    lastname: cliente.apellido,
  },
  phone: cliente.telefono,
  address: {
    city: cliente.ciudad,
    street: cliente.direccion,
    zipcode: cliente.codigoPostal,
  },
});

// registra un nuevo cliente en la API mediante una petición POST.
// Devuelve la respuesta del servidor, que incluye el id asignado al cliente.
export const crearCliente = async (cliente) => {
  const respuesta = await fetch(ENDPOINTS.usuarios, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(construirPayload(cliente)),
  });

  if (!respuesta.ok) {
    throw new Error('No se pudo registrar el cliente. Intentá nuevamente.');
  }

  return respuesta.json();
};
