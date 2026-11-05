/**
 * Componente: Radar de Gelato Auténtico vs. Trampas de Turistas
 * 
 * Contiene:
 * 1. El Test del Gelato Real (Las 5 reglas para detectar si un helado es artesano o fraude químico).
 * 2. El Radar de las 7 Mejores Heladerías Legendarias de Roma geolocalizadas
 *    (Frigidarium, Giolitti, Otaleg, Fatamorgana en Monti al lado del hotel, etc.).
 * 3. Cálculo de distancia a pie y botón directo GPS.
 */

import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  X,
  Compass,
  Heart,
  Award,
  CheckCircle2,
  Coffee
} from 'lucide-react';
import {
  AUTHENTIC_GELATERIAS,
  GELATO_AUTHENTICITY_RULES,
  AuthenticGelateria,
  GelatoAuthenticityRule
} from '../data/gelatoRadarData';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';

interface AuthenticGelatoRadarModalProps {
  userCoords?: Coordinates | null;
  onClose?: () => void;
}

export const AuthenticGelatoRadarModal: React.FC<AuthenticGelatoRadarModalProps> = ({
  userCoords,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'radar' | 'reglas'>('radar');
  const [selectedZone, setSelectedZone] = useState<string>('todos');

  const filteredGelaterias = AUTHENTIC_GELATERIAS.filter((g) => {
    if (selectedZone === 'todos') return true;
    return g.zone === selectedZone;
  });

  return (
    <div className="space-y-6 text-roman-text pb-12">
      {/* Cabecera Principal */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider">
              🍦 Radar Gastronómico Oficial
            </span>
            <span className="text-[11px] font-mono text-roman-muted">Gelato Artigianale</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            Radar de Gelato Auténtico
          </h2>
          <p className="text-xs sm:text-sm text-roman-muted mt-1 max-w-xl">
            Cómo distinguir el verdadero helado artesanal romano de las trampas turísticas industriales y dónde saborear los mejores cucuruchos de la ciudad.
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

      {/* Conmutador entre Radar de Heladerías y Test de Autenticidad */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-roman-surface border border-roman-border shadow-soft text-xs font-bold max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('radar')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'radar'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Top Heladerías ({AUTHENTIC_GELATERIAS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reglas')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'reglas'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>El Test del Gelato Real</span>
        </button>
      </div>

      {/* PESTAÑA 1: RADAR DE HELADERÍAS */}
      {activeTab === 'radar' && (
        <div className="space-y-5 animate-page">
          {/* Banner especial para la heladería junto al hotel en Monti */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/5 border border-amber-500/30 flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">🏨</span>
            <div className="space-y-1">
              <strong className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                ¡Vuestra heladería de cabecera a 4 minutos de casa!
              </strong>
              <p className="text-xs text-roman-text leading-relaxed">
                A solo 350 metros de vuestro alojamiento en <strong>Via Palermo 4</strong> tenéis <strong>Fatamorgana Monti</strong> (Piazza degli Zingari), una de las heladerías 100% artesanales y naturales más premiadas de Roma.
              </p>
            </div>
          </div>

          {/* Filtro por Zona */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-roman-muted mr-1">Zona:</span>
            {[
              { id: 'todos', label: 'Todas las Zonas' },
              { id: 'Monti (Junto al Hotel)', label: 'Monti (Junto al Hotel)' },
              { id: 'Navona & Panteón', label: 'Navona & Panteón' },
              { id: 'Trastevere', label: 'Trastevere' }
            ].map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`touch-target px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedZone === zone.id
                    ? 'bg-roman-terracotta text-white shadow-sm'
                    : 'bg-roman-surface border border-roman-border text-roman-text hover:bg-roman-elevated'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Lista de Heladerías */}
          <div className="space-y-4">
            {filteredGelaterias.map((g) => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3.5 hover:border-roman-terracotta/40 transition"
              >
                {/* Cabecera de la Heladería */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta">
                        {g.zone}
                      </span>
                      {g.hasFreeChocolateDip && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                          🍫 Baño Chocolate Gratis
                        </span>
                      )}
                      {g.usesCarapine && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                          🏺 Pozos Carapine
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-roman-text">
                      {g.name}
                    </h3>
                    <p className="text-xs italic text-roman-muted">{g.tagline}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-roman-text block">
                      ~{g.priceRange}
                    </span>
                    <span className="text-[11px] font-mono text-roman-terracotta font-semibold">
                      {g.walkingMinutesFromHotel}′ a pie ({g.distanceFromHotelKm} km)
                    </span>
                  </div>
                </div>

                {/* Rasgo distintivo */}
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-roman-border text-xs text-roman-text font-medium leading-relaxed">
                  {g.signatureFeature}
                </div>

                {/* Sabores recomendados (Must Try) */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-roman-muted block">
                    ⭐ Sabores recomendados (Must-Try):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {g.mustTryFlavors.map((flavor, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-roman-elevated text-roman-text font-medium border border-roman-border"
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consejo in situ y Horario */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-roman-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                    <span>{g.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                    <span className="truncate">{g.address}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 italic">
                  💡 <strong>Consejo del experto:</strong> {g.expertTip}
                </p>

                {/* Botón de ruta a pie (GPS) */}
                <a
                  href={getGoogleMapsWalkingUrl(g.coordinates, g.name, userCoords)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-full py-2.5 px-4 rounded-xl bg-roman-elevated hover:bg-roman-surface border border-roman-border hover:border-roman-terracotta text-roman-terracotta font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ruta a pie hacia {g.name} (GPS)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: EL TEST DEL GELATO REAL */}
      {activeTab === 'reglas' && (
        <div className="space-y-4 animate-page">
          <div className="p-4 rounded-2xl bg-roman-elevated border border-roman-border space-y-1.5">
            <h4 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              El Decálogo del Helado Artesano
            </h4>
            <p className="text-xs text-roman-muted leading-relaxed">
              En el centro de Roma hay más de 500 heladerías, pero menos del 15% producen gelato artesanal puro. Aprende a detectar una trampa para turistas en 5 segundos con estas reglas visuales:
            </p>
          </div>

          <div className="space-y-3.5">
            {GELATO_AUTHENTICITY_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-5 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm sm:text-base text-roman-text">
                    {rule.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta">
                    {rule.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* La Trampa */}
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-red-900 dark:text-red-300 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>La Trampa para turistas (Huye):</span>
                    </div>
                    <p className="text-xs text-roman-text font-medium leading-relaxed">
                      {rule.theTrap}
                    </p>
                  </div>

                  {/* Lo Auténtico */}
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>El Gelato Auténtico (Acierto):</span>
                    </div>
                    <p className="text-xs text-roman-text font-medium leading-relaxed">
                      {rule.theAuthentic}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-roman-muted italic pt-1 border-t border-roman-border">
                  🔬 <strong>Por qué ocurre:</strong> {rule.expertWhy}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
