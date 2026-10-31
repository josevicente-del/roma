/**
 * Modal de Ficha Completa de cada Lugar del Itinerario con el nuevo Estilo Visual Minimalista (#F7F3EC / #B5532F):
 * - Imagen / ilustración hero grande en cabecera.
 * - Textos breves con secciones desplegables para no sobrecargar la lectura móvil.
 * - Audioguías gratuitas enlazadas (izi.TRAVEL, portales oficiales) + Reproductor de Audioguía de Voz Offline integrado.
 * - Tips para hacer las mejores fotos en el lugar (encuadre, hora de luz).
 * - Tips de Películas rodadas en el lugar o muy cerca.
 * - Botones grandes (mínimo 44px) pensados para usar con una sola mano.
 */

import React, { useEffect, useState } from 'react';
import {
  X,
  Clock,
  Ticket,
  AlertTriangle,
  Camera,
  Film,
  Headphones,
  Volume2,
  Square,
  Navigation,
  MapPin,
  Footprints,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  CloudRain,
  UtensilsCrossed
} from 'lucide-react';
import { Coordinates, ItineraryPlace } from '../types/itinerary';
import { PLACE_ENRICHMENTS } from '../data/placeEnrichments';
import { getAppleMapsWalkingUrl, getGoogleMapsWalkingUrl } from '../utils/maps';

interface PlaceDetailModalProps {
  place: ItineraryPlace | null;
  userCoords: Coordinates | null;
  onClose: () => void;
  onOpenAlbumForPlace: (placeId: string) => void;
  onOpenDiningGuide?: () => void;
  onOpenTrajanColumn?: () => void;
  onOpenPiazzaNavona?: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  userCoords,
  onClose,
  onOpenAlbumForPlace,
  onOpenDiningGuide,
  onOpenTrajanColumn,
  onOpenPiazzaNavona
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  useEffect(() => {
    setShowFullHistory(false);
    setShowArchitecture(false);
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [place]);

  if (!place) return null;

  const enrichment = PLACE_ENRICHMENTS[place.id];
  const googleMapsUrl = getGoogleMapsWalkingUrl(place.coordinates, place.nameIt, userCoords);
  const appleMapsUrl = getAppleMapsWalkingUrl(place.coordinates, place.nameIt, userCoords);

  const toggleOfflineAudioGuide = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead =
      enrichment?.audioGuideScript ||
      `${place.nameEs}. ${place.historyAndCuriosities}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.98;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-modal w-full max-w-2xl max-h-[92vh] bg-roman-bg text-roman-text rounded-t-[24px] sm:rounded-[24px] shadow-elevated border border-roman-border overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGEN / CABECERA HERO GRANDE DEL LUGAR */}
        <div className="relative h-52 sm:h-60 bg-gradient-to-br from-[#2B2420] via-[#5E3423] to-[#B5532F] text-[#F7F3EC] p-6 flex flex-col justify-between overflow-hidden shrink-0">
          {/* Ilustración arquitectónica romana sutil de fondo */}
          <svg
            className="absolute right-[-20px] bottom-[-20px] w-64 h-64 opacity-15 pointer-events-none"
            viewBox="0 0 200 200"
          >
            <path
              d="M20 170 H180 M35 170 V90 A65 65 0 0 1 165 90 V170"
              fill="none"
              stroke="#F7F3EC"
              strokeWidth="8"
            />
            <circle cx="100" cy="65" r="14" fill="#F7F3EC" />
          </svg>

          <div className="flex items-center justify-between gap-2 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium">
                Parada #{place.order} · {place.startTime} – {place.endTime} h
              </span>
              {place.isFixed && (
                <span className="px-2.5 py-1 rounded-full bg-[#B5532F] text-white text-[11px] font-bold uppercase tracking-wider">
                  Horario Fijo
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="touch-target w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition"
              aria-label="Cerrar ficha"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {place.nameEs}
            </h2>
            <p className="text-xs sm:text-sm opacity-90 italic font-serif mt-0.5">
              {place.nameIt}
            </p>
            <p className="text-xs opacity-80 mt-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {place.address}
            </p>
          </div>
        </div>

        {/* CUERPO DESPLAZABLE CON MUCHO ESPACIO EN BLANCO Y JERARQUÍA CLARA */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm leading-relaxed">
          {/* ACCIÓN PRINCIPAL Y SECUNDARIAS (Botones grandes >= 44px para una mano) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-sm shadow-soft transition"
            >
              <Navigation className="w-4 h-4" />
              Ir a pie (Google Maps)
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-roman-surface hover:bg-roman-elevated text-roman-text border border-roman-border font-medium text-xs transition"
            >
              <MapPin className="w-4 h-4 text-roman-terracotta" />
              Abrir en Apple Maps
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenAlbumForPlace(place.id);
              }}
              className="touch-target flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-roman-surface hover:bg-roman-elevated text-roman-text border border-roman-border font-medium text-xs transition"
            >
              <Camera className="w-4 h-4 text-roman-terracotta" />
              Fotos de este lugar
            </button>
          </div>

          {/* ACCESO DIRECTO AL MONOGRÁFICO DE LA COLUMNA DE TRAJANO (SÁBADO 13:50 H) */}
          {onOpenTrajanColumn && place.id === 'sab-5-foro-trajano' && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTrajanColumn();
              }}
              className="touch-target w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-900/10 via-amber-800/15 to-amber-900/10 hover:bg-amber-800/20 border-2 border-amber-600/40 text-roman-text font-bold text-sm flex items-center justify-between shadow-soft transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🏛️</span>
                <div className="text-left">
                  <div className="font-serif font-bold text-roman-terracotta leading-tight">
                    Monográfico: La Columna de Trajano
                  </div>
                  <div className="text-[11px] font-normal text-roman-muted">
                    Cómo leer su cómic de 200m, secretos, tumba y los 3 miradores
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-white bg-roman-terracotta px-2.5 py-1 rounded-md shadow-sm">
                Abrir Guía →
              </span>
            </button>
          )}

          {/* ACCESO DIRECTO A LA VISITA EXTERIOR NOCTURNA: PIAZZA NAVONA & 3 FUENTES */}
          {onOpenPiazzaNavona &&
            (place.id === 'sab-9-panteon-nocturno' || place.id === 'sab-10-fontana-trevi') && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPiazzaNavona();
                }}
                className="touch-target w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1E1714] via-[#2D231E] to-[#1E1714] text-amber-100 border border-amber-500/40 font-bold text-sm flex items-center justify-between shadow-lg transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌙</span>
                  <div className="text-left">
                    <div className="font-serif font-bold text-amber-300 leading-tight">
                      Visita Nocturna: Piazza Navona & Las 3 Fuentes
                    </div>
                    <div className="text-[11px] font-normal text-stone-300">
                      A 4 min a pie · Cuatro Ríos (Bernini), Moro y Neptuno iluminadas
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900 bg-amber-400 px-2.5 py-1 rounded-md shadow-sm">
                  Ver Visita →
                </span>
              </button>
            )}

          {/* ACCESO DIRECTO A LA GUÍA GASTRONÓMICA EN PARADAS DE COMIDA O BARRIOS GASTRONÓMICOS */}
          {onOpenDiningGuide &&
            (place.category === 'restaurante' ||
              place.id === 'sab-6-vecchia-roma' ||
              place.id === 'sab-8-trastevere' ||
              place.id === 'dom-4-panteon-interior') && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDiningGuide();
                }}
                className="touch-target w-full py-2.5 px-4 rounded-xl bg-roman-elevated hover:bg-roman-surface border border-roman-border text-roman-terracotta font-bold text-xs flex items-center justify-center gap-2 shadow-soft transition"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explorar Guía de Trattorias & Platos Típicos de Roma</span>
              </button>
            )}

          {/* 🎧 SECCIÓN DE AUDIOGUÍAS GRATUITAS (REPRODUCTOR DE VOZ OFFLINE + ENLACES EXTERNOS) */}
          <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-roman-terracotta" />
                <h3 className="font-serif font-bold text-base text-roman-text">
                  Audioguías Gratuitas en Español
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-muted font-medium">
                Sin coste
              </span>
            </div>

            {/* Botón de narración por voz Offline integrada */}
            <button
              type="button"
              onClick={toggleOfflineAudioGuide}
              className={`touch-target w-full px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                isSpeaking
                  ? 'bg-[#2B2420] text-[#F7F3EC]'
                  : 'bg-roman-elevated hover:opacity-90 text-roman-text'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-4 h-4 text-roman-terracotta fill-current" />
                  Detener narración en voz alta
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-roman-terracotta" />
                  Escuchar Audioguía Narrada Offline (Voz integrada)
                </>
              )}
            </button>

            {/* Enlaces a audioguías gratuitas externas verificadas (izi.TRAVEL / Oficiales) */}
            {enrichment?.freeAudioGuideLinks && enrichment.freeAudioGuideLinks.length > 0 && (
              <div className="space-y-2 pt-1">
                {enrichment.freeAudioGuideLinks.map((ag, idx) => (
                  <a
                    key={idx}
                    href={ag.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target flex items-center justify-between p-3 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border transition"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-xs text-roman-text truncate">
                        {ag.title}
                      </div>
                      <div className="text-[11px] text-roman-muted">
                        {ag.provider} · {ag.language}{' '}
                        {ag.durationApprox ? `· ${ag.durationApprox}` : ''}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-roman-terracotta shrink-0">
                      Abrir <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RESUMEN BREVE + HISTORIA DESPLEGABLE (Para evitar sobrecargar la pantalla) */}
          <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-roman-text">
              Resumen e Historia
            </h3>
            <p className="text-roman-text text-sm font-medium">
              {enrichment?.shortSummary}
            </p>

            {/* Puntos clave que buscar ("Must-See") */}
            {enrichment?.mustSeeHighlights && (
              <div className="pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-roman-muted mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-roman-terracotta" />
                  Imprescindibles que debes mirar aquí
                </div>
                <ul className="space-y-1.5 text-xs text-roman-text list-disc pl-4">
                  {enrichment.mustSeeHighlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Desplegable de Historia completa (10-15 líneas) */}
            <div className="pt-2 border-t border-roman-border">
              <button
                type="button"
                onClick={() => setShowFullHistory(!showFullHistory)}
                className="touch-target w-full flex items-center justify-between text-xs font-bold text-roman-terracotta"
              >
                <span>
                  {showFullHistory
                    ? 'Ocultar relato histórico completo'
                    : 'Leer historia completa y curiosidades (15 líneas)'}
                </span>
                {showFullHistory ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showFullHistory && (
                <div className="mt-3 space-y-3 text-xs sm:text-sm text-roman-muted leading-relaxed">
                  <p>{place.historyAndCuriosities}</p>
                  {enrichment?.architectureAndArtDetails && (
                    <p className="p-3 rounded-xl bg-roman-bg border border-roman-border text-roman-text">
                      <strong>Detalles de Arquitectura y Arte:</strong>{' '}
                      {enrichment.architectureAndArtDetails}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 📸 TIPS PARA HACER FOTOS EN ESTE LUGAR */}
          {enrichment?.photoTips && enrichment.photoTips.length > 0 && (
            <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-2.5">
              <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
                <Camera className="w-4 h-4 text-roman-terracotta" />
                Tips para Hacer las Mejores Fotos Aquí
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-roman-text">
                {enrichment.photoTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-roman-terracotta font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 🎬 CINE RODADO AQUÍ O MUY CERCA */}
          {enrichment?.cinemaTips && enrichment.cinemaTips.length > 0 && (
            <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
              <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
                <Film className="w-4 h-4 text-roman-terracotta" />
                Roma de Cine: Películas Rodadas Aquí
              </h3>
              <div className="space-y-2.5">
                {enrichment.cinemaTips.map((movie, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-serif font-bold text-sm text-roman-text">
                        «{movie.movieTitle}»
                      </span>
                      <span className="text-[11px] font-medium text-roman-terracotta">
                        {movie.directorAndYear}
                      </span>
                    </div>
                    <p className="text-xs text-roman-muted leading-relaxed">
                      {movie.sceneDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATOS PRÁCTICOS: HORARIOS, ENTRADAS Y DISTANCIAS A PIE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-roman-muted mb-1">
                <Clock className="w-4 h-4 text-roman-terracotta" />
                Horario y Tiempo
              </div>
              <p className="text-xs font-bold text-roman-text">{place.openingHours}</p>
              <p className="text-xs text-roman-muted mt-1">
                Estancia recomendada: <strong>{place.recommendedDurationText}</strong>
              </p>
            </div>

            <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-roman-muted mb-1">
                <Ticket className="w-4 h-4 text-roman-terracotta" />
                Entrada · {place.ticketInfo.type}
              </div>
              <p className="text-xs font-bold text-roman-text">{place.ticketInfo.priceApprox}</p>
              <p className="text-xs text-roman-muted mt-1">{place.ticketInfo.bookingAdvice}</p>
            </div>
          </div>

          {/* Distancias desde el punto anterior y hasta el siguiente */}
          <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Footprints className="w-4 h-4 text-roman-terracotta shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-roman-muted block">
                  Desde {place.walkingFromPrev.fromName}
                </span>
                <strong className="text-roman-text">
                  {place.walkingFromPrev.distanceKm > 0
                    ? `${place.walkingFromPrev.distanceKm} km · ${place.walkingFromPrev.timeMinutes} min a pie`
                    : `${place.walkingFromPrev.timeMinutes} min`}
                </strong>
                <p className="text-roman-muted mt-0.5">{place.walkingFromPrev.routeNotes}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:border-l sm:pl-3 border-roman-border">
              <Navigation className="w-4 h-4 text-roman-sage shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-roman-muted block">
                  Siguiente: {place.walkingToNext.toName}
                </span>
                <strong className="text-roman-text">
                  {place.walkingToNext.distanceKm > 0
                    ? `${place.walkingToNext.distanceKm} km · ${place.walkingToNext.timeMinutes} min a pie`
                    : `${place.walkingToNext.timeMinutes} min`}
                </strong>
              </div>
            </div>
          </div>

          {/* AVISOS IMPORTANTES Y DESPLEGABLE DE CONSEJOS EXTRA */}
          {place.importantWarnings.length > 0 && (
            <div className="p-4 rounded-card bg-roman-elevated border border-roman-border space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-roman-terracotta flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Avisos Clave
              </div>
              <ul className="space-y-1 text-xs text-roman-text list-disc pl-4">
                {place.importantWarnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Consejos adicionales, Plan B y Bonus cercanos en bloque desplegable limpio */}
          <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft">
            <button
              type="button"
              onClick={() => setShowArchitecture(!showArchitecture)}
              className="touch-target w-full flex items-center justify-between text-xs font-bold text-roman-text"
            >
              <span>Ver consejos prácticos, Plan B de lluvia y lugares de paso</span>
              {showArchitecture ? (
                <ChevronUp className="w-4 h-4 text-roman-terracotta" />
              ) : (
                <ChevronDown className="w-4 h-4 text-roman-terracotta" />
              )}
            </button>

            {showArchitecture && (
              <div className="mt-3 pt-3 border-t border-roman-border space-y-3 text-xs">
                <ul className="space-y-1.5 list-disc pl-4 text-roman-text">
                  {place.practicalTips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

                <div className="p-3 rounded-xl bg-roman-bg border border-roman-border flex items-start gap-2">
                  <CloudRain className="w-4 h-4 text-roman-sage shrink-0 mt-0.5" />
                  <span>
                    <strong>Plan B (Lluvia):</strong> {place.planB}
                  </span>
                </div>

                {place.nearbyBonus && place.nearbyBonus.length > 0 && (
                  <div className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-1">
                    <strong className="block text-roman-terracotta">
                      Pasáis justo al lado:
                    </strong>
                    {place.nearbyBonus.map((b, i) => (
                      <p key={i} className="text-roman-muted">
                        • <strong className="text-roman-text">{b.nameEs}</strong> (a{' '}
                        {b.distanceMeters} m): {b.description}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
