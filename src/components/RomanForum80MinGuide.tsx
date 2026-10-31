/**
 * Guía Monográfica e Infográfica: El Foro Romano en 80 Minutos
 * 
 * Itinerario interior optimizado paso a paso sin retrocesos:
 * Tiempo total calculado: 80 minutos exactos.
 * 
 * 8 Paradas maestras con infografías interactivas:
 * 1. Arco de Tito (10 min · Menorá, apoteosis y modelo de París)
 * 2. Basílica de Majencio y Constantino (12 min · Bóvedas de 35m y coloso)
 * 3. Templo de Rómulo (6 min · Puertas de bronce y cerradura intacta de 1700 años)
 * 4. Casa de las Vestales y Atrium Vestae (15 min · Fuego eterno, estanques y estatuas)
 * 5. Templo de Antonino y Faustina (8 min · Marcas de cuerdas de bueyes y fachada de 141 d.C.)
 * 6. Templo de Julio César y Altar Funerario (8 min · Incineración de César y ofrendas vivas)
 * 7. Curia Julia - Senado Romano (12 min · Opus sectile original, acústica y poder senatorial)
 * 8. Arco de Septimio Severo y Rostra (9 min · Damnatio memoriae y tribuna de Cicerón)
 * 
 * Incluye:
 * - Calculadora / selector de progreso con minutaje acumulado.
 * - Consejos de supervivencia: fuentes de agua potable (nasoni), aseos y bancos.
 * - Reproductor de audioguía integrado con voz natural para cada monumento.
 */

import React, { useState } from 'react';
import {
  Clock,
  Compass,
  CheckCircle2,
  Circle,
  Eye,
  Sparkles,
  Droplets,
  HelpCircle,
  Camera,
  MapPin,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  X,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { NaturalAudioGuidePlayer } from './NaturalAudioGuidePlayer';
import { MonumentImage } from './MonumentImage';

interface ForumStop {
  id: string;
  order: number;
  timeStartMin: number;
  timeEndMin: number;
  durationMin: number;
  title: string;
  latinName: string;
  year: string;
  builder: string;
  icon: string;
  highlight: string;
  dimensions: string;
  materials: string;
  reconstructionVsReality: string;
  secretDetail: string;
  photoTip: string;
  audioScript: string;
  imageUrl: string;
  fallbackImageUrl: string;
  imageAlt: string;
  imageCaption: string;
  locationTipInForum: string;
}

const FORUM_STOPS: ForumStop[] = [
  {
    id: 'tito',
    order: 1,
    timeStartMin: 0,
    timeEndMin: 10,
    durationMin: 10,
    title: 'Arco de Tito',
    latinName: 'Arcus Titi',
    year: '81 d.C.',
    builder: 'Emperador Domiciano (en honor a Tito)',
    icon: '🏛️',
    highlight: 'El triunfo de Judea: la Menorá dorada y la apoteosis imperial sobre el águila.',
    dimensions: '15,4 m de alto × 13,5 m de ancho',
    materials: 'Mármol pentélico blanco traído directamente de las canteras de Grecia',
    reconstructionVsReality: 'Fue el primer arco de triunfo de un solo vano de Roma. En la Edad Media quedó empotrado como torre fortificada de la familia Frangipane; en 1821 el arquitecto Giuseppe Valadier lo restauró con travertino para diferenciar las partes originales de mármol de los añadidos modernos.',
    secretDetail: 'Mirad el techo interior bajo la bóveda de casetones: esculpe el momento exacto en que Tito asciende al Olimpo a lomos del águila de Júpiter para convertirse en dios. Además, este arco fue el modelo exacto en el que se inspiró Napoleón en 1806 para construir el Arco de Triunfo de París.',
    photoTip: 'Colocaos bajo el intradós del arco mirando hacia arriba para captar con gran angular el relieve del candelabro de 7 brazos (Menorá) recortado contra la bóveda de casetones.',
    audioScript: 'Bienvenidos a la primera estación de nuestro recorrido por el Foro Romano. Estáis bajo el Arco de Tito, erigido en el año ochenta y uno después de Cristo en la cima de la colina Velia. Alzar la vista al interior del arco: en el relieve sur veréis a los soldados romanos desfilando con el colosal candelabro de siete brazos de oro puro, la Menorá, arrancada del Templo de Jerusalén tras su asedio. Con ese inmenso botín de oro se financió precisamente la construcción del Coliseo que acabamos de visitar.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Arch_Titus%2C_Forum_Romanum%2C_Rome%2C_Italy.jpg/960px-Arch_Titus%2C_Forum_Romanum%2C_Rome%2C_Italy.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Arco de Tito en la cumbre de la Vía Sacra',
    imageCaption: 'Vista del Arco de Tito (81 d.C.) en la cumbre de la colina Velia mirando hacia el Foro',
    locationTipInForum: 'En la cumbre de la colina Velia, justo al acceder al recinto arqueológico desde el Coliseo mirando al oeste hacia la Vía Sacra.'
  },
  {
    id: 'majencio',
    order: 2,
    timeStartMin: 10,
    timeEndMin: 22,
    durationMin: 12,
    title: 'Basílica de Majencio y Constantino',
    latinName: 'Basilica Maxentii et Constantini',
    year: '308 – 312 d.C.',
    builder: 'Comenzada por Majencio, terminada por Constantino',
    icon: '⚡',
    highlight: 'Las 3 bóvedas de 35 metros que inspiraron la cúpula de San Pedro del Vaticano.',
    dimensions: '100 m de largo × 65 m de ancho · Bóvedas a 35 m de altura',
    materials: 'Hormigón romano (opus caementicium), ladrillo y casetones octogonales aligerados',
    reconstructionVsReality: 'Lo que hoy contemplamos es solo un tercio del edificio original (la nave lateral norte). Su nave central tenía bóvedas de crucería gigantescas sostenidas por ocho columnas de mármol de 14 metros de altura (una de ellas fue trasladada en 1614 a la plaza de Santa Maria Maggiore, donde sigue en pie).',
    secretDetail: 'En el ábside occidental se alzaba el Coloso de Constantino, una estatua de 12 metros de altura hecha en mármol y bronce dorado. Hoy su cabeza de 2,5 metros y su mano derecha apuntando al cielo se pueden ver en los Museos Capitolinos.',
    photoTip: 'Poneos en el centro de la Vía Sacra justo enfrente de los 3 arcos gigantes: disparad en vertical para que una persona en primer plano sirva de escala humana ante la inmensidad de las bóvedas.',
    audioScript: 'Avanzando por la Vía Sacra nos encontramos ante la estructura techada más colosal de toda la Antigüedad: la Basílica de Majencio y Constantino. Fijaos en los enormes casetones octogonales tallados en el hormigón de las bóvedas: los ingenieros romanos los vaciaban por dentro para aligerar toneladas de peso sin restar solidez a la estructura. Mil doscientos años después, Donato Bramante y Miguel Ángel se plantaron aquí mismo para estudiar estas tres bóvedas y proyectar la Basílica de San Pedro del Vaticano.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Largest_Arches_02.jpg/960px-Largest_Arches_02.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Bóvedas de la Basílica de Majencio y Constantino',
    imageCaption: 'Las 3 bóvedas de hormigón de 35 m de altura conservadas de la nave norte',
    locationTipInForum: 'En la ladera norte (a tu derecha según bajas la Vía Sacra). Sus 3 arcos colosales son la estructura más alta y voluminosa de todo el recinto.'
  },
  {
    id: 'romulo',
    order: 3,
    timeStartMin: 22,
    timeEndMin: 28,
    durationMin: 6,
    title: 'Templo de Rómulo',
    latinName: 'Templum Divi Romuli',
    year: '307 d.C.',
    builder: 'Emperador Majencio (dedicado a su hijo Valerio Rómulo)',
    icon: '🗝️',
    highlight: 'Puertas de bronce originales y cerradura romana que aún funciona tras 1.700 años.',
    dimensions: 'Planta circular de 15 m de diámetro con fachada cóncava',
    materials: 'Ladrillo romano, pórfido rojo imperial y hojas de bronce macizo',
    reconstructionVsReality: 'El templo conserva su cúpula original intacta y su fachada semicircular flanqueada por dos columnas de pórfido rojo egipcio traídas desde el Nilo.',
    secretDetail: 'Fijaos bien en las dos hojas de la puerta de bronce verde: son las originales fundidas en el año 307 d.C. Su cerradura de hierro romana con pestillo horizontal sigue operativa y puede cerrarse con su llave antigua tras diecisiete siglos.',
    photoTip: 'Acercaos a la puerta de bronce para fotografiar el detalle de la cerradura romana y el contraste del bronce milenario con las columnas de pórfido.',
    audioScript: 'Deteneos unos instantes frente a este misterioso edificio circular de ladrillo. Es el Templo de Rómulo, mandado construir por el emperador Majencio para divinizar a su hijo pequeño, fallecido a muy corta edad. Pero lo más prodigioso de este rincón es su puerta: esas dos hojas de bronce verde son las originales del año trescientos siete. Tienen más de mil setecientos años y conservan su cerradura romana original, que aún funciona a la perfección.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/RomaForoRomanoTempioDivoRomolo.JPG/960px-RomaForoRomanoTempioDivoRomolo.JPG',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Fachada circular del Templo de Rómulo con puertas de bronce',
    imageCaption: 'Rotonda de ladrillo del 307 d.C. con las puertas de bronce originales y columnas de pórfido',
    locationTipInForum: 'Edificio circular de ladrillo a tu derecha tras pasar Majencio. Busca sus dos columnas de pórfido rojizo y su gran puerta verde de bronce.'
  },
  {
    id: 'vestales',
    order: 4,
    timeStartMin: 28,
    timeEndMin: 43,
    durationMin: 15,
    title: 'Casa de las Vestales y Atrio de Vesta',
    latinName: 'Atrium Vestae & Aedes Vestae',
    year: 'Siglo II d.C.',
    builder: 'Reconstruido por Julia Domna y Septimio Severo tras el fuego del 191 d.C.',
    icon: '🔥',
    highlight: 'El claustro del fuego sagrado, las 6 sacerdotisas vírgenes y los privilegios únicos.',
    dimensions: 'Patio rectangular de 70 × 20 metros rodeado por un palacio de 50 estancias en 2 plantas',
    materials: 'Mármol travertino, estuco y estanques con nenúfares y fuentes',
    reconstructionVsReality: 'Era una auténtica mansión de lujo autosuficiente: calefacción por hipocausto bajo el suelo, cocinas, molinos y baños privados. En el centro del patio lucían tres estanques de agua cristalina donde se refrescaba el ambiente.',
    secretDetail: 'Observad las estatuas de mármol de las Vestales Máximas que rodean el jardín: en uno de los pedestales (fechado en el 364 d.C.) el nombre de la vestal fue borrado deliberadamente a golpes de cincel. La leyenda cuenta que se convirtió secretamente a la nueva fe cristiana.',
    photoTip: 'El mejor encuadre es desde el extremo este del patio: alinead la hilera de estatuas de mármol con el templo circular de Vesta y los olivos centenarios.',
    audioScript: 'Entramos ahora en uno de los lugares más sagrados y misteriosos de la civilización romana: la Casa de las Vestales. Aquí vivían las seis únicas sacerdotisas de Roma, elegidas entre niñas de familias nobles cuando tenían entre seis y diez años. Durante treinta años estaban obligadas a mantener encendido el fuego sagrado del Estado romano, que jamás podía extinguirse. A cambio, gozaban de privilegios inauditos para una mujer de su época: administraban sus propias fortunas y tenían el poder de perdonar la vida a cualquier condenado a muerte con solo cruzarse en su camino.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/House_of_the_Vestal_Virgins%2C_Roman_Forum._Viewed_from_the_Palatine_Hill._Rome._-_Flickr_-_Andy_Montgomery.jpg/960px-House_of_the_Vestal_Virgins%2C_Roman_Forum._Viewed_from_the_Palatine_Hill._Rome._-_Flickr_-_Andy_Montgomery.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Patio ajardinado de la Casa de las Vestales',
    imageCaption: 'Atrium Vestae: patio claustral con estanques y estatuas de las sacerdotisas',
    locationTipInForum: 'A la izquierda (sur) de la Vía Sacra, a los pies de la colina del Palatino. Amplio patio ajardinado con tres estanques alargados y estatuas.'
  },
  {
    id: 'antonino',
    order: 5,
    timeStartMin: 43,
    timeEndMin: 51,
    durationMin: 8,
    title: 'Templo de Antonino y Faustina',
    latinName: 'Templum Antonini et Faustinae',
    year: '141 d.C.',
    builder: 'Emperador Antonino Pío a su esposa Faustina la Mayor',
    icon: '🏛️',
    highlight: '6 columnas de mármol cipollino de 17m y las marcas de cuerdas de bueyes medievales.',
    dimensions: 'Pronaos de 6 columnas frontales monolíticas de 17 metros de altura',
    materials: 'Mármol cipollino verde de Eubea (Grecia) con vetas onduladas que simulan capas de cebolla',
    reconstructionVsReality: 'El templo pagano se transformó en 1602 en la iglesia barroca de San Lorenzo in Miranda. La puerta de la iglesia se construyó a 6 metros de altura respecto al suelo romano original, porque durante siglos los sedimentos y la tierra enterraron el Foro hasta casi tapar las columnas.',
    secretDetail: 'Mirad atentamente la parte superior de los fustes de las columnas de mármol: veréis unas profundas incisiones oblicuas. Son los surcos dejados por las cuerdas con las que en la Edad Media intentaron derribar el templo con yuntas de bueyes para saquear el mármol, pero las columnas resistieron firmes.',
    photoTip: 'Haced la foto desde la esquina suroeste para capturar el contraste de las columnas paganas del siglo II con el frontón barroco de la iglesia construida en su interior.',
    audioScript: 'Mirad hacia arriba al Templo de Antonino y Faustina, uno de los edificios mejor conservados del Foro. Fijaos en las seis columnas monolíticas de mármol cipollino de diecisiete metros de altura. Si observáis la parte superior de las columnas, notaréis unas profundas hendiduras diagonales. En la Edad Media, cuando el Foro se usaba como pastizal de vacas, intentaron atar maromas con yuntas de bueyes para tirar las columnas y robar la piedra; pero la ingeniería romana era tan descomunal que las cuerdas se partieron sin mover un milímetro el templo.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Temple_of_Antoninus_and_Faustina_%28Roma%29.jpg/960px-Temple_of_Antoninus_and_Faustina_%28Roma%29.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Columnas monolíticas de mármol cipollino de Antonino y Faustina',
    imageCaption: 'Pronaos imperial del 141 d.C. con columnas de mármol cipollino verde de 17 m',
    locationTipInForum: 'Frente a las Vestales, en el lado norte de la Vía Sacra. Destaca por sus 6 altas columnas que custodian la iglesia barroca embutida en su interior.'
  },
  {
    id: 'cesar',
    order: 6,
    timeStartMin: 51,
    timeEndMin: 59,
    durationMin: 8,
    title: 'Templo y Altar Funerario de Julio César',
    latinName: 'Aedes Divi Iulii',
    year: '29 a.C.',
    builder: 'Octavio Augusto (dedicado a Julio César)',
    icon: '🌹',
    highlight: 'El túmulo exacto donde fue quemado el cuerpo de César: flores frescas cada mañana.',
    dimensions: 'Plataforma elevada con tribuna de oradores y nicho semicircular del altar',
    materials: 'Núcleo de tufo y hormigón romano recubierto originalmente de mármol blanco de Carrara',
    reconstructionVsReality: 'Fue el primer templo de la historia dedicado a un mortal divinizado en Roma. Su frontón lucía una estrella de bronce que simbolizaba el cometa visible durante siete días tras el asesinato de César.',
    secretDetail: 'El túmulo circular bajo el techado de chapa marca el punto exacto donde el pueblo romano quemó espontáneamente el cadáver de César el 15 de marzo del 44 a.C. tras el discurso de Marco Antonio. A día de hoy, turistas y romanos siguen depositando monedas, poemas y flores frescas cada mañana.',
    photoTip: 'Haced una foto cercana del altar con las flores frescas recién puestas, con los restos de las columnas corintias del templo de fondo.',
    audioScript: 'Estamos ante uno de los lugares más cargados de emoción de la historia universal: el Altar de Julio César. Tras ser asesinado con veintitrés puñaladas en el Teatro de Pompeyo en los Idus de Marzo del año cuarenta y cuatro antes de Cristo, su cuerpo fue traído aquí. Marco Antonio agitó la toga ensangrentada del dictador ante el pueblo enardecido, que improvisó una pira funeraria quemando bancos y maderas para incinerar sus restos. Observad el túmulo de piedra: dos mil sesenta años después, la gente de todo el mundo sigue dejando flores frescas cada día en su memoria.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Temple_of_Caesar_3D.jpg/960px-Temple_of_Caesar_3D.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Restos del Templo y Altar de Julio César',
    imageCaption: 'El túmulo funerario donde fue incinerado Julio César tras los Idus de Marzo del 44 a.C.',
    locationTipInForum: 'En la cabecera este de la explanada del Foro. Es una estructura de piedra semicircular bajo un techo protector donde siempre verás ofrendas florales.'
  },
  {
    id: 'curia',
    order: 7,
    timeStartMin: 59,
    timeEndMin: 71,
    durationMin: 12,
    title: 'La Curia Julia (Senado de Roma)',
    latinName: 'Curia Iulia',
    year: '44 a.C. – 283 d.C.',
    builder: 'Comenzada por Julio César, restaurada por Diocleciano',
    icon: '🏛️',
    highlight: 'La sala de poder del mundo romano: suelo de mármol original intacto y acústica perfecta.',
    dimensions: 'Sala diáfana de 25,2 m de largo × 17,8 m de ancho y 21,6 m de altura interior',
    materials: 'Ladrillo romano recubierto de estuco imitando mármol; suelo de pórfido rojo y serpentina verde',
    reconstructionVsReality: 'Se conserva íntegra porque en el año 638 el Papa Honorio I la convirtió en la iglesia de Sant\'Adriano al Foro. En 1937 se retiraron los añadidos barrocos para revelar la sala senatorial del siglo III.',
    secretDetail: 'El pavimento de la sala es el original de mármol policromado (opus sectile) pisado por los senadores romanos. Las puertas exteriores de bronce son copias exactas del siglo XVII: las originales de la época imperial fueron trasladadas y colocadas en la Basílica de San Juan de Letrán.',
    photoTip: 'Si está abierta (habitualmente fines de semana), asomaos al umbral para capturar el diseño geométrico del suelo de pórfido y la inmensa altura de 21 metros de sus muros sin columnas.',
    audioScript: 'Llegamos al centro neurálgico del poder del Imperio: la Curia Julia, sede del Senado Romano. En esta sala de veintiún metros de altura se sentaban trescientos senadores para decidir el destino de millones de súbditos, desde Hispania hasta Mesopotamia. Su acústica es tan asombrosa que la voz de un orador se escucha con total claridad en el rincón más alejado sin necesidad de amplificación. Mirad el suelo de mármol con dibujos geométricos de pórfido rojo egipcio y serpentina verde: es el pavimento imperial original del siglo tercero.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Curia_Iulia_front.jpg/960px-Curia_Iulia_front.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Fachada monumental de ladrillo de la Curia Julia',
    imageCaption: 'La Curia Julia (Senado de Roma): edificio intacto de 21,6 m de altura',
    locationTipInForum: 'Gran edificio cúbico de ladrillo marrón claro de 21 m de altura con frontón triangular, situado en la esquina noroeste junto al Arco de Severo.'
  },
  {
    id: 'rostra',
    order: 8,
    timeStartMin: 71,
    timeEndMin: 80,
    durationMin: 9,
    title: 'Arco de Septimio Severo y la Rostra',
    latinName: 'Arcus Septimii Severi & Rostra Augusti',
    year: '203 d.C.',
    builder: 'Emperador Septimio Severo y sus hijos Caracalla y Geta',
    icon: '📜',
    highlight: 'El crimen dinástico de Caracalla (nombre borrado) y la tribuna donde arengó Cicerón.',
    dimensions: '23 m de altura × 25 m de ancho · Triple arcada de mármol blanco proconesio',
    materials: 'Mármol proconesio con relieves de las campañas militares en Partia (actual Irak e Irán)',
    reconstructionVsReality: 'En la parte superior del arco había una cuádriga de bronce con Septimio Severo y sus hijos. Junto a él se alza la tribuna de la Rostra, decorada con los espolones metálicos de los barcos enemigos capturados en batalla.',
    secretDetail: 'Fijaos en la cuarta línea de la inscripción dedicatoria del ático: Caracalla asesinó a su propio hermano Geta en el año 212 d.C. y ordenó borrar su nombre de todos los monumentos de Roma (damnatio memoriae). Si os fijáis bien, todavía se aprecian los orificios de los remaches de bronce donde estaban las letras del nombre de Geta antes de ser raspadas.',
    photoTip: 'Colocaos a los pies de la Rostra con el Arco de Septimio Severo iluminado lateralmente y el Templo de Saturno a vuestra izquierda para la toma clásica de despedida del Foro.',
    audioScript: 'Culminamos nuestros ochenta minutos en el extremo occidental del Foro, frente al Arco de Septimio Severo y la tribuna de oradores de la Rostra. Desde esta tribuna elevada Cicerón pronunció sus famosas Catilinarias y Marco Antonio encandiló al pueblo. Y en el arco de tres vanos de mármol blanco se oculta un drama sangriento: el emperador Caracalla mandó matar a su hermano Geta y ordenó borrar su nombre de la inscripción que tenéis ante vosotros. Mirad hacia la colina: subiendo unos pasos llegaréis a la plaza del Capitolio, broche de oro de nuestra visita.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Arch_of_Septimius_Severus_East.jpg/960px-Arch_of_Septimius_Severus_East.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=960&auto=format&fit=crop',
    imageAlt: 'Arco triunfal de Septimio Severo de tres vanos',
    imageCaption: 'Arco de Septimio Severo (203 d.C.) y restos de la Rostra a los pies del Capitolio',
    locationTipInForum: 'Al fondo oeste del Foro, al pie de la colina Capitolina. Majestuoso arco triunfal blanco de tres arcadas junto a la plataforma elevada de la Rostra.'
  }
];

interface RomanForum80MinGuideProps {
  onClose?: () => void;
  onGoToNextScheduleStop?: () => void;
}

export const RomanForum80MinGuide: React.FC<RomanForum80MinGuideProps> = ({
  onClose,
  onGoToNextScheduleStop
}) => {
  const [selectedStopId, setSelectedStopId] = useState<string>('tito');
  const [completedStops, setCompletedStops] = useState<Record<string, boolean>>({});
  const [expandedImage, setExpandedImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const currentStop = FORUM_STOPS.find((s) => s.id === selectedStopId) || FORUM_STOPS[0];

  const toggleComplete = (id: string) => {
    setCompletedStops((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedStops).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / FORUM_STOPS.length) * 100);

  return (
    <div className="animate-page space-y-6 pb-24 text-roman-text">
      {/* Cabecera Principal */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-roman-border pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-xs font-bold uppercase tracking-wider mb-1">
            🏛️ Itinerario Interior Cronometrado · 80 Minutos
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
            Guía del Foro Romano (80 min)
          </h2>
          <p className="text-xs text-roman-muted mt-0.5">
            Recorrido paso a paso sin pérdidas: desde el Arco de Tito hasta el Arco de Septimio Severo e infografías arqueológicas.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-roman-elevated text-roman-muted hover:text-roman-text hover:bg-roman-accent/10 transition-colors"
            title="Cerrar guía del Foro"
            aria-label="Cerrar guía del Foro"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tarjeta de Control de Tiempo y Progreso (80 Minutos) */}
      <div className="rounded-2xl bg-gradient-to-br from-[#2B2420] via-[#3D2F28] to-[#1F1916] text-white p-5 border border-roman-border shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Calculadora de Visita Interior
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                80 Minutos · 8 Estaciones Maestras
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-300 block">Completadas</span>
            <span className="font-mono text-amber-400 font-bold text-sm">
              {completedCount} de {FORUM_STOPS.length} paradas ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Consejos de Supervivencia y Fuentes de Agua Potable */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="bg-black/30 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
            <Droplets className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300 block">Agua Potable (Nasoni)</strong>
              <span className="text-[11px] text-stone-300">
                Hay fuentes gratuitas junto a la Casa de las Vestales y frente a la Basílica Julia.
              </span>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block">Aseos Públicos Limpios</strong>
              <span className="text-[11px] text-stone-300">
                Situados detrás de la Basílica Julia y en el acceso del Arco de Tito.
              </span>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
            <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 block">Ruta sin Retrocesos</strong>
              <span className="text-[11px] text-stone-300">
                Entrada directa desde el Coliseo y salida por la subida al Capitolio.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTOR HORIZONTAL DE LAS 8 PARADAS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-roman-text flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-roman-terracotta" />
            Línea de Tiempo del Recorrido (0 – 80 min)
          </h3>
          <span className="text-xs text-roman-muted">Toca una parada para ver su infografía</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FORUM_STOPS.map((stop) => {
            const isSelected = stop.id === selectedStopId;
            const isDone = !!completedStops[stop.id];

            return (
              <button
                key={stop.id}
                onClick={() => setSelectedStopId(stop.id)}
                className={`p-2 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] relative overflow-hidden group ${
                  isSelected
                    ? 'bg-roman-accent/15 border-roman-terracotta shadow-md scale-[1.02]'
                    : isDone
                    ? 'bg-roman-surface/70 border-emerald-600/40 opacity-85'
                    : 'bg-roman-surface border-roman-border hover:bg-roman-elevated'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-roman-elevated text-roman-terracotta">
                    Min {stop.timeStartMin}′–{stop.timeEndMin}′
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(stop.id);
                    }}
                    className="p-1 text-roman-muted hover:text-emerald-600 transition"
                    title={isDone ? 'Marcar como pendiente' : 'Marcar como visitada'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Circle className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Miniatura visual del monumento */}
                <div className="flex items-center gap-2 mt-auto">
                  <img
                    src={stop.imageUrl}
                    alt={stop.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-roman-border shrink-0 bg-stone-700"
                    onError={(e) => {
                      if (e.currentTarget.src !== stop.fallbackImageUrl) {
                        e.currentTarget.src = stop.fallbackImageUrl;
                      }
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-roman-terracotta' : 'text-roman-text'}`}>
                      {stop.order}. {stop.title}
                    </h4>
                    <span className="text-[10px] text-roman-muted block truncate">{stop.durationMin} min</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FICHA DETALLADA E INFOGRAFÍA DE LA PARADA SELECCIONADA */}
      <div className="bg-roman-surface border border-roman-border rounded-2xl p-5 shadow-sm space-y-5">
        {/* Encabezado de la parada */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-roman-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{currentStop.icon}</span>
              <div>
                <span className="text-xs font-mono text-roman-terracotta font-bold">
                  Parada #{currentStop.order} de 8 · Minuto {currentStop.timeStartMin} a {currentStop.timeEndMin} ({currentStop.durationMin} min)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-roman-text">
                  {currentStop.title}
                </h3>
                <p className="text-xs italic text-roman-muted">
                  {currentStop.latinName} · {currentStop.year} · {currentStop.builder}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleComplete(currentStop.id)}
            className={`touch-target px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              completedStops[currentStop.id]
                ? 'bg-emerald-500/10 border-emerald-600 text-emerald-700'
                : 'bg-roman-elevated border-roman-border text-roman-muted hover:text-roman-text'
            }`}
          >
            {completedStops[currentStop.id] ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Visitada ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Marcar Visitada</span>
              </>
            )}
          </button>
        </div>

        {/* FOTO DEL MONUMENTO + GUÍA DE LOCALIZACIÓN IN SITU */}
        <div className="rounded-2xl border border-roman-border overflow-hidden bg-roman-elevated shadow-sm">
          <div className="relative group max-h-72 overflow-hidden bg-stone-800">
            <MonumentImage
              src={currentStop.imageUrl}
              fallbackSrc={currentStop.fallbackImageUrl}
              alt={currentStop.imageAlt}
              icon={currentStop.icon}
              title={currentStop.title}
              caption={currentStop.imageCaption}
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() =>
                setExpandedImage({
                  url: currentStop.imageUrl,
                  title: currentStop.title,
                  caption: currentStop.imageCaption
                })
              }
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-xl backdrop-blur-sm transition flex items-center gap-1 text-xs font-semibold shadow-md"
              title="Ampliar imagen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ver ampliada</span>
            </button>
          </div>
          <div className="p-3.5 space-y-2">
            <p className="text-xs italic text-roman-muted">
              📷 {currentStop.imageCaption}
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-roman-terracotta shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                  Cómo localizarlo in situ en el Foro:
                </strong>
                <p className="text-xs text-roman-text leading-relaxed">
                  {currentStop.locationTipInForum}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Destacado clave */}
        <div className="bg-roman-accent/10 border-l-4 border-roman-terracotta p-3 rounded-r-xl">
          <p className="text-xs sm:text-sm font-semibold text-roman-text">
            {currentStop.highlight}
          </p>
        </div>

        {/* INFOGRAFÍA TÉCNICA Y ARQUEOLÓGICA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-roman-elevated border border-roman-border/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-roman-terracotta block">
              📐 Dimensiones & Escala Imperial
            </span>
            <p className="text-xs font-medium text-roman-text">{currentStop.dimensions}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-roman-elevated border border-roman-border/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">
              🧱 Materiales & Canteras
            </span>
            <p className="text-xs font-medium text-roman-text">{currentStop.materials}</p>
          </div>
        </div>

        {/* INFOGRAFÍA: Qué queda hoy vs Cómo era en el Imperio */}
        <div className="p-4 rounded-xl bg-roman-elevated/60 border border-roman-border space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-roman-muted flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-roman-terracotta" />
            Infografía de Reconstrucción Mental (Lo que ves vs Cómo era)
          </h4>
          <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
            {currentStop.reconstructionVsReality}
          </p>
        </div>

        {/* DETALLE SECRETO / "FÍJATE EN ESTO" */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Detalle Secreto: Fíjate in situ en esto
          </h4>
          <p className="text-xs sm:text-sm text-roman-text leading-relaxed">
            {currentStop.secretDetail}
          </p>
        </div>

        {/* FOTO TIP */}
        <div className="p-3.5 rounded-xl bg-roman-elevated border border-roman-border flex items-start gap-2.5">
          <Camera className="w-4 h-4 text-roman-terracotta shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-roman-terracotta block">Foto Tip in situ:</span>
            <p className="text-xs text-roman-muted leading-relaxed">{currentStop.photoTip}</p>
          </div>
        </div>

        {/* REPRODUCTOR DE AUDIOGUÍA DE VOZ NATURAL DEDICADO A ESTA PARADA */}
        <NaturalAudioGuidePlayer
          title={currentStop.title}
          script={currentStop.audioScript}
          durationApprox={`${currentStop.durationMin} min`}
        />

        {/* Navegación a la siguiente parada */}
        <div className="flex items-center justify-between pt-2 border-t border-roman-border">
          {currentStop.order > 1 ? (
            <button
              onClick={() => setSelectedStopId(FORUM_STOPS[currentStop.order - 2].id)}
              className="text-xs font-bold text-roman-muted hover:text-roman-text transition"
            >
              ← Parada {currentStop.order - 1}
            </button>
          ) : (
            <span />
          )}

          {currentStop.order < FORUM_STOPS.length ? (
            <button
              onClick={() => setSelectedStopId(FORUM_STOPS[currentStop.order].id)}
              className="touch-target px-4 py-2 rounded-xl bg-roman-terracotta text-white font-bold text-xs flex items-center gap-1 shadow-sm transition hover:bg-roman-terracottaHover"
            >
              <span>Siguiente: {FORUM_STOPS[currentStop.order].title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            onGoToNextScheduleStop && (
              <button
                onClick={onGoToNextScheduleStop}
                className="touch-target px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition hover:bg-emerald-700"
              >
                <span>¡Recorrido de 80 min completado! Siguiente parada del viaje</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )
          )}
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
            <div className="p-3 border-t border-stone-800 bg-stone-900/90 text-xs text-stone-300">
              {expandedImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

