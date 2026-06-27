import { CIUDADES_JUJUY, CP_POR_CIUDAD } from './ciudades';

// Estado inicial del form. Campos planos (sin objetos anidados) para que los
// inputs controlados sean más faciles de manejar.
export const CLIENTE_INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  ciudad: '',
  direccion: '',
  codigoPostal: '',
  usuario: '',
  password: '',
};

// Los campos del form. Los recorremos con .map() para no repetir el <TextField>.
// autoComplete le da pistas al navegador. opciones = desplegable con buscador;
// autocompleta = al cambiarlo, rellena otro campo con un mapa (ciudad -> CP).
export const CAMPOS_CLIENTE = [
  { name: 'nombre', label: 'Nombre', type: 'text', requerido: true, autoComplete: 'given-name' },
  { name: 'apellido', label: 'Apellido', type: 'text', requerido: true, autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', requerido: true, autoComplete: 'email', anchoCompleto: true },
  { name: 'telefono', label: 'Teléfono', type: 'tel', requerido: false, autoComplete: 'tel' },
  { name: 'ciudad', label: 'Ciudad', type: 'text', requerido: false, autoComplete: 'address-level2', anchoCompleto: true, opciones: CIUDADES_JUJUY, autocompleta: { campo: 'codigoPostal', mapa: CP_POR_CIUDAD } },
  { name: 'direccion', label: 'Dirección', type: 'text', requerido: false, autoComplete: 'street-address' },
  { name: 'codigoPostal', label: 'Código Postal', type: 'text', requerido: false, autoComplete: 'postal-code' },
  { name: 'usuario', label: 'Usuario', type: 'text', requerido: false, autoComplete: 'username' },
  { name: 'password', label: 'Contraseña', type: 'password', requerido: false, autoComplete: 'new-password' },
];
