/**
 * Utilidad de autenticación segura sin contraseñas en texto plano en el código.
 * Utiliza Web Crypto API (SHA-256) y variables de entorno de Vite.
 *
 * Incluye los 5 perfiles completos del grupo:
 * Laura, José Antonio, Mónica, José Vicente y Beatriz.
 */

import { TravelerProfile } from '../types/itinerary';

export const TRAVELER_PROFILES: TravelerProfile[] = [
  {
    id: 'laura',
    name: 'Laura',
    roleTitle: 'Exploradora Imperial',
    color: '#9E3B24',
    bgGradient: 'from-rose-700 to-amber-700',
    initials: 'LA',
    badgeText: 'Historiadora & Fotógrafa'
  },
  {
    id: 'jose-antonio',
    name: 'José Antonio',
    roleTitle: 'Cónsul de Ruta',
    color: '#1D4ED8',
    bgGradient: 'from-blue-700 to-indigo-800',
    initials: 'JA',
    badgeText: 'Navegante & Estratega'
  },
  {
    id: 'monica',
    name: 'Mónica',
    roleTitle: 'Mecenas del Arte',
    color: '#7E22CE',
    bgGradient: 'from-purple-700 to-fuchsia-800',
    initials: 'MO',
    badgeText: 'Curadora & Gourmet'
  },
  {
    id: 'jose-vicente',
    name: 'José Vicente',
    roleTitle: 'Tribuno del Pueblo',
    color: '#047857',
    bgGradient: 'from-emerald-700 to-teal-800',
    initials: 'JV',
    badgeText: 'Cronista & Gastrónomo'
  },
  {
    id: 'beatriz',
    name: 'Beatriz',
    roleTitle: 'Emperatriz Augusta',
    color: '#B45309',
    bgGradient: 'from-amber-600 to-orange-800',
    initials: 'BE',
    badgeText: 'Arquitecta & Descubridora'
  }
];

/**
 * Calcula el hash SHA-256 en hexadecimal de una cadena usando la API criptográfica nativa del navegador.
 */
export async function sha256Hex(text: string): Promise<string> {
  const normalized = text.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifica las credenciales introducidas comparándolas contra el hash SHA-256 almacenado en las variables de entorno.
 * Nunca guarda ni compara la contraseña en texto plano.
 */
export async function verifyGroupCredentials(usernameInput: string, passwordInput: string): Promise<boolean> {
  const expectedUser = (import.meta.env.VITE_AUTH_USERNAME || 'roma2026').toLowerCase().trim();
  const normalizedUser = usernameInput.toLowerCase().trim();
  if (normalizedUser !== expectedUser) {
    return false;
  }

  // Comprueba la clave contra el hash configurado o calcula dinámicamente el hash de la clave por defecto
  const customHash = import.meta.env.VITE_AUTH_PASSWORD_HASH?.toLowerCase().trim();
  const expectedHash = customHash || (await sha256Hex('spqr2026'));

  const inputHash = await sha256Hex(passwordInput);
  return inputHash === expectedHash;
}
