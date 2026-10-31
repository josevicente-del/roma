/**
 * Punto de entrada de la aplicación React.
 * Importa las dos familias tipográficas autoalojadas (Playfair Display y DM Sans)
 * y la hoja de estilos local de Leaflet para garantizar funcionamiento 100% offline.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import 'leaflet/dist/leaflet.css';
import App from './App';
import './index.css';

// Registro del Service Worker para funcionamiento offline en las calles de Roma
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.warn('Aviso en registro de Service Worker:', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
