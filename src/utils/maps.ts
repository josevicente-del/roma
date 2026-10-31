/**
 * Utilidades de cálculo de rutas a pie, distancias (fórmula de Haversine)
 * y enlaces profundos (Deep Links) para Google Maps y Apple Maps.
 */

import { Coordinates } from '../types/itinerary';

/**
 * Calcula la distancia en línea recta (en kilómetros) entre dos coordenadas GPS
 * utilizando la fórmula esférica de Haversine.
 */
export function calculateDistanceKm(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawKm = R * c;
  // Aplicamos factor urbano de tortuosidad de calles de Roma (~1.25x)
  return Math.round(rawKm * 1.25 * 100) / 100;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Genera el enlace para abrir la ruta a pie en Google Maps hasta un destino,
 * partiendo opcionalmente de unas coordenadas de origen o desde la ubicación GPS actual del móvil.
 */
export function getGoogleMapsWalkingUrl(
  destination: Coordinates,
  destinationName: string,
  origin?: Coordinates | null
): string {
  const destParam = `${destination.lat},${destination.lng}`;
  if (origin) {
    const originParam = `${origin.lat},${origin.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${originParam}&destination=${destParam}&travelmode=walking`;
  }
  const encodedQuery = encodeURIComponent(`${destinationName}, Roma`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destParam}&destination_place_id=${encodedQuery}&travelmode=walking`;
}

/**
 * Genera el enlace para abrir la ruta a pie directamente en Apple Maps (ideal para iOS/iPhone).
 */
export function getAppleMapsWalkingUrl(
  destination: Coordinates,
  destinationName: string,
  origin?: Coordinates | null
): string {
  const label = encodeURIComponent(destinationName);
  if (origin) {
    return `https://maps.apple.com/?saddr=${origin.lat},${origin.lng}&daddr=${destination.lat},${destination.lng}&dirflg=w&q=${label}`;
  }
  return `https://maps.apple.com/?daddr=${destination.lat},${destination.lng}&dirflg=w&q=${label}`;
}

