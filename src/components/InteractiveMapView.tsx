/**
 * Pestaña 3: Vista «Mapa»
 * Incluye:
 * - Mapa individual del día seleccionado o vista simultánea de los 3 Días (Viernes, Sábado y Domingo).
 * - Interruptor para mostrar/ocultar las Fuentes de Agua Potable «Nasoni» (💧) y Baños Públicos «P.Stop» (WC) en el recorrido.
 * - Botón «Descargar Mapa Offline» que pre-cachea en el Service Worker las teselas de OpenStreetMap del centro de Roma.
 */

import React, { useState } from 'react';
import {
  Footprints,
  MapPin,
  Navigation,
  Layers,
  Droplets,
  DownloadCloud,
  CheckCircle2
} from 'lucide-react';
import { Coordinates, DayId, DaySchedule, ItineraryPlace } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';
import { DayRouteMiniMap } from './DayRouteMiniMap';

interface InteractiveMapViewProps {
  days: DaySchedule[];
  selectedDayId: DayId;
  onSelectDay: (dayId: DayId) => void;
  hotelCoords: Coordinates;
  hotelAddress: string;
  userCoords: Coordinates | null;
  onRequestGeolocation: () => void;
  onSelectPlace: (place: ItineraryPlace) => void;
}

// Convierte latitud/longitud a coordenadas de tesela X/Y de OpenStreetMap
function latLngToTileXY(lat: number, lng: number, zoom: number): [number, number] {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return [x, y];
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  hotelCoords,
  userCoords,
  onRequestGeolocation,
  onSelectPlace
}) => {
  const [showAllDaysMaps, setShowAllDaysMaps] = useState<boolean>(false);
  const [showAmenities, setShowAmenities] = useState<boolean>(true);
  const [precacheStatus, setPrecacheStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [precacheProgress, setPrecacheProgress] = useState<string>('');

  const currentDay = days.find((d) => d.id === selectedDayId) || days[1];

  // Pre-descarga las teselas de OpenStreetMap del centro de Roma (zoom 13, 14 y 15) para uso Offline
  const handleDownloadOfflineTiles = async () => {
    setPrecacheStatus('loading');
    const urls: string[] = [];

    // Caja delimitadora de nuestro itinerario en Roma (Vaticano a San Juan de Letrán)
    const minLat = 41.883;
    const maxLat = 41.908;
    const minLng = 12.45;
    const maxLng = 12.509;

    for (const z of [13, 14, 15]) {
      const [xMin, yMax] = latLngToTileXY(minLat, minLng, z);
      const [xMax, yMin] = latLngToTileXY(maxLat, maxLng, z);
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          urls.push(`https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`);
        }
      }
    }

    let count = 0;
    for (const tileUrl of urls) {
      count++;
      setPrecacheProgress(`${count}/${urls.length}`);
      try {
        await fetch(tileUrl, { mode: 'no-cors' });
      } catch {
        // Ignorar si alguna tesela falla
      }
    }

    setPrecacheStatus('done');
    setTimeout(() => setPrecacheStatus('idle'), 5000);
  };

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Chips superiores de Día y Capas */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {days.map((day) => {
              const active = !showAllDaysMaps && day.id === selectedDayId;
              return (
                <button
                  key={day.id}
                  onClick={() => {
                    setShowAllDaysMaps(false);
                    onSelectDay(day.id);
                  }}
                  className={`touch-target px-4 py-2 rounded-full text-xs font-bold capitalize transition ${
                    active
                      ? 'bg-roman-terracotta text-white shadow-soft'
                      : 'bg-roman-surface text-roman-muted border border-roman-border hover:text-roman-text'
                  }`}
                >
                  {day.id} ({day.places.length})
                </button>
              );
            })}

            <button
              onClick={() => setShowAllDaysMaps(!showAllDaysMaps)}
              className={`touch-target px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition ${
                showAllDaysMaps
                  ? 'bg-roman-terracotta text-white shadow-soft'
                  : 'bg-roman-surface text-roman-muted border border-roman-border hover:text-roman-text'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Ver los 3 Días
            </button>
          </div>

          <button
            onClick={onRequestGeolocation}
            className="touch-target px-3.5 py-2 rounded-full bg-roman-surface border border-roman-border text-roman-text text-xs font-bold inline-flex items-center gap-1.5 shadow-soft"
          >
            <MapPin className="w-3.5 h-3.5 text-roman-terracotta" />
            {userCoords ? 'GPS Activo' : 'Mi Ubicación'}
          </button>
        </div>

        {/* Barra de Utilidades de Experto: Fuentes Nasoni / Baños P.Stop + Descarga Mapa Offline */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setShowAmenities(!showAmenities)}
            className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border transition ${
              showAmenities
                ? 'bg-roman-elevated text-roman-text border-roman-terracotta'
                : 'bg-roman-surface text-roman-muted border-roman-border'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            {showAmenities
              ? '💧 Fuentes Nasoni y Baños WC: Visibles'
              : 'Mostrar Fuentes Nasoni y Baños WC'}
          </button>

          <button
            onClick={handleDownloadOfflineTiles}
            disabled={precacheStatus === 'loading'}
            className="touch-target px-3.5 py-1.5 rounded-full bg-roman-surface hover:bg-roman-elevated border border-roman-border text-roman-text text-xs font-bold inline-flex items-center gap-1.5 transition"
          >
            {precacheStatus === 'done' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-roman-sage" />
                Mapa guardado para uso Offline
              </>
            ) : (
              <>
                <DownloadCloud className="w-3.5 h-3.5 text-roman-terracotta" />
                {precacheStatus === 'loading'
                  ? `Guardando calles (${precacheProgress})...`
                  : 'Guardar Mapa Offline'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* MODO A: LOS 3 MAPAS DIARIOS (VIERNES, SÁBADO Y DOMINGO) */}
      {showAllDaysMaps ? (
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.id} className="space-y-2">
              <DayRouteMiniMap
                day={day}
                hotelCoords={hotelCoords}
                userCoords={userCoords}
                showAmenities={showAmenities}
                heightClass="h-64 sm:h-80"
                onSelectPlace={onSelectPlace}
              />
            </div>
          ))}
        </div>
      ) : (
        /* MODO B: MAPA GRANDE DEL DÍA SELECCIONADO + LISTADO DE PARADAS */
        <>
          <DayRouteMiniMap
            day={currentDay}
            hotelCoords={hotelCoords}
            userCoords={userCoords}
            showAmenities={showAmenities}
            heightClass="h-[52vh] sm:h-[60vh]"
            onSelectPlace={onSelectPlace}
          />

          {/* Tarjeta con todas las paradas del recorrido numeradas */}
          <div className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-roman-text">
                Lugares en la ruta del {currentDay.title}
              </h3>
              <span className="text-xs font-bold text-roman-muted flex items-center gap-1">
                <Footprints className="w-3.5 h-3.5 text-roman-terracotta" />
                {currentDay.totalWalkingKm} km
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentDay.places.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectPlace(p)}
                  className="cursor-pointer p-3 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border flex items-center justify-between gap-2 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-roman-terracotta text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {p.order}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-roman-text truncate">
                        {p.nameEs}
                      </div>
                      <div className="text-[11px] text-roman-muted">
                        {p.startTime}–{p.endTime} h · {p.walkingFromPrev.distanceKm} km
                      </div>
                    </div>
                  </div>

                  <a
                    href={getGoogleMapsWalkingUrl(p.coordinates, p.nameIt, userCoords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="touch-target w-10 h-10 rounded-xl bg-roman-surface border border-roman-border flex items-center justify-center text-roman-terracotta shrink-0"
                    title="Ruta a pie"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
