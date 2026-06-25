import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite. El plugin de React habilita el Fast Refresh y resuelve
// correctamente los imports de los íconos de MUI (@mui/icons-material).
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Garantiza una única instancia de emotion (motor de estilos de MUI)
    // para evitar el aviso de "multiple instances" al optimizar dependencias.
    dedupe: ['@emotion/react', '@emotion/styled'],
  },
});
