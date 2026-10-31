/**
 * Apartado Específico y Monográfico: Visita a la Columna de Trajano (Colonna Traiana)
 * Obra cumbre de la escultura y la ingeniería imperial romana (113 d.C. · Apolodoro de Damasco).
 *
 * Incluye:
 * - Guía para "leer" el cómic tallado en mármol de 200 m (155 escenas, +2.500 figuras humanas).
 * - La tumba de Trajano y Plotina en el pedestal y la escalera de caracol interior de 185 peldaños.
 * - El cambio de estatua en 1587: Trajano sustituido por San Pedro por orden del Papa Sixto V.
 * - Los 3 mejores puntos de vista y consejos para hacer fotos con teleobjetivo/zoom.
 */

import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Eye,
  Camera,
  Navigation,
  Sparkles,
  BookOpen,
  Layers,
  Shield,
  HelpCircle,
  X
} from 'lucide-react';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';

interface TrajanColumnSpecialSectionProps {
  userCoords?: Coordinates | null;
  onClose?: () => void;
}

export const TrajanColumnSpecialSection: React.FC<TrajanColumnSpecialSectionProps> = ({
  userCoords,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'guia' | 'escenas' | 'secretos'>('guia');

  const columnCoords = { lat: 41.8958, lng: 12.4842 };

  return (
    <div className="animate-page space-y-6 pb-24 text-roman-text">
      {/* Cabecera del Monográfico */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider mb-1">
            🏛️ Monográfico Imperial · 113 d.C.
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            La Columna de Trajano
          </h2>
          <p className="text-xs text-roman-muted mt-0.5">
            El mayor monumento conmemorativo y el primer «cómic cinematográfico» en mármol de la Antigüedad.
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

      {/* Tarjeta Hero con métricas clave */}
      <div className="p-5 rounded-card bg-gradient-to-br from-[#2B2420] via-[#3D322B] to-roman-terracotta text-[#F7F3EC] shadow-elevated space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
            Apolodoro de Damasco · Foro de Trajano
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-mono font-bold">
            100 pies romanos (38,4 m)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/25 space-y-0.5">
            <span className="text-[10px] text-amber-200 uppercase font-bold block">Altura total</span>
            <div className="font-serif font-bold text-lg text-white">38,4 metros</div>
            <span className="text-[10px] text-white/70">Altura exacta del monte cortado</span>
          </div>

          <div className="p-3 rounded-xl bg-black/25 space-y-0.5">
            <span className="text-[10px] text-amber-200 uppercase font-bold block">Friso en espiral</span>
            <div className="font-serif font-bold text-lg text-white">200 metros</div>
            <span className="text-[10px] text-white/70">23 vueltas continuas</span>
          </div>

          <div className="p-3 rounded-xl bg-black/25 space-y-0.5">
            <span className="text-[10px] text-amber-200 uppercase font-bold block">Figuras talladas</span>
            <div className="font-serif font-bold text-lg text-white">+2.500 figuras</div>
            <span className="text-[10px] text-white/70">155 episodios bélicos</span>
          </div>

          <div className="p-3 rounded-xl bg-black/25 space-y-0.5">
            <span className="text-[10px] text-amber-200 uppercase font-bold block">Mármol de Luni</span>
            <div className="font-serif font-bold text-lg text-white">Carrara puro</div>
            <span className="text-[10px] text-white/70">29 bloques macizos</span>
          </div>
        </div>

        <a
          href={getGoogleMapsWalkingUrl(columnCoords, 'Columna de Trajano, Roma', userCoords)}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-soft flex items-center justify-center gap-2 transition"
        >
          <Navigation className="w-4 h-4" />
          Ruta a pie hacia la Columna de Trajano (Google Maps)
        </a>
      </div>

      {/* Selector de Pestañas del Monográfico */}
      <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-roman-surface border border-roman-border shadow-soft text-xs font-bold">
        <button
          onClick={() => setActiveTab('guia')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'guia'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Cómo verla</span>
        </button>

        <button
          onClick={() => setActiveTab('escenas')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'escenas'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>El «Cómic»</span>
        </button>

        <button
          onClick={() => setActiveTab('secretos')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'secretos'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Secretos & Tumba</span>
        </button>
      </div>

      {/* PESTAÑA 1: CÓMO VISITARLA Y MEJORES PUNTOS DE VISTA */}
      {activeTab === 'guia' && (
        <div className="space-y-4">
          <div className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <Eye className="w-4 h-4 text-roman-terracotta" />
              Los 3 Mejores Puntos de Observación en Roma
            </h3>
            <p className="text-xs text-roman-muted leading-relaxed">
              La columna se encuentra dentro de la zona arqueológica excavada, a unos 5 metros por debajo del nivel de calle moderno. Para apreciarla al detalle sin pagar entrada al museo:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>1. Barandilla de Via dei Fori Imperiali (Nivel de calle)</span>
                  <span className="text-[10px] text-roman-terracotta font-mono font-bold">Base & Pedestal</span>
                </div>
                <p className="text-roman-muted">
                  Es el punto más cercano. Podréis ver con nitidez los bajorrelieves de la base: pilas de armas dacias capturadas (escudos curvados, espadas falx y corazas de escamas), además de las cuatro águilas romanas sosteniendo guirnaldas de laurel.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>2. Escalinata de Santa Maria di Loreto (Oeste)</span>
                  <span className="text-[10px] text-roman-sage font-mono font-bold">Ángulo de Enfoque</span>
                </div>
                <p className="text-roman-muted">
                  Al subir unos peldaños de la iglesia renacentista gemela de Santa Maria di Loreto ganaréis altura. Desde aquí el sol ilumina de perfil los relieves a media tarde, creando sombras que revelan la musculatura y rostros de los soldados.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>3. Terraza Panorámica del Vittoriano (Piazza Venezia)</span>
                  <span className="text-[10px] text-amber-600 font-mono font-bold">Vista Aérea</span>
                </div>
                <p className="text-roman-muted">
                  A solo 2 minutos a pie. Subiendo al Monumento a Víctor Manuel II tendréis una vista cenital donde se aprecia la altura monumental de la columna en relación con el hemiciclo de los Mercados de Trajano y la Basílica Ulpia.
                </p>
              </div>
            </div>
          </div>

          {/* Consejo fotográfico para el móvil */}
          <div className="p-4 rounded-card bg-roman-elevated border border-roman-border flex items-start gap-3">
            <Camera className="w-5 h-5 text-roman-terracotta shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed space-y-1">
              <strong className="block text-roman-text font-bold">
                Tip fotográfico con el teléfono móvil:
              </strong>
              <p className="text-roman-muted">
                Usad la lente teleobjetivo (zoom óptico 3x o 5x) en vez del gran angular. Encuadrad la columna en vertical haciendo coincidir la estatua superior de San Pedro entre las dos cúpulas barrocas gemelas que tiene justo detrás.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: EL CÓMIC ESCULPIDO (CÓMO LEER EL FRISO) */}
      {activeTab === 'escenas' && (
        <div className="space-y-4">
          <div className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <Layers className="w-4 h-4 text-roman-terracotta" />
              La Tira Cómica Militar más Grande de la Historia
            </h3>
            <p className="text-xs text-roman-muted leading-relaxed">
              El friso se lee de abajo hacia arriba en sentido antihorario. Narra con rigor casi documental las dos Guerras Dacias (101-102 y 105-106 d.C.) libradas en la actual Rumanía:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>1. El Dios Danubio (En la base del fuste)</span>
                  <span className="text-[10px] text-roman-terracotta font-mono font-bold">Vuelta 1</span>
                </div>
                <p className="text-roman-muted">
                  Al inicio del friso, el río Danubio está personificado como un anciano barbudo y colosal que emerge del agua con una expresión asombrada, contemplando a las legiones romanas cruzar la frontera sobre un puente de barcas flotantes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>2. El Emperador Trajano en Acción</span>
                  <span className="text-[10px] text-roman-terracotta font-mono font-bold">Aparece 59 veces</span>
                </div>
                <p className="text-roman-muted">
                  Trajano no aparece como un semidiós mitológico, sino como el general perfecto (*Optimus Princeps*): arenga a sus tropas (*adlocutio*), supervisa la tala de bosques para abrir caminos, ofrece sacrificios y recibe a embajadores extranjeros.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1 text-xs">
                <div className="font-bold text-roman-text flex items-center justify-between">
                  <span>3. El Suicidio del Rey Decébalo</span>
                  <span className="text-[10px] text-roman-terracotta font-mono font-bold">Cerca de la cúspide</span>
                </div>
                <p className="text-roman-muted">
                  Una de las escenas más dramáticas del arte antiguo: acorralado bajo un roble por la caballería romana del jinete Tiberio Claudio Máximo, el rey dacio Decébalo se corta el cuello con su espada curva antes que desfilar encadenado por las calles de Roma.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: SECRETOS ARQUITECTÓNICOS, TUMBA Y CAMBIO DE ESTATUA */}
      {activeTab === 'secretos' && (
        <div className="space-y-4">
          <div className="p-5 rounded-card bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <Shield className="w-4 h-4 text-roman-terracotta" />
              Los Secretos que Pocos Saben de la Columna
            </h3>

            <div className="space-y-3 pt-2 text-xs">
              {/* Secreto 1: La Tumba de Oro dentro del Pedestal */}
              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1">
                <strong className="block text-roman-text font-bold">
                  ⚱️ El único emperador enterrado dentro del Pomerium sagrado:
                </strong>
                <p className="text-roman-muted leading-relaxed">
                  Las leyes de Roma prohibían terminantemente sepultar a nadie dentro de los límites sagrados de la ciudad (*pomerium*). Sin embargo, el Senado hizo una excepción histórica con Trajano: en el interior del pedestal hueco de la columna se dispuso una cámara funeraria donde se colocaron dos urnas de oro puro con las cenizas del emperador y de su esposa Plotina (saqueadas siglos después durante las invasiones visigodas).
                </p>
              </div>

              {/* Secreto 2: La Escalera Interior Oculta */}
              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1">
                <strong className="block text-roman-text font-bold">
                  🪜 La escalera de caracol de 185 peldaños:
                </strong>
                <p className="text-roman-muted leading-relaxed">
                  Los tambores de mármol de Carrara no son macizos por dentro: fueron vaciados con una precisión milimétrica antes de colocarse para albergar una escalera de caracol interior iluminada por 43 pequeñas aspilleras o ranuras verticales (que aún podéis distinguir en el fuste exterior).
                </p>
              </div>

              {/* Secreto 3: El Cambio de Estatua en 1587 */}
              <div className="p-3.5 rounded-xl bg-roman-bg border border-roman-border space-y-1">
                <strong className="block text-roman-text font-bold">
                  👑 ¿Quién está arriba? De Trajano a San Pedro:
                </strong>
                <p className="text-roman-muted leading-relaxed">
                  Originalmente coronaba la columna una colosal estatua de bronce dorado de Trajano sosteniendo una lanza. En la Edad Media desapareció, y en 1587 el Papa Sixto V ordenó cristianizar el monumento colocando la estatua de bronce de <strong>San Pedro con las llaves del cielo</strong> que veis hoy en día.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
