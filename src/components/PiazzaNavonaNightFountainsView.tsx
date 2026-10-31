/**
 * Apartado Específico: Visita Exterior Nocturna a Piazza Navona y sus Tres Fuentes
 * 
 * Experiencia exterior nocturna imprescindible en Roma:
 * - El trazado elíptico del antiguo Estadio de Domiciano iluminado en mármol.
 * - Monográfico detallado de las Tres Fuentes:
 *   1. Fontana dei Quattro Fiumi (Gian Lorenzo Bernini, 1651) y la rivalidad con Borromini.
 *   2. Fontana del Moro (Giacomo della Porta, 1575 / Bernini, 1654).
 *   3. Fontana del Nettuno (Giacomo della Porta, 1574 / Della Bitta & Zappalà, 1878).
 * - Consejos de fotografía nocturna, cine (Ángeles y Demonios) y ruta a pie conectada con el Panteón.
 */

import React, { useState } from 'react';
import {
  Moon,
  Sparkles,
  Droplets,
  Camera,
  Navigation,
  Compass,
  Info,
  Film,
  Flame,
  X,
  ExternalLink
} from 'lucide-react';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';

interface PiazzaNavonaNightFountainsViewProps {
  userCoords?: Coordinates | null;
  onClose?: () => void;
}

type FountainKey = 'quattro-fiumi' | 'moro' | 'nettuno';

interface FountainData {
  id: FountainKey;
  name: string;
  nameIt: string;
  position: string;
  author: string;
  year: string;
  icon: string;
  highlight: string;
  description: string;
  curiosities: string[];
  nightPhotoTip: string;
}

const FOUNTAINS: FountainData[] = [
  {
    id: 'quattro-fiumi',
    name: 'Fuente de los Cuatro Ríos',
    nameIt: 'Fontana dei Quattro Fiumi',
    position: 'Centro de la plaza (frente a Sant\'Agnese)',
    author: 'Gian Lorenzo Bernini',
    year: '1651 (Papado de Inocencio X Pamphilj)',
    icon: '🌊',
    highlight: 'La cumbre del barroco universal: 4 colosos, un obelisco egipcio flotante y leyenda de rivalidad.',
    description: 'Representa los cuatro grandes ríos conocidos de los cuatro continentes bajo la influencia papal: el Danubio (Europa), el Nilo (África), el Ganges (Asia) y el Río de la Plata (América). La base rocosa calada es un prodigio de ingeniería: el obelisco de 16 metros parece flotar en el aire sobre una gruta hueca.',
    curiosities: [
      'El velo del Nilo: La escultura tiene la cabeza cubierta porque en el siglo XVII aún se desconocía el nacimiento del río Nilo.',
      'La mano del Río de la Plata: El mito romano dice que Bernini lo esculpió levantando la mano con terror a que la fachada de Borromini (Sant\'Agnese in Agone) se le cayera encima.',
      'El caballo y el león: En la base rocosa brotan animales exóticos bebiendo agua directamente del pilón: un caballo brioso, un león y una serpiente marina.',
      'Cine mundial: En "Ángeles y Demonios" (Dan Brown / Tom Hanks), aquí tiene lugar el intento de ahogamiento del cuarto cardenal (el elemento Agua).'
    ],
    nightPhotoTip: 'Ponte en el lateral este frente a la fuente: encuadra el Río de la Plata con la cúpula iluminada de Sant\'Agnese detrás. Con 1s de exposición nocturna el agua adquiere un velo suave.'
  },
  {
    id: 'moro',
    name: 'Fuente del Moro',
    nameIt: 'Fontana del Moro',
    position: 'Extremo Sur (frente al Palazzo Pamphilj)',
    author: 'Giacomo della Porta (1575) & Gian Lorenzo Bernini (1654)',
    year: '1575 / 1654',
    icon: '🐬',
    highlight: 'El vigoroso tritón africano dominando al delfín entre reflejos dorados.',
    description: 'Originalmente diseñada por Giacomo della Porta con delfines y tritones, en 1654 el Papa encargó a Bernini un toque maestro. Bernini esculpió la figura central: un etíope musculoso (popularmente apodado "El Moro") que forcejea con un delfín que escupe agua por la boca.',
    curiosities: [
      'El apodo popular: Los romanos lo llamaron "Il Moro" por sus rasgos africanos rizados, aunque en la iconografía clásica representaba a un tritón marino.',
      'Copias y original: En 1874 las esculturas originales de tritones se trasladaron a los jardines de Villa Borghese para preservarlas; en la plaza lucen fieles réplicas históricas.',
      'Ubicación noble: Está justo delante del majestuoso Palazzo Pamphilj (hoy sede de la Embajada de Brasil), que de noche luce sus salones y molduras iluminadas.'
    ],
    nightPhotoTip: 'La iluminación nocturna proyecta una sombra dramática sobre la espalda y los músculos del Moro. Haz una foto a media altura con el fondo de los adoquines mojados reflejando las farolas.'
  },
  {
    id: 'nettuno',
    name: 'Fuente de Neptuno',
    nameIt: 'Fontana del Nettuno',
    position: 'Extremo Norte (calle de los Calderari)',
    author: 'Giacomo della Porta (1574) / Della Bitta & Zappalà (1878)',
    year: '1574 / 1878',
    icon: '🔱',
    highlight: 'Neptuno contra el pulpo gigante: el equilibrio simétrico de la plaza.',
    description: 'Durante más de 300 años fue solo un estanque de mármol sin estatuas donde los caldereros lavaban sus cobres. Con la Unificación de Italia (1878), la ciudad organizó un concurso público para darle simetría con la Fuente del Moro. Antonio della Bitta talló al dios Neptuno blandiendo su tridente contra un monstruoso pulpo.',
    curiosities: [
      'El pulpo gigante: Della Bitta añadió la lucha con el pulpo enredado entre las piernas de Neptuno, una alegoría al dominio del hombre sobre las fuerzas indómitas del mar.',
      'Caballos marinos y nereidas: Gregorio Zappalà esculpió las criaturas mitológicas secundarias: hipocampos galopando y ninfas jugando con delfines.',
      'La perspectiva norte: Desde aquí se tiene la mejor vista panorámica longitudinal de toda la elipse de Piazza Navona hacia el sur.'
    ],
    nightPhotoTip: 'Camina unos pasos detrás de Neptuno hacia el callejón de salida norte y dispara en horizontal: capturarás las 3 fuentes alineadas en perspectiva con las luces de la plaza.'
  }
];

export const PiazzaNavonaNightFountainsView: React.FC<PiazzaNavonaNightFountainsViewProps> = ({
  userCoords,
  onClose
}) => {
  const [selectedFountain, setSelectedFountain] = useState<FountainKey>('quattro-fiumi');

  // Coordenadas del centro de Piazza Navona
  const navonaCoords = { lat: 41.8992, lng: 12.4731 };

  const currentFountain = FOUNTAINS.find((f) => f.id === selectedFountain) || FOUNTAINS[0];

  return (
    <div className="animate-page space-y-6 pb-24 text-roman-text">
      {/* Cabecera Nocturna */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Moon className="w-3.5 h-3.5" /> Paseo Nocturno Imperial & Barroco
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text flex items-center gap-2">
            Piazza Navona de Noche
          </h2>
          <p className="text-xs text-roman-muted mt-0.5">
            Las 3 Fuentes iluminadas y la magia del antiguo Estadio de Domiciano bajo las estrellas.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-roman-elevated text-roman-muted hover:text-roman-text hover:bg-roman-accent/10 transition-colors"
            title="Cerrar guía"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tarjeta de Atmósfera Nocturna */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1613] via-[#2B2420] to-[#120F0D] p-5 text-white border border-amber-900/40 shadow-xl">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> La Magia de la Noche Romana
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
            ¿Por qué Piazza Navona es obligatoria de noche?
          </h3>
          <p className="text-sm text-stone-300 leading-relaxed">
            De día bulle de turistas, pero al caer la noche (especialmente a partir de las 21:30 h), la plaza se transforma. El murmullo constante del agua de las tres fuentes cobra protagonismo absoluto. La iluminación cálida de gas resalta la textura del mármol travertino y los tonos ocres de los palacios barrocos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <span className="text-amber-400 font-bold text-xs block mb-1">🏟️ Estadio de Domiciano</span>
              <p className="text-xs text-stone-300">
                La plaza conserva intacta la forma elíptica exacta de la pista de carreras de atletismo griega (86 d.C.).
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <span className="text-amber-400 font-bold text-xs block mb-1">🎭 Bernini vs Borromini</span>
              <p className="text-xs text-stone-300">
                El duelo artístico más famoso de Roma cara a cara: la Fuente de Bernini frente a la iglesia de Borromini.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <span className="text-amber-400 font-bold text-xs block mb-1">🍨 Tartufo en Tre Scalini</span>
              <p className="text-xs text-stone-300">
                Tradición desde 1946: tomar su legendario helado de trufa negra con chocolate puro paseando entre las fuentes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTOR DE LAS TRES FUENTES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-roman-text flex items-center gap-2">
            <Droplets className="w-5 h-5 text-roman-terracotta" />
            Las Tres Fuentes de la Plaza: Monográfico Detallado
          </h3>
          <span className="text-xs text-roman-muted">Toca una fuente</span>
        </div>

        {/* Botones de selección de fuentes */}
        <div className="grid grid-cols-3 gap-2">
          {FOUNTAINS.map((fountain) => {
            const isSelected = selectedFountain === fountain.id;
            return (
              <button
                key={fountain.id}
                onClick={() => setSelectedFountain(fountain.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-roman-accent/15 border-roman-terracotta shadow-md scale-[1.02]'
                    : 'bg-roman-surface border-roman-border hover:bg-roman-elevated hover:border-roman-muted/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl">{fountain.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-roman-terracotta animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? 'text-roman-terracotta' : 'text-roman-text'}`}>
                    {fountain.name}
                  </h4>
                  <p className="text-[10px] text-roman-muted capitalize">{fountain.position.split(' ')[0]}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detalle de la Fuente Seleccionada */}
        <div className="bg-roman-surface border border-roman-border rounded-2xl p-5 shadow-sm space-y-5">
          {/* Ficha técnica superior */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-roman-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{currentFountain.icon}</span>
                <div>
                  <h4 className="font-serif text-xl font-bold text-roman-text">
                    {currentFountain.name}
                  </h4>
                  <p className="text-xs italic text-roman-muted">
                    {currentFountain.nameIt}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-right text-xs">
              <span className="font-bold text-roman-terracotta">{currentFountain.author}</span>
              <span className="text-roman-muted">{currentFountain.year}</span>
              <span className="text-[11px] text-stone-500 font-mono mt-0.5">{currentFountain.position}</span>
            </div>
          </div>

          {/* Destacado */}
          <div className="bg-roman-accent/10 border-l-4 border-roman-terracotta p-3 rounded-r-xl">
            <p className="text-xs sm:text-sm font-medium text-roman-text">
              {currentFountain.highlight}
            </p>
          </div>

          {/* Explicación en profundidad */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-roman-muted flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-roman-terracotta" /> Descripción y Simbolismo
            </h5>
            <p className="text-sm text-roman-text leading-relaxed">
              {currentFountain.description}
            </p>
          </div>

          {/* Curiosidades y Secretos */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-roman-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Curiosidades que mirar in situ
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {currentFountain.curiosities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-roman-elevated p-3 rounded-xl border border-roman-border/60">
                  <span className="text-roman-terracotta font-bold text-xs mt-0.5">•</span>
                  <span className="text-xs text-roman-text leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consejo de Foto Nocturna */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Camera className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h6 className="text-xs font-bold text-amber-700">Cómo fotografiarla de noche</h6>
              <p className="text-xs text-roman-text leading-relaxed">
                {currentFountain.nightPhotoTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RUTA NOCTURNA RECOMENDADA: Conexión con el Panteón */}
      <div className="bg-roman-surface border border-roman-border rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-roman-text flex items-center gap-2">
          <Compass className="w-5 h-5 text-roman-terracotta" />
          Ruta Nocturna Conectada (Paseo de 15 minutos)
        </h3>
        
        <p className="text-xs sm:text-sm text-roman-muted">
          Piazza Navona está a solo <strong className="text-roman-text">300 metros (4 minutos a pie)</strong> del Panteón. Es el itinerario nocturno perfecto tras cenar el sábado:
        </p>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-roman-border">
          <div className="relative">
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-roman-terracotta flex items-center justify-center text-[10px] text-white font-bold">
              1
            </div>
            <div>
              <h5 className="text-sm font-bold text-roman-text">Panteón Iluminado (Piazza della Rotonda)</h5>
              <p className="text-xs text-roman-muted mt-0.5">
                Admira las 16 columnas monolíticas bajo la luz de los faroles. El silencio exterior impresiona.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold">
              2
            </div>
            <div>
              <h5 className="text-sm font-bold text-roman-text">Paseo por las 3 Fuentes de Piazza Navona</h5>
              <p className="text-xs text-roman-muted mt-0.5">
                Entra por la Fontana del Moro (sur), recorre los 4 Ríos en el centro y culmina en Neptuno (norte).
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-roman-olive flex items-center justify-center text-[10px] text-white font-bold">
              3
            </div>
            <div>
              <h5 className="text-sm font-bold text-roman-text">Fontana di Trevi (Cierre de noche)</h5>
              <p className="text-xs text-roman-muted mt-0.5">
                Caminata de 10 min hacia el este para ver el agua turquesa iluminada y lanzar la moneda tradicional.
              </p>
            </div>
          </div>
        </div>

        {/* Botón de cómo llegar con Google Maps */}
        <div className="pt-2">
          <a
            href={getGoogleMapsWalkingUrl(navonaCoords, 'Piazza Navona, Roma', userCoords)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-roman-terracotta text-white rounded-xl font-bold text-sm shadow hover:bg-roman-terracotta/90 transition-all active:scale-[0.98]"
          >
            <Navigation className="w-4 h-4" />
            Cómo llegar a Piazza Navona a pie (GPS)
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
