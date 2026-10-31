/**
 * Componente de la Pestaña Meteorológica «Tiempo en Roma»:
 * Previsión horaria paso a paso para Viernes 6, Sábado 7 y Domingo 8 de noviembre,
 * consejos de vestimenta por capas, horas de luz/atardecer para fotos y conexión con el itinerario.
 */

import React, { useState } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Moon,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Shirt,
  Umbrella,
  Compass,
  AlertCircle
} from 'lucide-react';
import { ROME_WEEKEND_WEATHER, HourlyForecastItem } from '../data/weatherData';
import { getDaysSinceRomeFoundation } from '../utils/romanDates';

interface WeatherForecastViewProps {
  onGoToPlaceDetail?: (placeId: string) => void;
}

export const WeatherForecastView: React.FC<WeatherForecastViewProps> = () => {
  const [selectedDayId, setSelectedDayId] = useState<'viernes' | 'sabado' | 'domingo'>('sabado');
  const romeChronology = getDaysSinceRomeFoundation();

  const currentDayWeather =
    ROME_WEEKEND_WEATHER.find((d) => d.dayId === selectedDayId) || ROME_WEEKEND_WEATHER[1];

  const renderWeatherIcon = (iconType: HourlyForecastItem['iconType'], className = 'w-5 h-5') => {
    switch (iconType) {
      case 'sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'cloud-sun':
        return <CloudSun className={`${className} text-amber-500`} />;
      case 'cloud':
        return <Cloud className={`${className} text-stone-400`} />;
      case 'rain':
      case 'cloud-rain':
        return <CloudRain className={`${className} text-sky-500`} />;
      case 'moon':
        return <Moon className={`${className} text-indigo-400`} />;
      default:
        return <Sun className={`${className} text-amber-500`} />;
    }
  };

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* Selector de Jornada en Chips minimalistas */}
      <div className="grid grid-cols-3 gap-2">
        {ROME_WEEKEND_WEATHER.map((day) => {
          const isSelected = day.dayId === selectedDayId;
          return (
            <button
              key={day.dayId}
              onClick={() => setSelectedDayId(day.dayId)}
              className={`touch-target py-2.5 px-3 rounded-card text-center transition border ${
                isSelected
                  ? 'bg-roman-terracotta text-white border-transparent shadow-soft font-bold'
                  : 'bg-roman-surface text-roman-muted border-roman-border hover:text-roman-text font-medium'
              }`}
            >
              <div className="text-xs sm:text-sm capitalize">{day.dayId}</div>
              <div className="text-[11px] opacity-80">
                {day.tempMax}° / {day.tempMin}°C
              </div>
            </button>
          );
        })}
      </div>

      {/* Tarjeta Hero del Día Seleccionado */}
      <section className="rounded-card bg-roman-surface border border-roman-border shadow-elevated p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-roman-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-roman-terracotta">
                Previsión Meteorológica · Roma 2026
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-roman-elevated text-roman-muted font-mono">
                🏛️ Día {romeChronology.daysFormatted} AUC
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text mt-0.5">
              {currentDayWeather.title}
            </h2>
            <p className="text-xs text-roman-muted">{currentDayWeather.dateStr}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-roman-text">
                {currentDayWeather.tempMax}°C
              </div>
              <div className="text-xs text-roman-muted">Mín: {currentDayWeather.tempMin}°C</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-roman-elevated flex items-center justify-center">
              {renderWeatherIcon('cloud-sun', 'w-7 h-7')}
            </div>
          </div>
        </div>

        {/* Resumen del cielo y probabilidad de lluvia */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-0.5">
            <div className="text-[10px] text-roman-muted uppercase font-bold flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-roman-terracotta" /> Estado
            </div>
            <div className="font-bold text-roman-text truncate">{currentDayWeather.condition}</div>
          </div>

          <div className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-0.5">
            <div className="text-[10px] text-roman-muted uppercase font-bold flex items-center gap-1">
              <Umbrella className="w-3.5 h-3.5 text-sky-500" /> Lluvia máx.
            </div>
            <div className="font-bold text-roman-text">{currentDayWeather.rainChanceMax}% prob.</div>
          </div>

          <div className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-0.5">
            <div className="text-[10px] text-roman-muted uppercase font-bold flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-500" /> Humedad
            </div>
            <div className="font-bold text-roman-text">{currentDayWeather.humidity}%</div>
          </div>

          <div className="p-3 rounded-xl bg-roman-bg border border-roman-border space-y-0.5">
            <div className="text-[10px] text-roman-muted uppercase font-bold flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Índice UV
            </div>
            <div className="font-bold text-roman-text">{currentDayWeather.uvIndex} (Moderado)</div>
          </div>
        </div>

        {/* Horas de Salida y Puesta de Sol (clave para fotos doradas en Roma) */}
        <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-amber-600" />
            <span>
              Amanecer: <strong>{currentDayWeather.sunrise}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Sunset className="w-4 h-4 text-rose-600" />
            <span>
              Puesta de sol (Hora Azul): <strong>{currentDayWeather.sunset}</strong>
            </span>
          </div>
          <span className="text-[11px] text-roman-muted">
            ✨ Mejor luz para fotos en Coliseo y Trastevere
          </span>
        </div>

        {/* Consejo experto de vestimenta para la jornada */}
        <div className="p-4 rounded-xl bg-roman-elevated border border-roman-border flex items-start gap-3">
          <Shirt className="w-5 h-5 text-roman-terracotta shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="block text-roman-text font-bold mb-0.5">
              Consejo de vestimenta y calzado para hoy:
            </strong>
            <span className="text-roman-muted">{currentDayWeather.clothingAdvice}</span>
          </div>
        </div>
      </section>

      {/* PREVISIÓN HORARIA PASO A PASO (Conectada con la actividad del viaje) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base sm:text-lg text-roman-text flex items-center gap-2">
            <Compass className="w-4 h-4 text-roman-terracotta" />
            Previsión Horaria Detallada
          </h3>
          <span className="text-xs text-roman-muted">Temperatura y probabilidad de lluvia</span>
        </div>

        <div className="space-y-2">
          {currentDayWeather.hourly.map((h, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-card bg-roman-surface border border-roman-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* Hora, icono y temperatura */}
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-roman-text w-14 shrink-0">
                  {h.time} h
                </span>
                <div className="w-8 h-8 rounded-full bg-roman-bg flex items-center justify-center shrink-0">
                  {renderWeatherIcon(h.iconType)}
                </div>
                <div>
                  <div className="font-bold text-sm text-roman-text">
                    {h.temp}°C{' '}
                    <span className="text-xs text-roman-muted font-normal">
                      (sensación {h.feelsLike}°C)
                    </span>
                  </div>
                  <div className="text-xs text-roman-muted">{h.condition}</div>
                </div>
              </div>

              {/* Actividad del itinerario en esa franja horaria */}
              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                <div className="bg-roman-bg px-3 py-1.5 rounded-xl border border-roman-border max-w-xs truncate">
                  <span className="text-roman-muted text-[10px] block uppercase font-bold">
                    En el itinerario:
                  </span>
                  <span className="font-bold text-roman-text truncate">{h.activityNote}</span>
                </div>

                {/* Probabilidad de lluvia y viento */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{h.rainProb}% lluvia</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-roman-muted justify-end">
                    <Wind className="w-3 h-3" />
                    <span>{h.windKmH} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alerta de lluvia y Plan B de Resguardo */}
      <div className="p-4 rounded-card bg-roman-surface border border-roman-border shadow-soft flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-roman-terracotta shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <strong className="block text-roman-text font-bold">
            ¿Qué hacer si llueve durante la ruta en Roma?
          </strong>
          <p className="text-roman-muted">
            En noviembre las lluvias en Roma suelen ser chubascos breves. Vuestro itinerario cuenta con
            refugios monumentales cubiertos de primer nivel: el interior del Coliseo, las excavaciones de San Clemente,
            la majestuosa nave de San Juan de Letrán y el Museo de los Mercados de Trajano el sábado; y la Basílica de
            San Pedro, el Museo del Ara Pacis y el Panteón el domingo (donde ver caer la lluvia por el óculo es un
            espectáculo asombroso).
          </p>
        </div>
      </div>
    </div>
  );
};

