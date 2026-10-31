/**
 * Pestaña 1: Vista «Hoy» minimalista y enfocada en una única acción principal:
 * - Muestra automáticamente la jornada actual y destaca la «Siguiente parada» según la hora.
 * - Incluye botón grande (>=44px) «Cómo llegar» desde mi ubicación actual.
 * - Integra el Mapa del recorrido de hoy y un desplegable limpio con la Información Útil
 *   (Hotel en Via Palermo 4, Vuelos, 112, Consejos nasoni y Checklist pre-viaje).
 */

import React, { useState } from 'react';
import {
  Navigation,
  Clock,
  Footprints,
  MapPin,
  Headphones,
  Camera,
  ChevronDown,
  ChevronUp,
  Home,
  PhoneCall,
  CloudSun,
  CheckSquare,
  UtensilsCrossed,
  Coins
} from 'lucide-react';
import { Coordinates, DayId, ItineraryData, ItineraryPlace } from '../types/itinerary';
import { PLACE_ENRICHMENTS } from '../data/placeEnrichments';
import { calculateDistanceKm, getGoogleMapsWalkingUrl } from '../utils/maps';
import { DayRouteMiniMap } from './DayRouteMiniMap';
import { UsefulInfoAndChecklistView } from './UsefulInfoAndChecklistView';
import { getDaysSinceRomeFoundation } from '../utils/romanDates';

interface TodayViewProps {
  data: ItineraryData;
  selectedDayId: DayId;
  onSelectDay: (dayId: DayId) => void;
  simulatedTime: string;
  onChangeSimulatedTime: (time: string) => void;
  userCoords: Coordinates | null;
  onRequestGeolocation: () => void;
  geoLoading: boolean;
  onSelectPlace: (place: ItineraryPlace) => void;
  onGoToFullItinerary: () => void;
  onGoToFullMap: () => void;
  onGoToWeather?: () => void;
  onGoToExpenses?: () => void;
  onOpenDiningGuide?: () => void;
  onOpenTrajanGuide?: () => void;
  onOpenNavonaGuide?: () => void;
  onOpenAlbumForPlace: (placeId: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  data,
  selectedDayId,
  onSelectDay,
  simulatedTime,
  onChangeSimulatedTime,
  userCoords,
  onRequestGeolocation,
  geoLoading,
  onSelectPlace,
  onGoToFullItinerary,
  onGoToFullMap,
  onGoToWeather,
  onGoToExpenses,
  onOpenDiningGuide,
  onOpenTrajanGuide,
  onOpenNavonaGuide,
  onOpenAlbumForPlace
}) => {
  const [showUsefulGuide, setShowUsefulGuide] = useState(false);
  const romeChronology = getDaysSinceRomeFoundation();

  const currentDay = data.days.find((d) => d.id === selectedDayId) || data.days[1];

  // Determina la parada actual o siguiente según la hora
  const getActivePlace = (): { current: ItineraryPlace; next: ItineraryPlace | null } => {
    const [simH, simM] = simulatedTime.split(':').map(Number);
    const currentMinutes = simH * 60 + simM;

    for (let i = 0; i < currentDay.places.length; i++) {
      const place = currentDay.places[i];
      const [endH, endM] = place.endTime.split(':').map(Number);
      if (currentMinutes <= endH * 60 + endM) {
        return {
          current: place,
          next: currentDay.places[i + 1] || null
        };
      }
    }
    return {
      current: currentDay.places[currentDay.places.length - 1],
      next: null
    };
  };

  const { current: activePlace, next: nextPlace } = getActivePlace();
  const enrichment = PLACE_ENRICHMENTS[activePlace.id];
  const distanceFromUserKm = userCoords
    ? calculateDistanceKm(userCoords, activePlace.coordinates)
    : null;

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Chips minimalistas para cambiar de jornada + selector de hora */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {data.days.map((day) => {
            const active = day.id === selectedDayId;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`touch-target px-4 py-2 rounded-full text-xs font-bold capitalize transition ${
                  active
                    ? 'bg-roman-terracotta text-white shadow-soft'
                    : 'bg-roman-surface text-roman-muted border border-roman-border hover:text-roman-text'
                }`}
              >
                {day.id}
              </button>
            );
          })}
        </div>

        <label className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-roman-surface border border-roman-border text-xs text-roman-muted">
          <Clock className="w-3.5 h-3.5 text-roman-terracotta" />
          <span>Hora:</span>
          <input
            type="time"
            value={simulatedTime}
            onChange={(e) => onChangeSimulatedTime(e.target.value)}
            className="bg-transparent font-bold text-roman-text focus:outline-none cursor-pointer"
          />
        </label>
      </div>

      {/* BANNER DE FECHA CON AÑO 2026 Y CRONOLOGÍA DESDE LA FUNDACIÓN DE ROMA */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div>
          <span className="text-[10px] font-bold text-roman-terracotta uppercase tracking-wider block">
            Jornada Oficial · Roma 2026
          </span>
          <h2 className="font-serif font-bold text-lg text-roman-text">
            {currentDay.title}
          </h2>
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roman-surface border border-roman-border text-[11px] font-mono text-roman-muted shadow-soft"
          title="Días exactos transcurridos desde el 21 de abril de 753 a.C. calculados en cada ejecución"
        >
          <span className="text-roman-terracotta font-bold">🏛️ {romeChronology.daysFormatted} días</span>
          <span>desde Rómulo ({romeChronology.aucRoman})</span>
        </div>
      </div>

      {/* TARJETA PROTAGONISTA: SIGUIENTE PARADA (Una acción principal clara en pantalla) */}
      <section className="rounded-card bg-roman-surface border border-roman-border shadow-elevated overflow-hidden">
        <div className="p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider">
              Siguiente parada · #{activePlace.order}
            </span>
            <span className="text-xs font-medium text-roman-muted">
              {activePlace.startTime} – {activePlace.endTime} h ({activePlace.recommendedDurationText})
            </span>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text leading-tight">
              {activePlace.nameEs}
            </h2>
            <p className="text-sm italic font-serif text-roman-muted mt-0.5">
              {activePlace.nameIt}
            </p>
          </div>

          <p className="text-sm text-roman-text leading-relaxed">
            {enrichment?.shortSummary || activePlace.historyAndCuriosities.slice(0, 160) + '...'}
          </p>

          {/* Distancia y tiempo desde la parada anterior y hacia la siguiente */}
          <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-roman-terracotta shrink-0" />
              <span>
                A <strong>{activePlace.walkingToNext.distanceKm} km</strong> (
                {activePlace.walkingToNext.timeMinutes} min a pie) de la siguiente:{' '}
                <strong>{nextPlace ? nextPlace.nameEs : activePlace.walkingToNext.toName}</strong>
              </span>
            </div>

            {distanceFromUserKm !== null && (
              <span className="px-2.5 py-1 rounded-full bg-roman-elevated text-roman-text font-bold">
                📍 A {distanceFromUserKm} km de tu GPS
              </span>
            )}
          </div>

          {/* ACCIÓN PRINCIPAL EN PANTALLA (Botón grande >= 48px de alto para usar con el pulgar) */}
          <a
            href={getGoogleMapsWalkingUrl(
              activePlace.coordinates,
              activePlace.nameIt,
              userCoords
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target w-full py-3.5 px-5 rounded-card bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-sm sm:text-base shadow-soft flex items-center justify-center gap-2.5 transition"
          >
            <Navigation className="w-5 h-5" />
            Cómo llegar a pie ahora
          </a>

          {/* Acciones secundarias limpias */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => onSelectPlace(activePlace)}
              className="touch-target py-2.5 px-3 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Headphones className="w-4 h-4 text-roman-terracotta" />
              Ficha & Audio
            </button>

            <button
              onClick={onRequestGeolocation}
              disabled={geoLoading}
              className="touch-target py-2.5 px-3 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <MapPin className="w-4 h-4 text-roman-sage" />
              {geoLoading ? 'GPS...' : userCoords ? 'GPS Activo' : 'Activar GPS'}
            </button>

            <button
              onClick={() => onOpenAlbumForPlace(activePlace.id)}
              className="touch-target py-2.5 px-3 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Camera className="w-4 h-4 text-roman-gold" />
              Subir Foto
            </button>
          </div>
        </div>
      </section>

      {/* MAPA DEL RECORRIDO DE HOY */}
      <DayRouteMiniMap
        day={currentDay}
        hotelCoords={data.tripMeta.accommodation.coordinates}
        activePlaceId={activePlace.id}
        userCoords={userCoords}
        onSelectPlace={onSelectPlace}
        onExpandFullMap={onGoToFullMap}
      />

      {/* ACCESO RÁPIDO A LA SECCIÓN APARTE DE GASTOS Y ADELANTOS */}
      {onGoToExpenses && (
        <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-roman-elevated flex items-center justify-center text-roman-terracotta shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-roman-text">
                Calculadora de Adelantos & Gastos del Viaje
              </h4>
              <p className="text-[11px] text-roman-muted">
                Registro de pagos de hotel, entradas y balance (Superávit / Déficit) en su sección propia.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onGoToExpenses}
            className="touch-target px-3.5 py-2 rounded-xl bg-roman-elevated hover:bg-roman-surface border border-roman-border text-roman-terracotta text-xs font-bold shrink-0 transition"
          >
            Abrir Gastos →
          </button>
        </div>
      )}

      {/* RESUMEN RÁPIDO DE LA JORNADA Y ENLACE AL ITINERARIO COMPLETO */}
      <div className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {onGoToWeather ? (
            <button
              type="button"
              onClick={onGoToWeather}
              className="touch-target flex items-center gap-2 text-xs font-bold text-roman-sage hover:underline"
              title="Abrir previsión horaria completa en Roma"
            >
              <CloudSun className="w-4 h-4" />
              <span>
                {currentDay.weatherSummary.condition} · {currentDay.weatherSummary.tempMax}°/
                {currentDay.weatherSummary.tempMin}°C
              </span>
              <span className="text-[11px] font-normal text-roman-muted">→ Ver previsión horaria</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-roman-sage">
              <CloudSun className="w-4 h-4" />
              {currentDay.weatherSummary.condition} · {currentDay.weatherSummary.tempMax}°/
              {currentDay.weatherSummary.tempMin}°C
            </div>
          )}
          <h3 className="font-serif font-bold text-base text-roman-text">
            {currentDay.title}: {currentDay.places.length} paradas programadas
          </h3>
          <p className="text-xs text-roman-muted">{currentDay.subtitle}</p>
        </div>

        <button
          onClick={onGoToFullItinerary}
          className="touch-target px-4 py-2.5 rounded-xl bg-roman-elevated hover:opacity-90 text-roman-text text-xs font-bold shrink-0 transition"
        >
          Ver línea de tiempo completa →
        </button>
      </div>

      {/* TARJETA DESTACADA: MODO RESTAURANTES & GASTRONOMÍA ROMANA */}
      <div className="rounded-card bg-roman-surface border border-roman-border shadow-soft p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-roman-elevated flex items-center justify-center text-roman-terracotta shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-roman-terracotta">
              Gastronomía Romana · Cenas & Aperitivos
            </span>
            <h3 className="font-serif font-bold text-base text-roman-text">
              Dónde Comer en Monti, Trastevere y Ghetto
            </h3>
            <p className="text-xs text-roman-muted">
              Trattorias tradicionales sin trampas para turistas, las 4 pastas sagradas y heladerías históricas.
            </p>
          </div>
        </div>

        {onOpenDiningGuide && (
          <button
            type="button"
            onClick={onOpenDiningGuide}
            className="touch-target px-4 py-2.5 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white text-xs font-bold shrink-0 shadow-soft flex items-center justify-center gap-1.5 transition"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Ver Restaurantes & Platos</span>
          </button>
        )}
      </div>

      {/* MONOGRÁFICOS ESPECIALES DEL VIAJE: COLUMNA DE TRAJANO Y PIAZZA NAVONA NOCTURNA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Tarjeta Columna de Trajano */}
        <div className="rounded-card bg-roman-surface border border-roman-border shadow-soft p-4 flex flex-col justify-between gap-3 hover:border-roman-terracotta/40 transition">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta">
                🏛️ Escultura Imperial · 113 d.C.
              </span>
              <span className="text-xs font-mono text-roman-muted">Sábado 13:50 h</span>
            </div>
            <h4 className="font-serif font-bold text-base text-roman-text">
              La Columna de Trajano
            </h4>
            <p className="text-xs text-roman-muted leading-relaxed">
              El primer «cómic cinematográfico» en mármol: 200 m de friso en espiral, secretos, la tumba y los 3 mejores miradores.
            </p>
          </div>
          {onOpenTrajanGuide && (
            <button
              type="button"
              onClick={onOpenTrajanGuide}
              className="touch-target w-full py-2.5 px-3.5 rounded-xl bg-roman-elevated hover:bg-roman-surface border border-roman-border text-roman-terracotta font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Ver Monográfico Completo</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Tarjeta Piazza Navona de Noche */}
        <div className="rounded-card bg-gradient-to-br from-[#1F1714] to-[#2B231E] border border-amber-900/40 text-white shadow-soft p-4 flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/40 text-amber-400 border border-amber-500/20">
                🌙 Paseo Exterior Nocturno
              </span>
              <span className="text-xs font-mono text-stone-300">Sábado Noche</span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100">
              Piazza Navona & Las 3 Fuentes
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Estadio de Domiciano iluminado, las 3 fuentes (Bernini, Moro, Neptuno), rivalidad con Borromini y cine.
            </p>
          </div>
          {onOpenNavonaGuide && (
            <button
              type="button"
              onClick={onOpenNavonaGuide}
              className="touch-target w-full py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Ver Visita Nocturna</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>

      {/* DESPLEGABLE LIMPIO DE INFORMACIÓN ÚTIL (Hotel Via Palermo 4, Vuelos, 112, Nasoni y Checklist) */}
      <div className="rounded-card bg-roman-surface border border-roman-border shadow-soft overflow-hidden">
        <button
          type="button"
          onClick={() => setShowUsefulGuide(!showUsefulGuide)}
          className="touch-target w-full p-5 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-roman-elevated flex items-center justify-center text-roman-terracotta">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-roman-text">
                Información Útil, Hotel, Emergencias 112 y Checklist
              </h3>
              <p className="text-xs text-roman-muted">
                Via Palermo 4 · Vuelos · Fuentes Nasoni · Reservas del grupo
              </p>
            </div>
          </div>
          {showUsefulGuide ? (
            <ChevronUp className="w-5 h-5 text-roman-terracotta shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-roman-terracotta shrink-0" />
          )}
        </button>

        {showUsefulGuide && (
          <div className="px-4 pb-5 pt-2 border-t border-roman-border">
            <UsefulInfoAndChecklistView data={data} userCoords={userCoords} />
          </div>
        )}
      </div>

      {/* Accesos rápidos de emergencia y ruta al hotel siempre a mano al pie de Hoy */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={getGoogleMapsWalkingUrl(
            data.tripMeta.accommodation.coordinates,
            'Via Palermo 4, Roma',
            userCoords
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target p-3.5 rounded-card bg-roman-surface border border-roman-border shadow-soft flex items-center justify-center gap-2 text-xs font-bold text-roman-text hover:bg-roman-elevated transition"
        >
          <Home className="w-4 h-4 text-roman-terracotta" />
          Ruta a Via Palermo 4
        </a>
        <a
          href="tel:112"
          className="touch-target p-3.5 rounded-card bg-roman-surface border border-roman-border shadow-soft flex items-center justify-center gap-2 text-xs font-bold text-roman-text hover:bg-roman-elevated transition"
        >
          <PhoneCall className="w-4 h-4 text-roman-terracotta" />
          Emergencias 112
        </a>
      </div>
    </div>
  );
};

