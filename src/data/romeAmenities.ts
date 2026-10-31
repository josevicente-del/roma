/**
 * Coordenadas verificadas de Fuentes de Agua Potable Gratuita («Nasoni») y Baños Públicos
 * Oficiales («P.Stop» / aseos turísticos vigilados) a lo largo de la ruta de nuestro grupo en Roma.
 */

import { Coordinates } from '../types/itinerary';

export interface AmenityPoint {
  id: string;
  type: 'nasone' | 'wc';
  name: string;
  locationHint: string;
  coordinates: Coordinates;
  notes: string;
}

export const ROME_AMENITIES: AmenityPoint[] = [
  // Fuentes Nasoni en ruta
  {
    id: 'nas-1',
    type: 'nasone',
    name: 'Nasone · Piazza Madonna dei Monti',
    locationHint: 'A 3 min de Via Palermo 4 bajando a San Pietro in Vincoli / Coliseo',
    coordinates: { lat: 41.8950, lng: 12.4908 },
    notes: 'Agua fresca de manantial (Acqua Marcia) 24 h gratis. Ideal para rellenar botellas al salir del hotel.'
  },
  {
    id: 'nas-2',
    type: 'nasone',
    name: 'Nasone · Arco de Constantino / Coliseo',
    locationHint: 'Junto al Coliseo y entrada al Foro Romano',
    coordinates: { lat: 41.8899, lng: 12.4907 },
    notes: 'Punto clave para rellenar agua antes o después del control de seguridad del Coliseo.'
  },
  {
    id: 'nas-3',
    type: 'nasone',
    name: 'Nasone · Foros Imperiales (Frente a Trajano)',
    locationHint: 'Via dei Fori Imperiali esquina Largo Corrado Ricci',
    coordinates: { lat: 41.8942, lng: 12.4865 },
    notes: 'Situado en pleno paseo entre el Coliseo y el Foro de Trajano.'
  },
  {
    id: 'nas-4',
    type: 'nasone',
    name: 'Nasone · Barrio Judío / Pórtico de Octavia',
    locationHint: 'Via del Portico d’Ottavia (a 100 m de Vecchia Roma)',
    coordinates: { lat: 41.8926, lng: 12.4785 },
    notes: 'Al lado de vuestra comida del sábado en Vecchia Roma.'
  },
  {
    id: 'nas-5',
    type: 'nasone',
    name: 'Nasone · Piazza di Santa Maria in Trastevere',
    locationHint: 'Lateral de la plaza en Trastevere',
    coordinates: { lat: 41.8894, lng: 12.4704 },
    notes: 'Agua potable fresca en el corazón de la visita guiada del sábado por la tarde.'
  },
  {
    id: 'nas-6',
    type: 'nasone',
    name: 'Nasone · Panteón (Piazza della Rotonda)',
    locationHint: 'Lateral izquierdo de la fuente del Panteón',
    coordinates: { lat: 41.8990, lng: 12.4767 },
    notes: 'Justo frente a las columnas del Panteón.'
  },
  {
    id: 'nas-7',
    type: 'nasone',
    name: 'Fontanina degli Innamorati · Fontana di Trevi',
    locationHint: 'Lateral derecho de la Fontana di Trevi',
    coordinates: { lat: 41.9009, lng: 12.4836 },
    notes: 'Dos caños cruzados de agua potable del acueducto Aqua Virgo.'
  },
  {
    id: 'nas-8',
    type: 'nasone',
    name: 'Nasone · Columnata de San Pedro (Vaticano)',
    locationHint: 'Piazza San Pietro, junto al brazo derecho de Bernini',
    coordinates: { lat: 41.9027, lng: 12.4574 },
    notes: 'Fuente doble vaticana con agua fresca gratuita antes de entrar a la Basílica.'
  },

  // Baños Públicos Oficiales (P.Stop / Aseos de Monumentos)
  {
    id: 'wc-1',
    type: 'wc',
    name: 'WC Oficial · Interior Coliseo y Foro Romano',
    locationHint: 'Junto a las taquillas y salida hacia Arco de Tito',
    coordinates: { lat: 41.8904, lng: 12.4915 },
    notes: 'Gratuitos con la entrada del Coliseo/Foro. Limpios y vigilados.'
  },
  {
    id: 'wc-2',
    type: 'wc',
    name: 'WC Basílica de San Juan de Letrán',
    locationHint: 'Lateral del pórtico / zona de claustro',
    coordinates: { lat: 41.8856, lng: 12.5052 },
    notes: 'Muy recomendables a mediodía del sábado antes de caminar hacia el Foro de Trajano.'
  },
  {
    id: 'wc-3',
    type: 'wc',
    name: 'P.Stop Oficial · Piazza Venezia / Foros',
    locationHint: 'Subida lateral al Vittoriano (Piazza Venezia)',
    coordinates: { lat: 41.8951, lng: 12.4828 },
    notes: 'Baño público municipal atendido por personal (P.Stop, ~1 €, acepta tarjeta).'
  },
  {
    id: 'wc-4',
    type: 'wc',
    name: 'P.Stop Oficial · Trastevere (Piazza San Calisto / Belli)',
    locationHint: 'Entrada al barrio de Trastevere',
    coordinates: { lat: 41.8888, lng: 12.4730 },
    notes: 'Punto de aseo atendido justo antes de empezar el tour de las 17:00 h.'
  },
  {
    id: 'wc-5',
    type: 'wc',
    name: 'WC Oficial · Columnata de San Pedro (Vaticano)',
    locationHint: 'Bajo la columnata derecha tras el control de seguridad',
    coordinates: { lat: 41.9031, lng: 12.4569 },
    notes: 'Gratuitos, amplios y muy limpios dentro de la Plaza de San Pedro.'
  }
];

