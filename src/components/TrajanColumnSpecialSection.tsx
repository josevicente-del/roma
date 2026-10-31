/**
 * Sección Separada y Monográfica: La Columna de Trajano (Colonna Traiana · 113 d.C.)
 * 
 * Basada en las investigaciones arqueológicas e infográficas de National Geographic
 * («A War Diary Soars Over Rome» / Fernando G. Baptista) y Apolodoro de Damasco.
 * 
 * Contenido estructurado:
 * 1. Infografía Anatómica & Prodigio de Ingeniería:
 *    - 38,4 m (128 pies) = altura exacta de la colina Quirinal demolida por Apolodoro.
 *    - 29 bloques macizos de mármol de Luni (Carrara), capitel de 53 toneladas a 34m.
 *    - Escalera de caracol interior de 185 peldaños (vaciada antes de izar) y 43 aspilleras.
 *    - Cámara funeraria en el pedestal con las urnas de oro de Trajano y Plotina.
 *    - El truco óptico de perspectiva de Apolodoro: banda de 89 cm en la base a 125 cm en la cima.
 * 2. Las 8 Escenas Cumbre del Friso (Desglose National Geographic):
 *    - Escena I: Danubius y el puente de barcas.
 *    - Escena XII: La logística e ingeniería legionaria.
 *    - Escena XXIV: Carga de caballería y la espada curva dacia (falx).
 *    - Escena LXXV: El Gran Puente de Drobeta sobre el Danubio (+1.100 m).
 *    - Escena XLV: La tortura de legionarios romanos.
 *    - Escena CXXX: La caída de Sarmizegetusa y el caldero de veneno.
 *    - Escena CXLV: El suicidio del rey Decébalo bajo el roble.
 *    - Escena CLI: El tesoro del río Sargetia (165 t de oro) y el éxodo.
 * 3. Audioguía con Voz Natural HD integrada.
 * 4. Puntos de vista y fotografía in situ.
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
  ExternalLink,
  Flame,
  Award,
  Maximize2,
  X
} from 'lucide-react';
import { Coordinates } from '../types/itinerary';
import { getGoogleMapsWalkingUrl } from '../utils/maps';
import { NaturalAudioGuidePlayer } from './NaturalAudioGuidePlayer';

interface TrajanColumnSpecialSectionProps {
  userCoords?: Coordinates | null;
  onClose?: () => void;
  isStandaloneTab?: boolean;
}

type TabKey = 'infografia' | 'escenas' | 'secretos' | 'visita';

interface SceneDetail {
  id: string;
  numberRoman: string;
  title: string;
  subtitle: string;
  icon: string;
  ngDetails: string;
  historicalSignificance: string;
  whatToLookFor: string;
}

const NG_SCENES: SceneDetail[] = [
  {
    id: 'danubius',
    numberRoman: 'Escenas I – V',
    title: 'El Despertar de Danubius & Cruce del Río',
    subtitle: 'El dios fluvial barbudo emerge de las aguas para bendecir a Roma',
    icon: '🌊',
    ngDetails: 'En el nacimiento exacto del friso en la base de la columna, el río Danubio está personificado como un anciano titán con espesa barba y torso desnudo que emerge de una gruta rocosa. Contempla asombrado a las legiones romanas de Trajano cruzando la frontera del imperio sobre un puente de barcas unidas con tablones de madera.',
    historicalSignificance: 'Simboliza que las fuerzas salvajes de la naturaleza no combaten a Roma, sino que se someten voluntariamente ante el destino civilizador del emperador.',
    whatToLookFor: 'Fijaos en la mano izquierda del dios Danubio apoyada en la orilla mientras con su brazo derecho parece calmar la corriente para que las barcazas no zozobren.'
  },
  {
    id: 'logistica',
    numberRoman: 'Escenas XII – XVI',
    title: 'La Logística Militar: Tala de Bosques y Empalizadas',
    subtitle: 'Roma no venció solo con la espada, sino con hachas, palas y carretas',
    icon: '🪓',
    ngDetails: 'National Geographic destaca que más de un tercio de la columna no muestra combates, sino obras de ingeniería. Se observan legionarios talando robles milenarios, desmochando troncos, excavando fosos defensivos y levantando campamentos fortificados de sillería y estacas con sus armaduras puestas.',
    historicalSignificance: 'Refleja la estricta disciplina del ejército romano: un soldado de Trajano era antes un zapador e ingeniero de caminos que un combatiente.',
    whatToLookFor: 'Mirad cómo los legionarios apilan los bloques de madera con poleas y cómo los soldados transportan cestas de tierra sobre los hombros para nivelar el terreno.'
  },
  {
    id: 'batalla-falx',
    numberRoman: 'Escenas XXIV – XXVII',
    title: 'El Choque Sangriento & La Falx Dacia',
    subtitle: 'La espada curva que obligó a Roma a rediseñar sus armaduras',
    icon: '⚔️',
    ngDetails: 'Violento combate cuerpo a cuerpo en el bosque de Tapae (101 d.C.). Los dacios empuñan la temida falx, una espada curva a dos manos capaz de seccionar brazos y partir los cascos de bronce tradicionales.',
    historicalSignificance: 'Esta batalla obligó a los ingenieros militares de Trajano a incorporar barras cruzadas de hierro reforzado en los cascos legionarios y grebas protectoras en las piernas.',
    whatToLookFor: 'En el relieve se ve a los dioses Júpiter Tonante arrojando rayos desde el cielo en apoyo de las legiones mientras la caballería romana envuelve los flancos dacios.'
  },
  {
    id: 'gran-puente',
    numberRoman: 'Escenas LXXIV – LXXVI',
    title: 'El Gran Puente de Trajano sobre el Danubio',
    subtitle: 'La mayor obra de ingeniería militar de toda la Antigüedad',
    icon: '🌉',
    ngDetails: 'Diseñado por el arquitecto Apolodoro de Damasco en Drobeta (105 d.C.). Medía 1.135 metros de longitud y 19 metros de altura sobre las aguas, sostenido por 20 gigantescos pilares de sillería de piedra levantados desviando el cauce con ataguías.',
    historicalSignificance: 'Permitió cruzar al ejército entero con caballos, piezas de artillería (catapultas y balistas) y víveres en cuestión de horas, sellando el destino de Dacia.',
    whatToLookFor: 'Trajano aparece en el centro vertiendo una libación de vino sobre un altar en la orilla mientras las tropas desfilan sobre los arcos de madera de roble del puente.'
  },
  {
    id: 'tortura',
    numberRoman: 'Escena XLV',
    title: 'La Tortura de Prisioneros Romanos',
    subtitle: 'Una de las escenas más crudas y dramáticas del arte clásico',
    icon: '🔥',
    ngDetails: 'Mujeres dacias desnudas de cintura para arriba aplican antorchas encendidas y tizones sobre los cuerpos desarmados y atados de soldados romanos capturados.',
    historicalSignificance: 'Es una muestra insólita de realismo y sufrimiento en un monumento triunfal: los escultores no ocultaron la crueldad de la guerra ni el dolor infligido a sus propios legionarios.',
    whatToLookFor: 'La expresión de agonía de los rostros de los prisioneros romanos y la determinación furiosa de las matronas dacias defendiendo su territorio.'
  },
  {
    id: 'sarmizegetusa',
    numberRoman: 'Escenas CXXX – CXXXIV',
    title: 'La Caída de Sarmizegetusa & El Veneno',
    subtitle: 'El trágico final de la capital montañosa de Dacia',
    icon: '🏛️',
    ngDetails: 'En el año 106 d.C., las legiones cercan la capital fortificada en los Cárpatos y cortan los acueductos subterráneos de agua potable. Ante la sed y la derrota inminente, los aristócratas dacios se reúnen en torno a un gran caldero comunitario de veneno para morir libres antes de ser reducidos a la esclavitud.',
    historicalSignificance: 'Trajano quiso dejar constancia del coraje y la dignidad de su enemigo: no eran simples bárbaros incivilizados, sino guerreros de formidable honor.',
    whatToLookFor: 'Un noble dacio repartiendo la copa de cicuta mientras varios cadáveres yacen ya en el suelo sostenidos por sus compañeros con gestos de resignación estoica.'
  },
  {
    id: 'suicidio-decebalo',
    numberRoman: 'Escena CXLV',
    title: 'El Heroico Suicidio del Rey Decébalo',
    subtitle: 'El líder dacio se degüella bajo un roble ante la caballería romana',
    icon: '👑',
    ngDetails: 'Acorralado en lo profundo del bosque sagrado por el explorador de caballería Tiberio Claudio Máximo, el rey Decébalo cae de rodillas al pie de un roble centenario y utiliza su propia daga curva (sica) para rebanarse la garganta antes de permitir que lo exhiban encadenado en Roma.',
    historicalSignificance: 'Es la escena cumbre de toda la columna. Su cabeza y su mano derecha fueron cortadas y llevadas a Roma para ser arrojadas por las Escaleras Gemonias.',
    whatToLookFor: 'La mano de Decébalo empuñando la daga en su cuello mientras un soldado romano a caballo extiende el brazo intentando atraparlo con vida antes de que expire.'
  },
  {
    id: 'tesoro-sargetia',
    numberRoman: 'Escenas CLI – CLV',
    title: 'El Fabuloso Tesoro del Río Sargetia & El Éxodo',
    subtitle: '165 toneladas de oro y 330 toneladas de plata para transformar Roma',
    icon: '💰',
    ngDetails: 'Antes de morir, Decébalo desvió el curso del río Sargetia con esclavos, enterró en el lecho su legendario tesoro de lingotes y vajillas, lo cubrió con rocas y mandó ejecutar a todos los obreros. Un noble dacio delató el secreto a Trajano. En la columna se ve a mulas y bueyes cargados con alforjas repletas de recipientes de oro cruzando hacia Roma.',
    historicalSignificance: 'Este botín colosal salvó a Roma de la bancarrota: financió la construcción de este Foro, los Mercados, el acueducto Aqua Traiana y 123 días de juegos en el Coliseo.',
    whatToLookFor: 'Familias dacias enteras con niños en brazos y rebaños de ovejas iniciando la deportación hacia nuevas tierras del Imperio.'
  }
];

export const TrajanColumnSpecialSection: React.FC<TrajanColumnSpecialSectionProps> = ({
  userCoords,
  onClose,
  isStandaloneTab = false
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('infografia');
  const [selectedSceneId, setSelectedSceneId] = useState<string>('danubius');

  const columnCoords = { lat: 41.8958, lng: 12.4842 };
  const currentScene = NG_SCENES.find((s) => s.id === selectedSceneId) || NG_SCENES[0];

  return (
    <div className={`space-y-6 text-roman-text ${isStandaloneTab ? 'pb-28 max-w-4xl mx-auto' : 'pb-16'}`}>
      {/* Cabecera Principal */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider">
              🏛️ Monográfico National Geographic · 113 d.C.
            </span>
            <span className="text-[11px] font-mono text-roman-muted">Apolodoro de Damasco</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            La Columna de Trajano
          </h2>
          <p className="text-xs text-roman-muted mt-0.5">
            El mayor monumento triunfal y el primer «cómic cinematográfico» en mármol de la historia.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="touch-target px-3.5 py-2 rounded-xl bg-roman-surface border border-roman-border text-xs font-bold text-roman-muted hover:text-roman-text transition"
          >
            Cerrar Guía
          </button>
        )}
      </div>

      {/* Selector de Pestañas del Monográfico */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 rounded-2xl bg-roman-surface border border-roman-border shadow-soft text-xs font-bold">
        <button
          onClick={() => setActiveTab('infografia')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'infografia'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Anatomía & Obra</span>
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
          <span>2. Las 8 Escenas (NG)</span>
        </button>

        <button
          onClick={() => setActiveTab('secretos')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'secretos'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>3. Tumba & Secreto</span>
        </button>

        <button
          onClick={() => setActiveTab('visita')}
          className={`touch-target py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition ${
            activeTab === 'visita'
              ? 'bg-roman-terracotta text-white shadow-soft'
              : 'text-roman-muted hover:text-roman-text'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>4. Miradores & Foto</span>
        </button>
      </div>

      {/* PESTAÑA 1: INFOGRAFÍA ANATÓMICA Y PRODIGIO DE INGENIERÍA */}
      {activeTab === 'infografia' && (
        <div className="space-y-5 animate-page">
          {/* Tarjeta Hero de Dimensiones */}
          <div className="rounded-2xl bg-gradient-to-br from-[#2B2420] via-[#382B24] to-[#1C1613] text-white p-5 border border-roman-border shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Infografía Técnica · Fernando G. Baptista (NG)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  Anatomía de un Prodigio Imperial
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-amber-400">38,4 m</span>
                <span className="text-[11px] text-stone-300 block">128 pies romanos de altura</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              La inscripción en la base revela un dato asombroso: su altura de 38,4 metros marca exactamente la altura de la ladera montañosa que unía el Quirinal y el Capitolio que el arquitecto <strong>Apolodoro de Damasco</strong> tuvo que excavar y desmontar a mano para abrir espacio al Foro de Trajano.
            </p>

            {/* Cuadrícula de 4 Datos de Ingeniería Descomunal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-black/35 backdrop-blur-sm p-3 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Mármol de Luni</span>
                <div className="font-serif font-bold text-lg text-white">29 Bloques</div>
                <p className="text-[10px] text-stone-300">De hasta 32 toneladas cada tambor de Carrara.</p>
              </div>

              <div className="bg-black/35 backdrop-blur-sm p-3 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">El Capitel Dórico</span>
                <div className="font-serif font-bold text-lg text-white">53,3 Toneladas</div>
                <p className="text-[10px] text-stone-300">Izado de una sola pieza a 34 m con poleas humanas.</p>
              </div>

              <div className="bg-black/35 backdrop-blur-sm p-3 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Escalera de Caracol</span>
                <div className="font-serif font-bold text-lg text-white">185 Peldaños</div>
                <p className="text-[10px] text-stone-300">Vaciados DENTRO del mármol antes de izar.</p>
              </div>

              <div className="bg-black/35 backdrop-blur-sm p-3 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Luz Natural Interior</span>
                <div className="font-serif font-bold text-lg text-white">43 Aspilleras</div>
                <p className="text-[10px] text-stone-300">Ventanas sutiles que no cortan las figuras del friso.</p>
              </div>
            </div>
          </div>

          {/* Infografía: El Truco Óptico Magistral de Apolodoro */}
          <div className="p-4 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-roman-terracotta">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-roman-text">
                El Truco Óptico de Perspectiva (Corrección Geométrica)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-roman-muted leading-relaxed">
              Si el friso tuviese la misma anchura de abajo a arriba, las figuras de la cúspide se verían diminutas desde el suelo. Apolodoro ideó una genialidad matemática:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-roman-text">Banda en la Base</span>
                  <span className="font-mono text-xs font-bold text-roman-terracotta">89 cm de ancho</span>
                </div>
                <p className="text-[11px] text-roman-muted">
                  Figuras de 60-70 cm de altura, situadas cerca del ojo del espectador en la plaza.
                </p>
              </div>

              <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-roman-text">Banda en la Cúspide</span>
                  <span className="font-mono text-xs font-bold text-roman-terracotta">125 cm de ancho</span>
                </div>
                <p className="text-[11px] text-roman-muted">
                  Se ensancha progresivamente un 40% para que parezcan del mismo tamaño exacto.
                </p>
              </div>
            </div>
          </div>

          {/* Infografía: Policromía Original & Armas de Bronce */}
          <div className="p-4 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-2.5">
            <h4 className="font-serif font-bold text-base text-roman-text flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              ¿Cómo se veía en el 113 d.C.? Policromía y Bronce Real
            </h4>
            <p className="text-xs sm:text-sm text-roman-muted leading-relaxed">
              Hoy vemos mármol blanco despojado, pero las investigaciones con microscopio y luz ultravioleta demostraron que la columna estaba pintada con pigmentos intensos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-red-900/10 border border-red-500/20 text-red-900 dark:text-red-300">
                <strong>Rojo Cinabrio y Púrpura:</strong> Capas del emperador Trajano y estandartes de las legiones.
              </div>
              <div className="p-2.5 rounded-xl bg-blue-900/10 border border-blue-500/20 text-blue-900 dark:text-blue-300">
                <strong>Azul Egipcio:</strong> El río Danubio, el cielo y las cotas de malla de los dacios.
              </div>
              <div className="p-2.5 rounded-xl bg-amber-900/10 border border-amber-500/20 text-amber-900 dark:text-amber-300">
                <strong>Armas de Bronce Real:</strong> Las espadas, lanzas y riendas no estaban talladas en piedra; eran de metal insertadas en agujeros que aún son visibles.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: LAS 8 ESCENAS CUMBRE SEGÚN NATIONAL GEOGRAPHIC */}
      {activeTab === 'escenas' && (
        <div className="space-y-5 animate-page">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-roman-text flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-roman-terracotta" />
                El Cómic de 200 Metros: 8 Escenas Cumbre
              </h3>
              <p className="text-xs text-roman-muted">
                155 escenas, 23 vueltas helicoidales y 2.662 figuras talladas.
              </p>
            </div>
            <span className="text-xs text-roman-muted">Selecciona una escena</span>
          </div>

          {/* Selector de las 8 Escenas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {NG_SCENES.map((scene) => {
              const isSelected = scene.id === selectedSceneId;
              return (
                <button
                  key={scene.id}
                  onClick={() => setSelectedSceneId(scene.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-roman-accent/15 border-roman-terracotta shadow-md scale-[1.02]'
                      : 'bg-roman-surface border-roman-border hover:bg-roman-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg">{scene.icon}</span>
                    <span className="text-[10px] font-mono text-roman-muted">{scene.numberRoman}</span>
                  </div>
                  <div className="mt-1">
                    <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-roman-terracotta' : 'text-roman-text'}`}>
                      {scene.title}
                    </h4>
                    <p className="text-[10px] text-roman-muted line-clamp-1">{scene.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ficha Detallada de la Escena Seleccionada */}
          <div className="p-5 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-roman-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{currentScene.icon}</span>
                <div>
                  <span className="text-xs font-mono font-bold text-roman-terracotta block">
                    {currentScene.numberRoman}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-roman-text">
                    {currentScene.title}
                  </h4>
                  <p className="text-xs italic text-roman-muted">{currentScene.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Análisis National Geographic */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-roman-terracotta flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Relato del Friso según National Geographic
              </h5>
              <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
                {currentScene.ngDetails}
              </p>
            </div>

            {/* Significado Histórico y Político */}
            <div className="p-3.5 rounded-xl bg-roman-elevated border border-roman-border space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-roman-muted block">
                Significado Histórico
              </span>
              <p className="text-xs text-roman-text leading-relaxed">
                {currentScene.historicalSignificance}
              </p>
            </div>

            {/* Qué mirar in situ con zoom */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-amber-800 block">Fíjate en este detalle con zoom:</strong>
                <p className="text-xs text-roman-text leading-relaxed">{currentScene.whatToLookFor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: TUMBA IMPERIAL & SECRETOS OCULTOS */}
      {activeTab === 'secretos' && (
        <div className="space-y-5 animate-page">
          {/* La Tumba en el Pedestal */}
          <div className="p-5 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-roman-terracotta">
              <Shield className="w-5 h-5" />
              <h4 className="font-serif text-lg font-bold text-roman-text">
                La Tumba Prohibida de Trajano y Plotina
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
              La ley sagrada de las Doce Tablas de Roma prohibía de forma tajante enterrar o incinerar a cualquier ser humano dentro del <em>pomerium</em> (el límite sagrado de la ciudad). Sin embargo, el Senado otorgó a Trajano una excepción única en la historia del Imperio:
            </p>
            <div className="p-3.5 rounded-xl bg-roman-elevated border border-roman-border space-y-1.5 text-xs text-roman-muted">
              <p>
                • <strong>Las Urnas de Oro:</strong> En el interior de la base cuadrangular de la columna se excavó una cámara sepulcral abovedada. Allí se depositaron dos urnas de oro macizo con las cenizas de Trajano (fallecido en Cilicia en el 117 d.C.) y de su venerada esposa, la emperatriz Plotina.
              </p>
              <p>
                • <strong>El Saqueo Visigodo:</strong> Durante el Saqueo de Roma del 410 d.C. por las huestes de Alarico, los bárbaros violentaron la puerta de bronce del pedestal y robaron las dos urnas de oro por su valor material, esparciendo las cenizas imperiales al viento.
              </p>
            </div>
          </div>

          {/* El Cambio de Estatua de 1587 */}
          <div className="p-5 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h4 className="font-serif text-lg font-bold text-roman-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              De Trajano a San Pedro: La Cristiana Transformación de 1587
            </h4>
            <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
              En lo alto de la columna, a 38 metros, no estuvo siempre San Pedro:
            </p>
            <ul className="space-y-2 text-xs text-roman-muted list-disc pl-4">
              <li>
                Originalmente coronaba la cúspide una estatua colosal de bronce dorado del <strong>Emperador Trajano</strong> con coraza militar, sosteniendo una lanza y una esfera de oro.
              </li>
              <li>
                Durante la Edad Media la estatua de Trajano desapareció (probablemente fundida para acuñar moneda o fabricar cañones durante los asedios).
              </li>
              <li>
                En 1587, el enérgico <strong>Papa Sixto V</strong> «bautizó» los monumentos paganos de Roma: colocó la estatua de bronce de <strong>San Pedro sosteniendo las llaves del cielo</strong> en la Columna de Trajano, y la de San Pablo en la cercana Columna de Marco Aurelio.
              </li>
            </ul>
          </div>

          {/* Reproductor de Audioguía Natural Integrada */}
          <NaturalAudioGuidePlayer
            title="La Columna de Trajano y sus Secretos"
            script="La Columna de Trajano es una de las obras cumbres del arte universal. Diseñada en el año ciento trece por Apolodoro de Damasco, mide treinta y ocho coma cuatro metros, la altura exacta de la montaña que se rebajó para construir el Foro. Sus veintinueve bloques de mármol de Carrara pesan hasta treinta y dos toneladas cada uno. Su friso en espiral de doscientos metros narra como un rollo de película las guerras de Dacia con dos mil seiscientas figuras humanas. En su base descansaron las urnas de oro con las cenizas de Trajano y Plotina. Mirad hacia la cima: la estatua actual no es el emperador, sino San Pedro con las llaves, colocado por el Papa Sixto Quinto en mil quinientos ochenta y siete."
            durationApprox="18 min"
          />
        </div>
      )}

      {/* PESTAÑA 4: MIRADORES IN SITU Y CÓMO FOTOGRAFIARLA */}
      {activeTab === 'visita' && (
        <div className="space-y-5 animate-page">
          <div className="p-4 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h4 className="font-serif text-base font-bold text-roman-text flex items-center gap-2">
              <Camera className="w-5 h-5 text-roman-terracotta" />
              Los 3 Mejores Puntos de Observación y Fotografía
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-1">
                <span className="font-bold text-roman-terracotta block">1. Pasarela de Via dei Fori Imperiali (a 25 m)</span>
                <p className="text-roman-muted">
                  A ras de suelo. Es el lugar perfecto para leer con el zoom del móvil las 4 primeras vueltas del friso (Danubius y los campamentos) y fotografiar el pedestal con las armas dacias.
                </p>
              </div>

              <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-1">
                <span className="font-bold text-roman-terracotta block">2. Escalinata de Santa Maria di Loreto</span>
                <p className="text-roman-muted">
                  Subiendo los escalones de piedra de la iglesia gemela: la perspectiva elevada permite mirar el tercio medio de la columna sin inclinación de cuello.
                </p>
              </div>

              <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-1">
                <span className="font-bold text-roman-terracotta block">3. Terrazas del Vittoriano (Altar de la Patria)</span>
                <p className="text-roman-muted">
                  A 120 metros de distancia: ofrece una visión cenital incomparable de la columna erigiéndose entre los restos de la Basílica Ulpia con las cúpulas barrocas de fondo.
                </p>
              </div>
            </div>
          </div>

          {/* Botón de Cómo llegar a pie */}
          <div className="p-4 rounded-2xl bg-roman-surface border border-roman-border shadow-soft space-y-3">
            <h4 className="font-serif text-base font-bold text-roman-text flex items-center gap-2">
              <Navigation className="w-5 h-5 text-roman-terracotta" />
              Localización GPS en el Foro de Trajano
            </h4>
            <p className="text-xs text-roman-muted">
              Está en Piazza Venezia / Via dei Fori Imperiali, a 5 minutos a pie de la parada de comida en Vecchia Roma.
            </p>
            <a
              href={getGoogleMapsWalkingUrl(columnCoords, 'Columna de Trajano, Roma', userCoords)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-roman-terracotta text-white rounded-xl font-bold text-sm shadow hover:bg-roman-terracotta/90 transition-all active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              Cómo llegar a la Columna de Trajano a pie (GPS)
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
