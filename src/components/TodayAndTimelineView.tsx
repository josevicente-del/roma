/**
 * Pestaña 2: Vista «Itinerario»
 * - Incluye su propio Mapa de Recorrido del día seleccionado en la parte superior.
 * - Línea de tiempo vertical con paradas numeradas.
 * - La parada actual queda claramente resaltada y se muestra la distancia y el tiempo a la siguiente.
 * - Textos breves y limpios con desplegable de lógica geográfica y Plan B de lluvia, además de acceso
 *   directo a las audioguías gratuitas, tips de fotos y películas.
 */

import React, { useState } from 'react';
import {
  Footprints,
  Navigation,
  Headphones,
  Camera,
  Film,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Train
} from 'lucide-react';
import { Coordinates, DayId, DaySchedule, ItineraryPlace } from '../types/itinerary';
import { PLACE_ENRICHMENTS } from '../data/placeEnrichments';
import { getGoogleMapsWalkingUrl } from '../utils/maps';
import { DayRouteMiniMap } from './DayRouteMiniMap';

interface TodayAndTimelineViewProps {
  days: DaySchedule[];
  selectedDayId: DayId;
  onSelectDay: (dayId: DayId) => void;
  simulatedTime: string;
  hotelCoords: Coordinates;
  onSelectPlace: (place: ItineraryPlace) => void;
  onOpenMapForDay: (dayId: DayId) => void;
  onOpenAlbumForPlace: (placeId: string) => void;
  userCoords: Coordinates | null;
}

export const TodayAndTimelineView: React.FC<TodayAndTimelineViewProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  simulatedTime,
  hotelCoords,
  onSelectPlace,
  onOpenMapForDay,
  onOpenAlbumForPlace,
  userCoords
}) => {
  const [showDayLogic, setShowDayLogic] = useState(false);

  const currentDay = days.find((d) => d.id === selectedDayId) || days[1];

  // Determina cuál es la parada activa según la hora
  const getActivePlaceId = (): string => {
    const [simH, simM] = simulatedTime.split(':').map(Number);
    const currentMinutes = simH * 60 + simM;

    for (const place of currentDay.places) {
      const [endH, endM] = place.endTime.split(':').map(Number);
      if (currentMinutes <= endH * 60 + endM) {
        return place.id;
      }
    }
    return currentDay.places[currentDay.places.length - 1].id;
  };

  const activePlaceId = getActivePlaceId();

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Selector de Día con Chips grandes (>=44px) */}
      <div className="grid grid-cols-3 gap-2">
        {days.map((day) => {
          const isSelected = day.id === selectedDayId;
          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`touch-target py-2.5 px-3 rounded-card text-center transition border ${
                isSelected
                  ? 'bg-roman-terracotta text-white border-transparent shadow-soft font-bold'
                  : 'bg-roman-surface text-roman-muted border-roman-border hover:text-roman-text font-medium'
              }`}
            >
              <div className="text-xs sm:text-sm capitalize">{day.id}</div>
              <div className="text-[11px] opacity-80">
                {day.id === 'viernes'
                  ? '6 Nov · 22h'
                  : day.id === 'sabado'
                  ? '7 Nov · 9,8 km'
                  : '8 Nov · 7,6 km'}
              </div>
            </button>
          );
        })}
      </div>

      {/* MAPA DEL DÍA SELECCIONADO DONDE SE VE EL RECORRIDO Y LOS LUGARES A VISITAR */}
      <DayRouteMiniMap
        day={currentDay}
        hotelCoords={hotelCoords}
        activePlaceId={activePlaceId}
        userCoords={userCoords}
        onSelectPlace={onSelectPlace}
        onExpandFullMap={() => onOpenMapForDay(currentDay.id)}
      />

      {/* Cabecera limpia del día con desplegable opcional de lógica del orden y Plan B */}
      <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="font-serif font-bold text-lg text-roman-text">
              {currentDay.title}
            </h2>
            <p className="text-xs text-roman-muted">{currentDay.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowDayLogic(!showDayLogic)}
            className="touch-target px-3 py-1.5 rounded-xl bg-roman-bg text-roman-terracotta text-xs font-bold inline-flex items-center gap-1"
          >
            <span>Lógica y Plan B</span>
            {showDayLogic ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showDayLogic && (
          <div className="mt-3 pt-3 border-t border-roman-border space-y-2 text-xs text-roman-muted leading-relaxed">
            <p>
              <strong className="text-roman-text">Orden optimizado:</strong>{' '}
              {currentDay.routeLogicExplanation}
            </p>
            <p>
              <strong className="text-roman-text">Plan B (Lluvia / Noviembre):</strong>{' '}
              {currentDay.planBSummary}
            </p>
          </div>
        )}
      </div>

      {/* LÍNEA DE TIEMPO VERTICAL CON PARADAS NUMERADAS */}
      <div className="relative pl-4 sm:pl-6 space-y-5 before:content-[''] before:absolute before:left-[19px] sm:before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-roman-border">
        {currentDay.places.map((place) => {
          const isCurrent = place.id === activePlaceId;
          const enrichment = PLACE_ENRICHMENTS[place.id];

          return (
            <div key={place.id} className="relative pl-6 sm:pl-8">
              {/* Círculo numerado de la parada */}
              <div
                className={`absolute -left-1.5 sm:-left-1 top-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                  isCurrent
                    ? 'bg-roman-terracotta text-white ring-4 ring-[#B5532F]/25 scale-110'
                    : place.isFixed
                    ? 'bg-[#2B2420] text-[#F7F3EC]'
                    : 'bg-roman-surface text-roman-text border-2 border-roman-terracotta'
                }`}
              >
                {place.order}
              </div>

              {/* Tarjeta redondeada (16px) de la parada */}
              <div
                onClick={() => onSelectPlace(place)}
                className={`cursor-pointer rounded-card p-5 transition border ${
                  isCurrent
                    ? 'bg-roman-surface border-2 border-roman-terracotta shadow-elevated'
                    : 'bg-roman-surface border-roman-border shadow-soft hover:border-roman-terracotta/50'
                }`}
              >
                {/* Franja horaria y etiquetas */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-roman-terracotta">
                      {place.startTime} – {place.endTime} h
                    </span>
                    <span className="text-xs text-roman-muted">
                      · {place.recommendedDurationText}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-roman-terracotta text-white text-[10px] font-bold uppercase tracking-wider">
                        Parada actual
                      </span>
                    )}
                    {place.isFixed && (
                      <span className="px-2 py-0.5 rounded-full bg-roman-elevated text-roman-text text-[10px] font-bold uppercase">
                        Fijo
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-roman-bg text-roman-muted text-[10px] font-medium border border-roman-border">
                      {place.ticketInfo.type}
                    </span>
                  </div>
                </div>

                {/* Nombre en español e italiano */}
                <h3 className="font-serif font-bold text-lg text-roman-text leading-snug">
                  {place.nameEs}
                </h3>
                <p className="text-xs italic font-serif text-roman-muted">
                  {place.nameIt}
                </p>

                {/* Resumen breve sin sobrecargar */}
                <p className="text-xs sm:text-sm text-roman-text mt-2 leading-relaxed">
                  {enrichment?.shortSummary || place.historyAndCuriosities.slice(0, 140) + '...'}
                </p>

                {/* Chips informativos de lo que incluye la ficha (Audioguía gratis, Foto Tip y Cine) */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-roman-bg text-roman-text text-[11px] font-medium border border-roman-border">
                    <Headphones className="w-3 h-3 text-roman-terracotta" />
                    Audioguía gratis
                  </span>
                  {enrichment?.photoTips && enrichment.photoTips.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-roman-bg text-roman-text text-[11px] font-medium border border-roman-border">
                      <Camera className="w-3 h-3 text-roman-sage" />
                      Tip Foto
                    </span>
                  )}
                  {enrichment?.cinemaTips && enrichment.cinemaTips.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-roman-bg text-roman-text text-[11px] font-medium border border-roman-border">
                      <Film className="w-3 h-3 text-roman-gold" />
                      Cine: «{enrichment.cinemaTips[0].movieTitle}»
                    </span>
                  )}
                </div>

                {/* Aviso horario si es crítico */}
                {place.importantWarnings.length > 0 && (
                  <div className="mt-3 p-2.5 rounded-xl bg-roman-elevated text-xs text-roman-text flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-roman-terracotta shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{place.importantWarnings[0]}</span>
                  </div>
                )}

                {/* DISTANCIA Y TIEMPO A LA SIGUIENTE PARADA + ACCIÓN */}
                <div
                  className="mt-4 pt-3 border-t border-roman-border flex flex-wrap items-center justify-between gap-2 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5 text-roman-muted">
                    <Footprints className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                    <span>
                      Siguiente ({place.walkingToNext.toName}):{' '}
                      <strong className="text-roman-text">
                        {place.walkingToNext.distanceKm > 0
                          ? `${place.walkingToNext.distanceKm} km · ${place.walkingToNext.timeMinutes} min`
                          : `${place.walkingToNext.timeMinutes} min`}
                      </strong>
                    </span>
                    {place.walkingFromPrev.publicTransportAlternative && (
                      <span className="inline-flex items-center gap-1 text-roman-sage font-bold ml-1">
                        <Train className="w-3.5 h-3.5" /> Metro opc.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getGoogleMapsWalkingUrl(
                        place.coordinates,
                        place.nameIt,
                        userCoords
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target px-3 py-2 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text font-bold inline-flex items-center gap-1.5 transition"
                    >
                      <Navigation className="w-3.5 h-3.5 text-roman-terracotta" />
                      Ruta
                    </a>
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="touch-target px-3.5 py-2 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold transition"
                    >
                      Ver ficha
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
