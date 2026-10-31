/**
 * Definición de tipos de datos para la Guía de Viaje Interactiva y Álbum de Roma.
 * Incluye soporte para los 5 viajeros (Laura, José Antonio, Mónica, José Vicente y Beatriz),
 * audioguías gratuitas, consejos de fotografía y curiosidades de cine rodado en cada lugar.
 */

export type DayId = 'viernes' | 'sabado' | 'domingo';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NearbyBonus {
  nameEs: string;
  nameIt: string;
  distanceMeters: number;
  description: string;
}

export interface FreeAudioGuideLink {
  title: string;
  provider: string;
  language: string;
  url: string;
  durationApprox?: string;
}

export interface CinemaLocationTip {
  movieTitle: string;
  directorAndYear: string;
  sceneDescription: string;
}

export interface ItineraryPlace {
  id: string;
  order: number;
  day: DayId;
  dateStr: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  isFixed: boolean;
  category: 'monumento' | 'iglesia' | 'restaurante' | 'barrio' | 'logistica';
  nameEs: string;
  nameIt: string;
  coordinates: Coordinates;
  address: string;
  heroImageGradient?: [string, string];
  shortSummary?: string;
  historyAndCuriosities: string;
  architectureAndArtDetails?: string;
  mustSeeHighlights?: string[];
  photoTips?: string[];
  cinemaTips?: CinemaLocationTip[];
  audioGuideScript?: string;
  freeAudioGuideLinks?: FreeAudioGuideLink[];
  recommendedDurationText: string;
  openingHours: string;
  ticketInfo: {
    type: 'Gratuita' | 'De pago' | 'Restaurante / Reserva';
    priceApprox: string;
    bookingRequired: boolean;
    bookingAdvice: string;
  };
  importantWarnings: string[];
  practicalTips: string[];
  planB: string;
  walkingFromPrev: {
    fromName: string;
    distanceKm: number;
    timeMinutes: number;
    routeNotes: string;
    publicTransportAlternative?: string;
  };
  walkingToNext: {
    toName: string;
    distanceKm: number;
    timeMinutes: number;
  };
  nearbyBonus?: NearbyBonus[];
}

export interface DaySchedule {
  id: DayId;
  title: string;
  subtitle: string;
  date: string;
  weatherSummary: {
    tempMax: number;
    tempMin: number;
    condition: string;
    rainChance: number;
    advice: string;
  };
  totalWalkingKm: number;
  routeLogicExplanation: string;
  planBSummary: string;
  places: ItineraryPlace[];
}

export interface TravelerProfile {
  id: 'laura' | 'jose-antonio' | 'monica' | 'jose-vicente' | 'beatriz';
  name: string;
  roleTitle: string;
  color: string;
  bgGradient: string;
  initials: string;
  badgeText: string;
}

export interface SharedPhoto {
  id: string;
  url: string;
  placeId: string;
  placeName: string;
  day: DayId;
  authorId: TravelerProfile['id'];
  authorName: string;
  caption: string;
  takenAt: string;
  width: number;
  height: number;
  sizeKb: number;
}

export interface PreTripCheckItem {
  id: string;
  category: 'Reservas Críticas' | 'Horarios y Misas' | 'Documentación y Logística' | 'Equipaje Noviembre';
  title: string;
  description: string;
  urgent: boolean;
  link?: string;
}

export interface ItineraryData {
  tripMeta: {
    title: string;
    dates: string;
    groupSize: number;
    travelers: string[];
    accommodation: {
      name: string;
      address: string;
      zone: string;
      notes: string;
      coordinates: Coordinates;
    };
    flights: {
      arrival: string;
      departure: string;
      hotelExitSunday: string;
      transferAdvice: string;
    };
  };
  days: DaySchedule[];
  preTripChecklist: PreTripCheckItem[];
}
