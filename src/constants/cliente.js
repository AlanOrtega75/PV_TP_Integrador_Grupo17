// Estado inicial del formulario de alta. Se usan campos "planos" (sin objetos
// anidados) para que el manejo de los inputs controlados sea simple y directo.
export const CLIENTE_INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  ciudad: '',
  usuario: '',
  password: '',
};

// Definición declarativa de los campos del formulario. Permite generar los
// inputs con un .map() en lugar de repetir el mismo <TextField> siete veces.
// El campo autoComplete ayuda al navegador (y a la accesibilidad) a sugerir valores.
export const CAMPOS_CLIENTE = [
  { name: 'nombre', label: 'Nombre', type: 'text', requerido: true, autoComplete: 'given-name' },
  { name: 'apellido', label: 'Apellido', type: 'text', requerido: true, autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', requerido: true, autoComplete: 'email', anchoCompleto: true },
  { name: 'telefono', label: 'Teléfono', type: 'tel', requerido: false, autoComplete: 'tel' },
  { name: 'ciudad', label: 'Ciudad', type: 'text', requerido: false, autoComplete: 'address-level2' },
  { name: 'usuario', label: 'Usuario', type: 'text', requerido: false, autoComplete: 'username' },
  { name: 'password', label: 'Contraseña', type: 'password', requerido: false, autoComplete: 'new-password' },
];
