import { ENDPOINTS } from '../constants/api';

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
