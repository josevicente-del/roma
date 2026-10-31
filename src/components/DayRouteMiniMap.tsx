/**
 * Componente de Mapa Diario Embebido (Leaflet + OpenStreetMap).
 * Muestra la ruta completa a pie del día seleccionado, el alojamiento en Via Palermo 4,
 * cada parada numerada por orden, y opcionalmente las Fuentes Potables «Nasoni» y Baños Públicos «P.Stop».
 */

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, ExternalLink, Maximize2 } from 'lucide-react';
import { Coordinates, DaySchedule, ItineraryPlace } from '../types/itinerary';
import { ROME_AMENITIES } from '../data/romeAmenities';
import { getGoogleMapsWalkingUrl } from '../utils/maps';

interface DayRouteMiniMapProps {
  day: DaySchedule;
  hotelCoords: Coordinates;
  activePlaceId?: string;
  userCoords: Coordinates | null;
  showAmenities?: boolean;
  heightClass?: string;
  onSelectPlace: (place: ItineraryPlace) => void;
  onExpandFullMap?: () => void;
}

function createStepIcon(order: number, isCurrent: boolean, isFixed: boolean): L.DivIcon {
  const bg = isCurrent ? '#B5532F' : isFixed ? '#2B2420' : '#6E7E6A';
  const ring = isCurrent ? '0 0 0 5px rgba(181, 83, 47, 0.32)' : '0 2px 6px rgba(0,0,0,0.28)';
  return L.divIcon({
    className: 'roman-step-marker',
    html: `<div style="
      width: 30px;
      height: 30px;
      border-radius: 9999px;
      background: ${bg};
      color: #F7F3EC;
      border: 2px solid #F7F3EC;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 12px;
      box-shadow: ${ring};
    ">${order}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14]
  });
}

const hotelPinIcon = L.divIcon({
  className: 'roman-hotel-pin',
  html: `<div style="
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: #B69654;
    color: #2B2420;
    border: 2px solid #F7F3EC;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  ">H</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -14]
});

const nasoneIcon = L.divIcon({
  className: 'roman-nasone-pin',
  html: `<div style="
    width: 24px;
    height: 24px;
    border-radius: 9999px;
    background: #0284C7;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  ">💧</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10]
});

const wcIcon = L.divIcon({
  className: 'roman-wc-pin',
  html: `<div style="
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: #4F46E5;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  ">WC</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10]
});

const FitDayBounds: React.FC<{ coords: [number, number][] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 1) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
    }
  }, [coords, map]);
  return null;
};

export const DayRouteMiniMap: React.FC<DayRouteMiniMapProps> = ({
  day,
  hotelCoords,
  activePlaceId,
  userCoords,
  showAmenities = false,
  heightClass = 'h-60 sm:h-72',
  onSelectPlace,
  onExpandFullMap
}) => {
  const routePoints: [number, number][] = [
    [hotelCoords.lat, hotelCoords.lng],
    ...day.places.map((p) => [p.coordinates.lat, p.coordinates.lng] as [number, number]),
    [hotelCoords.lat, hotelCoords.lng]
  ];

  return (
    <div className="rounded-card bg-roman-surface border border-roman-border shadow-soft overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b border-roman-border">
        <div>
          <h3 className="font-serif font-bold text-sm sm:text-base text-roman-text">
            Mapa del Recorrido · {day.title}
          </h3>
          <p className="text-xs text-roman-muted">
            {day.places.length} paradas numeradas · {day.totalWalkingKm} km en total desde Via Palermo 4
          </p>
        </div>

        {onExpandFullMap && (
          <button
            onClick={onExpandFullMap}
            className="touch-target px-3 py-1.5 rounded-xl bg-roman-elevated hover:opacity-90 text-roman-text text-xs font-medium inline-flex items-center gap-1.5 transition"
          >
            <Maximize2 className="w-3.5 h-3.5 text-roman-terracotta" />
            <span>Ampliar</span>
          </button>
        )}
      </div>

      <div className={`relative w-full ${heightClass} z-0`}>
        <MapContainer
          center={[41.8955, 12.4823]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitDayBounds coords={routePoints} />

          <Polyline
            positions={routePoints}
            pathOptions={{
              color: '#B5532F',
              weight: 3.5,
              opacity: 0.85,
              dashArray: '6, 8'
            }}
          />

          <Marker position={[hotelCoords.lat, hotelCoords.lng]} icon={hotelPinIcon}>
            <Popup>
              <div className="text-xs space-y-1">
                <strong className="block text-sm">Alojamiento · Via Palermo 4</strong>
                <span>Punto de salida y regreso de la jornada.</span>
              </div>
            </Popup>
          </Marker>

          {day.places.map((place) => (
            <Marker
              key={place.id}
              position={[place.coordinates.lat, place.coordinates.lng]}
              icon={createStepIcon(place.order, place.id === activePlaceId, place.isFixed)}
            >
              <Popup>
                <div className="text-xs space-y-1.5 min-w-[185px]">
                  <div className="font-bold text-stone-900">
                    #{place.order} · {place.nameEs}
                  </div>
                  <div className="text-stone-500">
                    {place.startTime} – {place.endTime} h ({place.recommendedDurationText})
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="flex-1 py-1.5 px-2 rounded bg-stone-900 text-white font-medium text-[11px] inline-flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Ficha
                    </button>
                    <a
                      href={getGoogleMapsWalkingUrl(place.coordinates, place.nameIt, userCoords)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2 rounded bg-[#B5532F] text-white font-medium text-[11px] inline-flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3 h-3" /> Ruta
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Marcadores opcionales de Fuentes Potables Nasoni y Baños Públicos P.Stop */}
          {showAmenities &&
            ROME_AMENITIES.map((am) => (
              <Marker
                key={am.id}
                position={[am.coordinates.lat, am.coordinates.lng]}
                icon={am.type === 'nasone' ? nasoneIcon : wcIcon}
              >
                <Popup>
                  <div className="text-xs space-y-1 min-w-[175px]">
                    <div className="font-bold text-stone-900">
                      {am.type === 'nasone' ? '💧 Fuente Potable Gratis' : '🚻 Baño Público'}
                    </div>
                    <div className="font-semibold text-stone-800">{am.name}</div>
                    <div className="text-stone-500 text-[11px]">{am.locationHint}</div>
                    <div className="text-stone-600 text-[11px]">{am.notes}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};
