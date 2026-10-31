/**
 * Sección de Información Útil para el Viaje a Roma y Lista de Comprobaciones (Checklist) pre-viaje:
 * - Alojamiento en Via Palermo 4 (dirección, notas y botones de ruta a pie desde ubicación actual).
 * - Vuelos (llegada viernes 22:00 h, salida domingo 19:00 h, salida del hotel 16:30 h).
 * - Teléfonos de emergencia (112, Guardia Médica Turística, Embajada de España en Roma).
 * - Consejos prácticos esenciales (carteristas, fuentes de agua potable "nasoni", etiqueta en iglesias, tasas y propinas).
 * - Meteorología prevista para el fin de semana del 6 al 8 de noviembre.
 * - Lista de comprobaciones interactiva (persistente en localStorage) antes del viaje.
 */

import React, { useEffect, useState } from 'react';
import {
  Home,
  Plane,
  PhoneCall,
  Droplets,
  ShieldAlert,
  Church,
  Coins,
  CloudSun,
  CheckSquare,
  Square,
  Navigation,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Coordinates, ItineraryData } from '../types/itinerary';
import { getAppleMapsWalkingUrl, getGoogleMapsWalkingUrl } from '../utils/maps';
import { getDaysSinceRomeFoundation, TRIP_YEAR, TRIP_DATES_LONG } from '../utils/romanDates';

interface UsefulInfoAndChecklistViewProps {
  data: ItineraryData;
  userCoords: Coordinates | null;
}

const CHECKLIST_STORAGE_KEY = 'roma_pretrip_checklist_state_v1';

export const UsefulInfoAndChecklistView: React.FC<UsefulInfoAndChecklistViewProps> = ({
  data,
  userCoords
}) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const chronology = getDaysSinceRomeFoundation();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, []);

  const toggleCheck = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(next);
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignorar
    }
  };

  const completedCount = data.preTripChecklist.filter((item) => checkedIds[item.id]).length;
  const hotelCoords = data.tripMeta.accommodation.coordinates;

  return (
    <div className="space-y-5 pb-24">
      {/* 🏛️ CRONOLOGÍA VIVA: DÍAS DESDE LA FUNDACIÓN DE ROMA (AB URBE CONDITA) Y AÑO DEL VIAJE */}
      <div className="p-5 rounded-3xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-roman-border pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-roman-elevated flex items-center justify-center text-roman-terracotta text-lg font-serif font-bold">
              🏛️
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-roman-terracotta">
                Cronología Viva · Ab Urbe Condita (a.U.c.)
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-roman-text">
                Tiempo desde la Fundación de Roma
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-mono font-bold">
            {chronology.aucRoman}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-roman-bg border border-roman-border space-y-1">
            <span className="text-[10px] text-roman-muted uppercase font-bold block">
              Días exactos transcurridos
            </span>
            <div className="font-serif font-bold text-xl sm:text-2xl text-roman-terracotta font-mono">
              {chronology.daysFormatted}
            </div>
            <p className="text-[11px] text-roman-muted">
              Días desde el {chronology.foundationDateStr} calculados dinámicamente en cada ejecución.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-roman-bg border border-roman-border space-y-1">
            <span className="text-[10px] text-roman-muted uppercase font-bold block">
              Año Imperial / Calendario
            </span>
            <div className="font-serif font-bold text-xl sm:text-2xl text-roman-text font-mono">
              Año {chronology.yearsAuc}
            </div>
            <p className="text-[11px] text-roman-muted">
              {chronology.aucRoman} (según la cronología de Varrón desde Rómulo).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-roman-bg border border-roman-border space-y-1">
            <span className="text-[10px] text-roman-muted uppercase font-bold block">
              Fechas Oficiales del Viaje
            </span>
            <div className="font-serif font-bold text-sm sm:text-base text-roman-text pt-0.5">
              {TRIP_DATES_LONG}
            </div>
            <p className="text-[11px] text-roman-muted">
              Año <strong>{TRIP_YEAR}</strong> (Viernes 6, Sábado 7 y Domingo 8 de Noviembre).
            </p>
          </div>
        </div>
      </div>

      {/* 1. TARJETA DEL HOTEL (Via Palermo 4) CON BOTÓN DE RUTA A CASA */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-roman-terracotta text-white p-5 shadow-xl border border-amber-400/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              <Home className="w-3.5 h-3.5" /> Punto de Partida y Regreso
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {data.tripMeta.accommodation.name}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 font-medium">
              📍 {data.tripMeta.accommodation.address} ({data.tripMeta.accommodation.zone})
            </p>
            <p className="text-xs text-stone-300 max-w-xl pt-1">
              {data.tripMeta.accommodation.notes}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 w-full sm:w-auto">
            <a
              href={getGoogleMapsWalkingUrl(hotelCoords, 'Via Palermo 4, Roma', userCoords)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition"
            >
              <Navigation className="w-4 h-4" />
              Llévame al Hotel (Google Maps)
            </a>
            <a
              href={getAppleMapsWalkingUrl(hotelCoords, 'Via Palermo 4, Roma', userCoords)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition"
            >
              <MapPin className="w-4 h-4" />
              Abrir en Apple Maps
            </a>
          </div>
        </div>
      </div>

      {/* 2. HORARIOS DE VUELOS Y SALIDA CRÍTICA DEL DOMINGO 16:30 H */}
      <div className="bg-white dark:bg-roman-slate rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white flex items-center gap-2">
          <Plane className="w-5 h-5 text-roman-terracotta dark:text-amber-400" />
          Vuelos y Traslados (Grupo de 5 Personas)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
            <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px]">
              Llegada a Roma
            </span>
            <p className="font-bold text-stone-900 dark:text-white mt-0.5">
              {data.tripMeta.flights.arrival}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60">
            <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 text-[10px]">
              ⚠️ Salida hacia Aeropuerto
            </span>
            <p className="font-bold text-amber-950 dark:text-amber-100 mt-0.5">
              {data.tripMeta.flights.hotelExitSunday}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
            <span className="font-bold uppercase tracking-wider text-stone-400 text-[10px]">
              Vuelo de Regreso
            </span>
            <p className="font-bold text-stone-900 dark:text-white mt-0.5">
              {data.tripMeta.flights.departure}
            </p>
          </div>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 bg-stone-100/80 dark:bg-stone-900/90 p-3 rounded-xl">
          🚐 <strong>Consejo de traslado para 5 viajeros:</strong> {data.tripMeta.flights.transferAdvice}
        </p>
      </div>

      {/* 3. METEOROLOGÍA PREVISTA (6-8 NOVIEMBRE DE 2026 EN ROMA) */}
      <div className="bg-white dark:bg-roman-slate rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-amber-500" />
          Meteorología Prevista en Roma (6 – 8 de Noviembre de 2026)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.days.map((day) => (
            <div
              key={day.id}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs capitalize text-roman-terracotta dark:text-amber-400">
                  {day.title}
                </span>
                <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md">
                  {day.weatherSummary.tempMax}° / {day.weatherSummary.tempMin}°C
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                {day.weatherSummary.condition} · Lluvia: {day.weatherSummary.rainChance}%
              </p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {day.weatherSummary.advice}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONSEJOS PRÁCTICOS DE SUPERVIVENCIA ROMANA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="bg-white dark:bg-roman-slate p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-blue-700 dark:text-blue-400">
            <Droplets className="w-4 h-4" /> Fuentes Potables «Nasoni» (Gratis)
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            No compréis botellas de plástico caras en puestos callejeros: Roma tiene más de 2.500 fuentes de hierro fundido (<em>nasoni</em>) con agua fresca y 100% potable que mana directamente del acueducto de montaña de Acqua Marcia. Si tapáis con un dedo el orificio inferior del caño curvo, un chorrito sale disparado por el agujero superior para beber cómodamente sin tocar el metal.
          </p>
        </div>

        <div className="bg-white dark:bg-roman-slate p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-purple-700 dark:text-purple-400">
            <Church className="w-4 h-4" /> Etiqueta en Iglesias y Pausas de Mediodía
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            En San Pedro del Vaticano, San Juan de Letrán, San Clemente, San Pietro in Vincoli, San Luis y el Gesù se exige llevar <strong>hombros y rodillas cubiertos</strong>. Muchas iglesias cierran entre las <strong>12:30 y las 15:00/16:00 h</strong> (nuestro itinerario ya ha sido calculado al minuto para evitar encontrarlas cerradas). Llevad monedas de 1 € para encender los focos de las capillas.
          </p>
        </div>

        <div className="bg-white dark:bg-roman-slate p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-red-700 dark:text-red-400">
            <ShieldAlert className="w-4 h-4" /> Prevención de Carteristas y Estafas
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Roma es muy segura para caminar de día y de noche, pero tened precaución con los bolsos y bolsillos traseros en aglomeraciones (Fontana di Trevi, tornos del Metro Termini/Repubblica y entrada al Coliseo). Ignorad a quienes regalan «pulseras de la amistad» o rosas en el Coliseo y Trastevere, así como a falsos gladiadores que piden foto.
          </p>
        </div>

        <div className="bg-white dark:bg-roman-slate p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-amber-700 dark:text-amber-400">
            <Coins className="w-4 h-4" /> Tasas, «Coperto», Pagos y Transporte
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            La moneda es el <strong>Euro (€)</strong> y en casi todo Roma se acepta tarjeta contactless (incluido el Metro con sistema <em>Tap &amp; Go</em> a 1,50 € el viaje). En restaurantes es legal el cargo de <em>Pane e Coperto</em> (1,50 – 3 € por persona, debe figurar en carta); la propina no es obligatoria. Tasa municipal de alojamiento: 6 a 7,50 € por persona/noche.
          </p>
        </div>
      </div>

      {/* 5. TELÉFONOS DE EMERGENCIA CON MARCACIÓN DIRECTA */}
      <div className="bg-red-50/80 dark:bg-red-950/30 rounded-3xl p-5 border border-red-200 dark:border-red-800/60 space-y-3">
        <h3 className="font-serif font-bold text-base text-red-900 dark:text-red-300 flex items-center gap-2">
          <PhoneCall className="w-5 h-5" /> Teléfonos de Emergencia en Roma (Un toque para llamar)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-red-200 dark:border-red-800 flex items-center justify-between hover:shadow transition"
          >
            <div>
              <div className="font-bold text-red-700 dark:text-red-400 text-sm">112</div>
              <div className="text-stone-600 dark:text-stone-300">Emergencias General UE (Policía / Ambulancia)</div>
            </div>
            <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
          </a>

          <a
            href="tel:+39066840401"
            className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-red-200 dark:border-red-800 flex items-center justify-between hover:shadow transition"
          >
            <div>
              <div className="font-bold text-stone-900 dark:text-white">+39 06 684 0401</div>
              <div className="text-stone-600 dark:text-stone-300">Consulado / Embajada de España en Roma</div>
            </div>
            <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
          </a>

          <a
            href="tel:+39063570"
            className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-red-200 dark:border-red-800 flex items-center justify-between hover:shadow transition"
          >
            <div>
              <div className="font-bold text-stone-900 dark:text-white">+39 06 3570</div>
              <div className="text-stone-600 dark:text-stone-300">Radio Taxi Oficial Cooperativa Roma</div>
            </div>
            <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
          </a>
        </div>
      </div>

      {/* 6. LISTA DE COMPROBACIONES ANTES DEL VIAJE (CHECKLIST INTERACTIVA) */}
      <div className="bg-white dark:bg-roman-slate rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              ✅ Lista de Comprobaciones Antes del Viaje
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Marca cada punto conforme el grupo lo tenga verificado (se guarda automáticamente en tu móvil).
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            {completedCount} / {data.preTripChecklist.length} completados
          </span>
        </div>

        <div className="space-y-2.5">
          {data.preTripChecklist.map((item) => {
            const isDone = Boolean(checkedIds[item.id]);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`cursor-pointer p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 opacity-80'
                    : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-roman-terracotta'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-roman-terracotta dark:text-amber-400 shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isDone
                          ? 'line-through text-stone-500'
                          : 'text-stone-900 dark:text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-semibold">
                      {item.category}
                    </span>
                    {item.urgent && !isDone && (
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-bold">
                        Importante
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-roman-terracotta dark:text-amber-400 hover:underline mt-1.5"
                    >
                      <ExternalLink className="w-3 h-3" /> Abrir web oficial de reserva
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

