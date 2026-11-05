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
  Coins,
  AlertTriangle,
  CheckCircle2,
  Crosshair,
  Radio,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { Coordinates, DayId, ItineraryData, ItineraryPlace } from '../types/itinerary';
import { PLACE_ENRICHMENTS } from '../data/placeEnrichments';
import { calculateDistanceKm, getGoogleMapsWalkingUrl } from '../utils/maps';
import { DayRouteMiniMap } from './DayRouteMiniMap';
import { UsefulInfoAndChecklistView } from './UsefulInfoAndChecklistView';
import { getDaysSinceRomeFoundation, getRomeRealTimeAndDay } from '../utils/romanDates';

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
  onGoToReceipts?: () => void;
  onOpenDiningGuide?: () => void;
  onOpenForumGuide?: () => void;
  onOpenTrajanGuide?: () => void;
  onOpenNavonaGuide?: () => void;
  onOpenSecretRomeGuide?: () => void;
  onOpenGelatoRadar?: () => void;
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
  onGoToReceipts,
  onOpenDiningGuide,
  onOpenForumGuide,
  onOpenTrajanGuide,
  onOpenNavonaGuide,
  onOpenSecretRomeGuide,
  onOpenGelatoRadar,
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

  // Cálculo de hora en minutos y horarios previstos
  const [simH, simM] = simulatedTime.split(':').map(Number);
  const currentMinutes = simH * 60 + simM;

  const [startH, startM] = activePlace.startTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const [endH, endM] = activePlace.endTime.split(':').map(Number);
  const endMinutes = endH * 60 + endM;

  // Distancia por GPS a la parada prevista
  const distanceToExpectedKm = userCoords
    ? calculateDistanceKm(userCoords, activePlace.coordinates)
    : null;
  const distanceToExpectedM = distanceToExpectedKm !== null
    ? Math.round(distanceToExpectedKm * 1000)
    : null;

  // Buscar el monumento más cercano a la ubicación real del usuario
  let nearestPlaceToUser: { place: ItineraryPlace; distanceM: number } | null = null;
  if (userCoords) {
    let minD = Infinity;
    let closest: ItineraryPlace | null = null;
    for (const d of data.days) {
      for (const p of d.places) {
        const dKm = calculateDistanceKm(userCoords, p.coordinates);
        if (dKm < minD) {
          minD = dKm;
          closest = p;
        }
      }
    }
    if (closest) {
      nearestPlaceToUser = { place: closest, distanceM: Math.round(minD * 1000) };
    }
  }

  // Comprobación de puntualidad, ubicación y DÍA REAL:
  const realRome = getRomeRealTimeAndDay();
  const isSelectedDayRealToday = !realRome.isTripDay || realRome.realDayId === selectedDayId;

  // Umbral: si estás a <= 250 metros del monumento, se considera "en el lugar"
  const isInExpectedLocation = distanceToExpectedM !== null && distanceToExpectedM <= 250;
  const hasVisitStarted = currentMinutes >= startMinutes;
  const isVisitOngoing = currentMinutes >= startMinutes && currentMinutes <= endMinutes;

  let scheduleStatus: 'green' | 'red' | 'different-day' | 'unknown' = 'unknown';
  let statusBadgeText = '';
  let statusExplanation = '';

  if (!isSelectedDayRealToday && realRome.realDayId) {
    // El usuario está visualizando un día que no coincide con el día real actual
    scheduleStatus = 'different-day';
    statusBadgeText = `🗓️ Viendo ${selectedDayId.toUpperCase()} (Hoy es ${realRome.weekdayName})`;
    statusExplanation = `Estás consultando el itinerario del ${selectedDayId} a las ${simulatedTime} h, pero hoy en Roma es ${realRome.weekdayName}. Pulsa «Sincronizar a Hoy» para comprobar la visita que corresponde en este momento.`;
  } else if (!userCoords) {
    scheduleStatus = 'unknown';
    statusBadgeText = 'GPS Desactivado';
    statusExplanation = `Activa el GPS para comprobar si estás en ${activePlace.nameEs} a las ${activePlace.startTime} h (${selectedDayId}).`;
  } else if (hasVisitStarted) {
    if (isInExpectedLocation) {
      scheduleStatus = 'green';
      statusBadgeText = `🟢 Vas en hora (${selectedDayId})`;
      statusExplanation = `¡Perfecto! Tu GPS confirma que estás en el recinto de ${activePlace.nameEs} (${activePlace.startTime} – ${activePlace.endTime} h).`;
    } else {
      scheduleStatus = 'red';
      statusBadgeText = `🔴 Fuera de lugar previsto (${selectedDayId})`;
      const formattedDist = distanceToExpectedM !== null && distanceToExpectedM >= 1000
        ? `${(distanceToExpectedM / 1000).toFixed(1)} km`
        : `${distanceToExpectedM} m`;
      statusExplanation = `¡Atención! Ha llegado la hora prevista (${activePlace.startTime} h del ${selectedDayId}) y NO estás en ${activePlace.nameEs}. Tu GPS está a ${formattedDist} de distancia.`;
    }
  } else {
    // Aún no ha empezado la visita
    const minutesUntilStart = startMinutes - currentMinutes;
    const walkTimeNeededMin = distanceToExpectedKm ? Math.round(distanceToExpectedKm * 12) : 0;

    if (walkTimeNeededMin > minutesUntilStart && distanceToExpectedM && distanceToExpectedM > 300) {
      scheduleStatus = 'red';
      statusBadgeText = `🔴 Riesgo de retraso (${selectedDayId})`;
      statusExplanation = `La visita a ${activePlace.nameEs} empieza a las ${activePlace.startTime} h (en ${minutesUntilStart} min) y tardarás ~${walkTimeNeededMin} min a pie.`;
    } else {
      scheduleStatus = 'green';
      statusBadgeText = `🟢 Vas en hora (${selectedDayId})`;
      statusExplanation = `Vas a tiempo para el inicio de la visita a ${activePlace.nameEs} (${activePlace.startTime} h).`;
    }
  }

  // Sincroniza tanto el DÍA como la HORA real de Roma en un solo toque
  const handleSetRealDayAndRomeTime = () => {
    const info = getRomeRealTimeAndDay();
    onChangeSimulatedTime(info.timeStr);
    if (info.realDayId) {
      onSelectDay(info.realDayId);
    }
  };

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Selector de jornada + Control de Día y Hora con Semáforo GPS */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Chips de Jornada con insignia de "Hoy" */}
          <div className="flex items-center gap-1.5">
            {data.days.map((day) => {
              const active = day.id === selectedDayId;
              const isToday = day.id === realRome.realDayId;
              return (
                <button
                  key={day.id}
                  onClick={() => onSelectDay(day.id)}
                  className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-roman-terracotta text-white shadow-soft'
                      : isToday
                      ? 'bg-roman-surface text-roman-terracotta border-2 border-roman-terracotta/40 hover:bg-roman-elevated'
                      : 'bg-roman-surface text-roman-muted border border-roman-border hover:text-roman-text'
                  }`}
                >
                  <span>{day.id}</span>
                  {isToday && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-roman-terracotta/15 text-roman-terracotta'
                      }`}
                    >
                      Hoy
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selector de Hora con indicador de semáforo Verde/Rojo/Amarillo */}
          <div className="flex items-center gap-2">
            <label
              className={`touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition shadow-sm ${
                scheduleStatus === 'green'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                  : scheduleStatus === 'red'
                  ? 'bg-red-500/15 border-red-500 text-red-800 dark:text-red-300 animate-pulse'
                  : scheduleStatus === 'different-day'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200'
                  : 'bg-roman-surface border-roman-border text-roman-muted'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Hora:</span>
              <input
                type="time"
                value={simulatedTime}
                onChange={(e) => onChangeSimulatedTime(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              />
              <span className="text-[11px] font-sans ml-0.5">
                {scheduleStatus === 'green'
                  ? '🟢'
                  : scheduleStatus === 'red'
                  ? '🔴'
                  : scheduleStatus === 'different-day'
                  ? '🟡'
                  : '⚪'}
              </span>
            </label>

            <button
              onClick={handleSetRealDayAndRomeTime}
              className="touch-target px-2.5 py-1.5 rounded-full bg-roman-surface border border-roman-border text-roman-muted hover:text-roman-text text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
              title="Poner el día y la hora real actual de Roma"
            >
              <Calendar className="w-3 h-3 text-roman-terracotta" />
              <span>Día y Hora Real</span>
            </button>
          </div>
        </div>

        {/* MÓDULO INTELIGENTE: DÓNDE ESTÁS (GPS REAL) VS DÓNDE DEBERÍAS ESTAR (PREVISTO) */}
        <div
          className={`rounded-2xl border p-4 shadow-sm space-y-3 transition-colors ${
            scheduleStatus === 'green'
              ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
              : scheduleStatus === 'red'
              ? 'bg-red-500/10 border-red-500/50 text-red-950 dark:text-red-200'
              : scheduleStatus === 'different-day'
              ? 'bg-amber-500/10 border-amber-500/50 text-amber-950 dark:text-amber-200'
              : 'bg-roman-surface border-roman-border text-roman-text'
          }`}
        >
          {/* Cabecera del Semáforo */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-current/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {scheduleStatus === 'green'
                  ? '🟢'
                  : scheduleStatus === 'red'
                  ? '🔴'
                  : scheduleStatus === 'different-day'
                  ? '🟡'
                  : '📡'}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {statusBadgeText}
                </span>
                <p className="text-xs opacity-90 leading-snug">
                  {statusExplanation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Botón rápido para saltar a Hoy si se está viendo otro día */}
              {scheduleStatus === 'different-day' && realRome.realDayId && (
                <button
                  onClick={handleSetRealDayAndRomeTime}
                  className="touch-target px-2.5 py-1 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Ir a Hoy ({realRome.weekdayName})</span>
                </button>
              )}

              {/* Botón GPS */}
              <button
                onClick={onRequestGeolocation}
                disabled={geoLoading}
                className={`touch-target px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                  userCoords
                    ? 'bg-roman-surface border border-current/20 text-current shadow-sm'
                    : 'bg-roman-terracotta text-white shadow-soft animate-pulse'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>{geoLoading ? 'Localizando...' : userCoords ? 'GPS Activo' : 'Activar GPS'}</span>
              </button>
            </div>
          </div>

          {/* Comparativa: Dónde estás vs Dónde deberías estar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
            {/* 1. Dónde estás (GPS Real) */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-roman-terracotta flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Tu Ubicación GPS Actual:
              </span>
              {userCoords ? (
                <div>
                  <div className="font-bold text-xs text-roman-text">
                    {isInExpectedLocation
                      ? `En el recinto de ${activePlace.nameEs}`
                      : nearestPlaceToUser
                      ? `A ${nearestPlaceToUser.distanceM} m de ${nearestPlaceToUser.place.nameEs}`
                      : 'Posición GPS detectada'}
                  </div>
                  <span className="text-[11px] text-roman-muted font-mono block">
                    {userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-roman-muted italic">
                  Ubicación no disponible. Pulsa «Activar GPS» arriba para cotejar tu posición.
                </p>
              )}
            </div>

            {/* 2. Dónde deberías estar (Itinerario) */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Visita Prevista ({selectedDayId.toUpperCase()}) a las {simulatedTime} h:
              </span>
              <div>
                <div className="font-bold text-xs text-roman-text flex items-center justify-between">
                  <span>{activePlace.nameEs}</span>
                  <span className="font-mono text-[11px] text-roman-muted">
                    {activePlace.startTime} – {activePlace.endTime} h
                  </span>
                </div>
                <p className="text-[11px] text-roman-muted line-clamp-1">{activePlace.address}</p>
              </div>
            </div>
          </div>

          {/* Alerta de acción si está en rojo */}
          {scheduleStatus === 'red' && (
            <div className="pt-1">
              <a
                href={getGoogleMapsWalkingUrl(
                  activePlace.coordinates,
                  activePlace.nameIt,
                  userCoords
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Ruta inmediata a pie hacia {activePlace.nameEs}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          )}
        </div>
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

            {distanceToExpectedKm !== null && (
              <span className="px-2.5 py-1 rounded-full bg-roman-elevated text-roman-text font-bold">
                📍 A {distanceToExpectedKm} km de tu GPS
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

      {/* ACCESO RÁPIDO A LA SECCIÓN DE GASTOS Y FOTOS DE TIQUETS */}
      {onGoToExpenses && (
        <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-roman-elevated flex items-center justify-center text-roman-terracotta shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-roman-text">
                Gastos del Viaje & Buzón de Tiquets
              </h4>
              <p className="text-[11px] text-roman-muted">
                Calculadora de Bizums, balance grupal y fotos de recibos de restaurantes y entradas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onGoToReceipts && (
              <button
                type="button"
                onClick={onGoToReceipts}
                className="touch-target px-3.5 py-2 rounded-xl bg-roman-surface hover:bg-roman-elevated border border-roman-border text-roman-text text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>🧾 Tiquets</span>
              </button>
            )}
            <button
              type="button"
              onClick={onGoToExpenses}
              className="touch-target px-3.5 py-2 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white text-xs font-bold transition shadow-soft"
            >
              Balances →
            </button>
          </div>
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

      {/* MONOGRÁFICOS ESPECIALES DEL VIAJE: FORO ROMANO 80 MIN, COLUMNA DE TRAJANO Y PIAZZA NAVONA */}
      <div className="space-y-3.5">
        {/* Tarjeta Destacada: Guía del Foro Romano en 80 Minutos */}
        <div className="rounded-card bg-gradient-to-br from-[#2B2420] via-[#382B24] to-[#1E1815] border border-amber-800/40 text-white shadow-soft p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-2xl shrink-0">
              🏛️
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  ⏱️ Visita Interior Calculada: 80 Minutos
                </span>
                <span className="text-xs font-mono text-stone-300">Sábado 10:30 h</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-100">
                Guía del Foro Romano & 8 Infografías
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                Arco de Tito, Basílica de Majencio, Vestales, Tumba de Julio César, Curia Julia y Septimio Severo. Incluye reconstrucciones visuales, qué queda vs cómo era y audioguía con voz natural.
              </p>
            </div>
          </div>

          {onOpenForumGuide && (
            <button
              type="button"
              onClick={onOpenForumGuide}
              className="touch-target px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm shrink-0 shadow-md flex items-center justify-center gap-2 transition"
            >
              <span>Abrir Guía de 80′</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Dos tarjetas en paralelo: Columna de Trajano y Piazza Navona Nocturna */}
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

      {/* DOS NUEVAS EXPERIENCIAS: ROMA SECRETA & TRUCOS ÓPTICOS + RADAR DE GELATO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Tarjeta Roma Secreta & Trucos Ópticos */}
        <div className="rounded-card bg-gradient-to-br from-[#2D2118] via-[#201813] to-[#17110E] border border-roman-border text-white shadow-soft p-4 flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                👁️ Matemática & Trampantojo
              </span>
              <span className="text-xs font-mono text-stone-300">Cerca de la Ruta</span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100">
              Roma Secreta & Trucos Ópticos
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              La Falsa Perspectiva de Borromini (8 m que parecen 40 m), la Falsa Cúpula de San Ignacio y el Ojo de la Cerradura de Malta.
            </p>
          </div>
          {onOpenSecretRomeGuide && (
            <button
              type="button"
              onClick={onOpenSecretRomeGuide}
              className="touch-target w-full py-2.5 px-3.5 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>Descubrir Trucos Ópticos</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Tarjeta Radar de Gelato Auténtico */}
        <div className="rounded-card bg-roman-surface border border-roman-border shadow-soft p-4 flex flex-col justify-between gap-3 hover:border-amber-500/40 transition">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300">
                🍦 El Test del Gelato Real
              </span>
              <span className="text-xs font-mono text-roman-terracotta font-semibold">Top 7 Heladerías</span>
            </div>
            <h4 className="font-serif font-bold text-base text-roman-text">
              Radar de Gelato Auténtico
            </h4>
            <p className="text-xs text-roman-muted leading-relaxed">
              Aprende a esquivar el helado químico industrial (regla del pistacho y montañas) y encuentra Frigidarium, Giolitti o Fatamorgana a 4′ del hotel.
            </p>
          </div>
          {onOpenGelatoRadar && (
            <button
              type="button"
              onClick={onOpenGelatoRadar}
              className="touch-target w-full py-2.5 px-3.5 rounded-xl bg-roman-elevated hover:bg-roman-surface border border-roman-border text-roman-text font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Abrir Radar de Gelato</span>
              <span>→</span>
            </button>
          )}
        </div>
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

