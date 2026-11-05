/**
 * Componente: Roma Secreta & Trucos Ópticos («I Segreti e le Illusioni di Roma»)
 * 
 * Basado en las joyas ópticas, matemáticas y trampantojos barrocos a solo minutos
 * del recorrido previsto:
 * 1. La Falsa Perspectiva de Borromini en Palazzo Spada (8,58 m que parecen 40 m).
 * 2. La Falsa Cúpula de Andrea Pozzo en Sant'Ignazio (techo plano con trampantojo 3D).
 * 3. El Ojo de la Cerradura de los Caballeros de Malta en el Aventino (3 Estados en un ojo).
 * 4. La Bocca della Verità en Santa Maria in Cosmedin (antiguo oráculo y tapa cloacal del s. I).
 */

import React, { useState } from 'react';
import {
  Eye,
  MapPin,
  Sparkles,
  Navigation,
  ExternalLink,
  HelpCircle,
  Camera,
  Maximize2,
  X,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';
import { SECRET_ROME_PLACES, SecretRomePlace } from '../data/secretRomeData';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';
import { MonumentImage } from './MonumentImage';

interface SecretRomeOpticalWondersModalProps {
  userCoords?: Coordinates | null;
  onClose?: () => void;
}

export const SecretRomeOpticalWondersModal: React.FC<SecretRomeOpticalWondersModalProps> = ({
  userCoords,
  onClose
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('borromini-spada');
  const [expandedImage, setExpandedImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const currentPlace: SecretRomePlace =
    SECRET_ROME_PLACES.find((p) => p.id === selectedPlaceId) || SECRET_ROME_PLACES[0];

  return (
    <div className="space-y-6 text-roman-text pb-12">
      {/* Cabecera Principal */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider">
              👁️ Roma Secreta & Trucos Ópticos
            </span>
            <span className="text-[11px] font-mono text-roman-muted">Matemática & Ilusión</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            Perspectivas & Trampantojos Ocultos
          </h2>
          <p className="text-xs sm:text-sm text-roman-muted mt-1 max-w-xl">
            Sorpresas arquitectónicas a pocos pasos de vuestra ruta que desafían la vista: columnatas telescópicas, cúpulas pintadas en techos planos y mirillas soberanas.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="touch-target p-2 rounded-full hover:bg-roman-elevated border border-roman-border text-roman-muted hover:text-roman-text transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Selector de Rincones Secretos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SECRET_ROME_PLACES.map((place) => {
          const isSelected = place.id === selectedPlaceId;
          return (
            <button
              key={place.id}
              onClick={() => setSelectedPlaceId(place.id)}
              className={`touch-target p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-roman-accent/15 border-roman-terracotta shadow-md scale-[1.02]'
                  : 'bg-roman-surface border-roman-border hover:bg-roman-elevated'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{place.icon}</span>
                <span className="text-[10px] font-mono text-roman-muted font-bold">
                  ~{place.walkingMinutesFromHotel}′ a pie
                </span>
              </div>
              <div>
                <h4
                  className={`text-xs font-bold line-clamp-1 ${
                    isSelected ? 'text-roman-terracotta' : 'text-roman-text'
                  }`}
                >
                  {place.title}
                </h4>
                <p className="text-[10px] text-roman-muted truncate">{place.locationName}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Ficha Detallada del Rincón Seleccionado */}
      <div className="p-5 sm:p-6 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-5 animate-page">
        {/* Título y subtítulo */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-roman-border pb-3">
          <div className="space-y-1">
            <span className="inline-block text-xs font-mono font-bold text-roman-terracotta">
              {currentPlace.categoryLabel}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-roman-text">
              {currentPlace.title}
            </h3>
            <p className="text-xs sm:text-sm italic text-roman-muted">
              {currentPlace.subtitle}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-roman-text block">
              📍 {currentPlace.locationName}
            </span>
            <span className="text-[11px] text-roman-muted font-mono">
              {currentPlace.address}
            </span>
          </div>
        </div>

        {/* Imagen del Monumento / Relieve con MonumentImage y botón ampliar */}
        <div className="rounded-2xl border border-roman-border overflow-hidden bg-roman-elevated shadow-sm">
          <div className="relative group max-h-72 overflow-hidden bg-stone-800">
            <MonumentImage
              key={currentPlace.id}
              src={currentPlace.imageUrl}
              fallbackSrc={currentPlace.fallbackImageUrl}
              alt={currentPlace.imageAlt}
              icon={currentPlace.icon}
              title={currentPlace.title}
              caption={currentPlace.imageCaption}
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() =>
                setExpandedImage({
                  url: currentPlace.imageUrl,
                  title: currentPlace.title,
                  caption: currentPlace.imageCaption
                })
              }
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-xl backdrop-blur-sm transition flex items-center gap-1 text-xs font-semibold shadow-md"
              title="Ampliar imagen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ver ampliada</span>
            </button>
          </div>
          <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-roman-border">
            <p className="text-xs italic text-roman-muted">
              📷 {currentPlace.imageCaption}
            </p>
          </div>
        </div>

        {/* Comparativa: Lo que tus ojos ven vs Lo que realmente es */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* 1. Lo que parece (La Ilusión) */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Lo que tus ojos creen ver (La Ilusión):</span>
            </div>
            <p className="text-xs text-roman-text font-medium leading-relaxed">
              {currentPlace.illusion}
            </p>
          </div>

          {/* 2. La Realidad (El Secreto Físico/Matemático) */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>El truco de física y arquitectura (La Realidad):</span>
            </div>
            <p className="text-xs text-roman-text font-medium leading-relaxed">
              {currentPlace.reality}
            </p>
          </div>
        </div>

        {/* Cómo experimentarlo in situ */}
        <div className="p-4 rounded-xl bg-roman-elevated border border-roman-border space-y-2">
          <div className="flex items-center gap-2 text-roman-terracotta font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>El punto exacto: Cómo experimentarlo in situ</span>
          </div>
          <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
            {currentPlace.howToExperience}
          </p>
        </div>

        {/* Historia y anécdota secreta */}
        <div className="space-y-1.5">
          <h5 className="text-xs font-bold uppercase tracking-wider text-roman-muted flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-roman-terracotta" />
            <span>Historia & Anécdota Romana</span>
          </h5>
          <p className="text-xs text-roman-muted leading-relaxed">
            {currentPlace.historicalSecret}
          </p>
        </div>

        {/* Consejo práctico y conexión con el itinerario */}
        <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-roman-border flex items-start gap-2.5">
          <Camera className="w-4 h-4 text-roman-terracotta shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-xs font-bold text-roman-text block">
              Consejo de foto & Cuándo ir:
            </strong>
            <p className="text-xs text-roman-muted leading-relaxed">
              {currentPlace.practicalTip}
            </p>
            <span className="inline-block text-[11px] font-bold text-amber-700 dark:text-amber-400 mt-1">
              🚶‍♂️ {currentPlace.nearbyItineraryPoint}
            </span>
          </div>
        </div>

        {/* Botón de cómo llegar a pie (GPS) */}
        <div>
          <a
            href={getGoogleMapsWalkingUrl(
              currentPlace.coordinates,
              currentPlace.title,
              userCoords
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target w-full py-3 px-4 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Cómo llegar a pie a {currentPlace.title} (GPS)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Modal de Imagen Ampliada */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 flex flex-col items-center justify-center animate-page"
          onClick={() => setExpandedImage(null)}
        >
          <div
            className="max-w-3xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-stone-800 text-white">
              <h4 className="font-serif font-bold text-sm sm:text-base truncate">
                {expandedImage.title}
              </h4>
              <button
                onClick={() => setExpandedImage(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 bg-stone-950 flex items-center justify-center">
              <img
                src={expandedImage.url}
                alt={expandedImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="p-3 bg-stone-900 text-xs text-stone-300 border-t border-stone-800 italic">
              📷 {expandedImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
