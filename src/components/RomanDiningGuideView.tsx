/**
 * Componente: Modo Restaurantes & Guía Gastronómica Romana («Dove Mangiare a Roma»)
 * Diseñado a medida para los 5 viajeros alojados en Via Palermo 4 (Monti):
 * - Guía curada de trattorias auténticas, aperitivos y heladerías históricas.
 * - Filtros por zonas clave del viaje: Monti (junto al hotel), Trastevere y Ghetto/Panteón.
 * - Guía de las 4 pastas sagradas romanas (Carbonara, Cacio e Pepe, Amatriciana, Gricia)
 *   y antipasti con sus reglas para evitar trampas de turistas.
 * - Botones directos de cómo llegar a pie desde Via Palermo 4 o la ubicación GPS.
 */

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Sparkles,
  AlertTriangle,
  Wine,
  Heart,
  ChevronRight,
  Coffee
} from 'lucide-react';
import {
  ROMAN_RESTAURANTS,
  ROMAN_SIGNATURE_DISHES,
  RomanRestaurant,
  RomanDish
} from '../data/romanDiningData';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';

interface RomanDiningGuideViewProps {
  userCoords?: Coordinates | null;
  hotelCoords?: Coordinates;
  onClose?: () => void;
  onOpenGelatoRadar?: () => void;
}

export const RomanDiningGuideView: React.FC<RomanDiningGuideViewProps> = ({
  userCoords,
  onClose,
  onOpenGelatoRadar
}) => {
  const [activeTab, setActiveTab] = useState<'restaurantes' | 'platos'>('restaurantes');
  const [selectedZone, setSelectedZone] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Filtrado de restaurantes
  const filteredRestaurants = ROMAN_RESTAURANTS.filter((r) => {
    const matchZone = selectedZone === 'todos' || r.zone === selectedZone;
    const matchCat = selectedCategory === 'todos' || r.category === selectedCategory;
    return matchZone && matchCat;
  });

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Cabecera Principal */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider mb-1">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Gastronomía Romana Auténtica
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            Dónde Comer & Platos Típicos
          </h2>
          <p className="text-xs text-roman-muted mt-0.5">
            Selección sin trampas para turistas en Monti, Trastevere y el Ghetto Judío.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="touch-target px-3.5 py-2 rounded-xl bg-roman-surface border border-roman-border text-xs font-bold text-roman-muted hover:text-roman-text transition"
          >
            Volver
          </button>
        )}
      </div>

      {/* Selector de Sección: Dónde Comer vs Las 4 Pastas Romanas */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-roman-surface border border-roman-border shadow-soft">
        <button
          onClick={() => setActiveTab('restaurantes')}
          className={`touch-target py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'restaurantes'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Restaurantes & Trattorias ({ROMAN_RESTAURANTS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('platos')}
          className={`touch-target py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'platos'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Las 4 Pastas & Secretos</span>
        </button>
      </div>

      {/* SECCIÓN 1: RESTAURANTES & TRATTORIAS */}
      {activeTab === 'restaurantes' && (
        <div className="space-y-4">
          {/* Filtros por Zona */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-roman-muted block">
              Filtrar por Zona del Itinerario:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'todos', label: 'Todas las zonas' },
                { id: 'Monti', label: '🏨 Monti (Junto al Hotel)' },
                { id: 'Trastevere', label: '🍷 Trastevere' },
                { id: 'Ghetto & Panteón', label: '🏛️ Ghetto & Panteón' }
              ].map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`touch-target px-3 py-1.5 rounded-full text-xs font-bold transition border ${
                      isSelected
                        ? 'bg-roman-terracotta text-white border-transparent shadow-soft'
                        : 'bg-roman-surface text-roman-muted border-roman-border hover:text-roman-text'
                    }`}
                  >
                    {zone.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtros por Tipo de Local */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[
              { id: 'todos', label: 'Todo' },
              { id: 'trattoria', label: '🍝 Trattorias tradicionales' },
              { id: 'aperitivo', label: '🧀 Aperitivo & Tablas de vino' },
              { id: 'dulces', label: '☕ Helados & Maritozzo' }
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`touch-target px-2.5 py-1 rounded-xl text-[11px] font-medium transition border ${
                    isSelected
                      ? 'bg-[#2B2420] text-[#F7F3EC] dark:bg-[#F5F0E8] dark:text-[#181412] border-transparent font-bold'
                      : 'bg-roman-bg text-roman-muted border-roman-border hover:text-roman-text'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Banner de acceso directo al Radar de Gelato Auténtico */}
          {onOpenGelatoRadar && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/5 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">🍦</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-roman-text">
                    ¿Buscas el mejor helado artesano de Roma?
                  </h4>
                  <p className="text-xs text-roman-muted leading-relaxed">
                    Aprende las 5 reglas para detectar fraudes químicos (pistacho, montañas de grasa) y descubre Frigidarium, Giolitti y Fatamorgana a 4′ de casa.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenGelatoRadar}
                className="touch-target px-4 py-2 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-xs shrink-0 shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <span>Abrir Radar de Gelato</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* Listado de Restaurantes en Tarjetas */}
          <div className="space-y-4 pt-1">
            {filteredRestaurants.map((restaurant: RomanRestaurant) => (
              <div
                key={restaurant.id}
                className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3.5 transition hover:border-roman-terracotta/40"
              >
                {/* Cabecera con nombre, zona y precio */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-roman-border/70 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-roman-text">
                        {restaurant.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-[10px] font-bold">
                        {restaurant.priceRange} · {restaurant.approxPricePerson}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-roman-muted mt-1">
                      <MapPin className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                      <span>{restaurant.address}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-roman-bg border border-roman-border text-[11px] font-bold text-roman-text">
                    📍 {restaurant.walkingMinutesFromHotel} min a pie del hotel
                  </span>
                </div>

                {/* Plato estrella imprescindible */}
                <div className="p-3 rounded-xl bg-roman-elevated/70 border border-roman-border flex items-start gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-roman-terracotta shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-roman-text font-bold block mb-0.5">
                      Plato imprescindible que debéis pedir:
                    </strong>
                    <span className="text-roman-text">{restaurant.mustOrderDish}</span>
                  </div>
                </div>

                {/* Consejo experto de reserva / horas */}
                <div className="text-xs text-roman-muted leading-relaxed">
                  💡 <strong>Consejo experto:</strong> {restaurant.expertTip}
                </div>

                {/* Horario y Botones de Acción */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-roman-border/70 text-xs">
                  <div className="flex items-center gap-1.5 text-roman-muted text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                    <span>{restaurant.schedule}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {restaurant.phone && (
                      <a
                        href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                        className="touch-target px-3 py-1.5 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text font-bold text-xs inline-flex items-center gap-1.5 transition"
                        title="Llamar para reservar"
                      >
                        <Phone className="w-3.5 h-3.5 text-roman-sage" />
                        <span>Llamar</span>
                      </a>
                    )}

                    <a
                      href={getGoogleMapsWalkingUrl(
                        restaurant.coordinates,
                        restaurant.name,
                        userCoords
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target px-3.5 py-1.5 rounded-xl bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-soft transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo llegar</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: LAS 4 PASTAS SAGRADAS & SECRETOS GASTRONÓMICOS */}
      {activeTab === 'platos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft">
            <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              El Olimpo de la Pasta Romana
            </h3>
            <p className="text-xs text-roman-muted mt-1 leading-relaxed">
              En Roma la pasta es religión de Estado. Estas 4 recetas comparten una evolución histórica
              maravillosa donde cada una añade un único ingrediente maestro a la anterior:
              <strong> Gricia</strong> (guanciale + pecorino) $\rightarrow$ <strong>Amatriciana</strong> (+ tomate)
              $\rightarrow$ <strong>Carbonara</strong> (+ huevo).
            </p>
          </div>

          <div className="space-y-3.5">
            {ROMAN_SIGNATURE_DISHES.map((dish: RomanDish) => (
              <div
                key={dish.id}
                className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-roman-border pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-roman-terracotta">
                      {dish.category === 'pasta'
                        ? 'Pasta Tradicional'
                        : dish.category === 'antipasto'
                        ? 'Antipasto Clásico'
                        : 'Dulce / Desayuno'}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-roman-text">
                      {dish.name}
                    </h4>
                  </div>
                  <span className="text-xs italic font-serif text-roman-muted">
                    {dish.originalName}
                  </span>
                </div>

                <p className="text-xs text-roman-text leading-relaxed">
                  {dish.shortDesc}
                </p>

                <div className="p-2.5 rounded-xl bg-roman-bg border border-roman-border text-xs">
                  <strong className="text-roman-muted text-[11px] block uppercase font-bold">
                    Ingredientes tradicionales:
                  </strong>
                  <span className="text-roman-text font-medium">{dish.ingredients}</span>
                </div>

                {/* Regla de Oro / Trampa de Turistas */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  {dish.authenticityRule}
                </div>

                {/* Maridaje de vino */}
                <div className="flex items-center gap-2 text-xs text-roman-muted pt-1">
                  <Wine className="w-3.5 h-3.5 text-roman-terracotta shrink-0" />
                  <span>
                    <strong>Maridaje recomendado:</strong> {dish.winePairing}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

