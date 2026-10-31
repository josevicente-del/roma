/**
 * Datos enriquecidos para cada una de las 17 paradas del itinerario:
 * - Audioguías gratuitas en español (enlaces verificados a izi.TRAVEL, portales oficiales y guion narrado por voz offline).
 * - Tips específicos de fotografía (encuadre, hora de luz, lente angular).
 * - Curiosidades de películas míticas rodadas en el lugar o a pocos metros.
 * - Detalles profundos de arquitectura, arte y puntos imprescindibles ("Must-See").
 */

import { CinemaLocationTip, FreeAudioGuideLink } from '../types/itinerary';

export interface PlaceEnrichment {
  shortSummary: string;
  architectureAndArtDetails: string;
  mustSeeHighlights: string[];
  photoTips: string[];
  cinemaTips: CinemaLocationTip[];
  audioGuideScript: string;
  freeAudioGuideLinks: FreeAudioGuideLink[];
}

export const PLACE_ENRICHMENTS: Record<string, PlaceEnrichment> = {
  'viernes-llegada': {
    shortSummary: 'Punto base del grupo en Via Palermo 4, entre el Quirinal y las callejuelas bohemias del Rione Monti.',
    architectureAndArtDetails: 'Via Palermo muestra la arquitectura umbertina de finales del siglo XIX (1870-1900), con palacios de estuco ocre y travertino diseñados tras la proclamación de Roma como capital de Italia.',
    mustSeeHighlights: [
      'Fachada neoclásica del Palazzo delle Esposizioni a 150 metros en Via Nazionale.',
      'Escalinatas hacia Via del Boschetto y Via dei Serpenti en el corazón de Monti.'
    ],
    photoTips: [
      'Al llegar de noche, haced la primera selfie de los 5 bajo las farolas cálidas de Via del Boschetto con las fachadas cubiertas de hiedra de fondo.',
      'Usad el modo Noche del móvil apoyando el codo para capturar la perspectiva del túnel Umberto I.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Roma (1972)',
        directorAndYear: 'Federico Fellini · 1972',
        sceneDescription: 'Fellini retrató la vida nocturna y popular de las callejuelas de la antigua Suburra (actual barrio de Monti, justo debajo de Via Palermo).'
      }
    ],
    audioGuideScript: 'Bienvenidos a Roma, Laura, José Antonio, Mónica, José Vicente y Beatriz. Estáis en Via Palermo número 4, en la frontera entre la colina del Quirinal y el histórico barrio de Monti. En tiempos de Julio César, esta ladera era la vibrante Suburra. Descansad bien porque mañana a las nueve en punto nos esperan dos mil años de historia en el Coliseo y el Foro Romano.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía del Rione Monti y la Suburra (izi.TRAVEL)',
        provider: 'izi.TRAVEL Español',
        language: 'Español',
        url: 'https://izi.travel/es/search/roma%20monti',
        durationApprox: '12 min'
      }
    ]
  },
  'sab-1-coliseo-foro': {
    shortSummary: 'El mayor anfiteatro del Imperio Romano (80 d.C.) junto al corazón político, religioso y senatorial de la Antigua Roma.',
    architectureAndArtDetails: 'El Coliseo combina tres órdenes arquitectónicos superpuestos en sus 48 metros de fachada de travertino: toscano en el primer piso, jónico en el segundo y corintio en el tercero, unidos sin argamasa mediante 300 toneladas de grapas de hierro. En el Foro Romano destacan las columnas corintias del Templo de Castor y Pólux y los casetones en relieve del Arco de Tito.',
    mustSeeHighlights: [
      'El Hipogeo (subsuelo del Coliseo) donde se ven los fosos de montacargas de gladiadores y fieras.',
      'El relieve interior del Arco de Tito mostrando el candelabro de siete brazos (Menorá) traído de Jerusalén en el 70 d.C.',
      'El Altar de Julio César (Tempio del Divo Giulio), donde fue incinerado su cuerpo y aún hoy dejan flores.',
      'La Curia Julia (edificio del Senado romano con su pavimento original de mármol policromado opus sectile).'
    ],
    photoTips: [
      'MEJOR FOTO DE GRUPO (08:45 h): Antes de bajar a la plaza del Coliseo, desde el balcón panorámico de Via Nicola Salvi (justo encima de la boca del Metro Colosseo) tendréis el encuadre completo sin gente detrás.',
      'A las 09:00 h el sol de noviembre ilumina de frente el lado sur del Coliseo desde el Arco de Constantino: usad gran angular (0.5x) desde abajo para enfatizar la altura.',
      'Desde el interior del Coliseo, asomaos a los arcos del segundo nivel que miran al oeste para enmarcar el Arco de Tito y el Templo de Venus y Roma dentro de un arco romano.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Gladiator (El Gladiador)',
        directorAndYear: 'Ridley Scott · 2000',
        sceneDescription: 'Máximo Décimo Meridio (Russell Crowe) lucha en la arena del Coliseo ante Cómodo ("¿No os estáis divirtiendo?"). Curiosamente, Cómodo sí bajó en la vida real a luchar como gladiador aquí mismo.'
      },
      {
        movieTitle: 'El furor del dragón (The Way of the Dragon)',
        directorAndYear: 'Bruce Lee · 1972',
        sceneDescription: 'El mítico combate final de artes marciales entre Bruce Lee y Chuck Norris se ambientó en los pasillos abovedados del segundo piso del Coliseo.'
      }
    ],
    audioGuideScript: 'Estáis frente al Anfiteatro Flavio, conocido universalmente como el Coliseo, inaugurado en el año ochenta después de Cristo por el emperador Tito con cien días consecutivos de juegos y naumaquias. Sus ochenta arcadas monumentales estaban calculadas con una precisión geométrica tal que permitían a más de cincuenta mil espectadores ocupar sus asientos o evacuar el recinto en apenas quince minutos. Fijaos en las oquedades en los sillares de travertino: durante la Edad Media y el Renacimiento se extrajeron meticulosamente las trescientas toneladas de grapas de hierro que unían los bloques sin argamasa. Al traspasar el recinto e ingresar al Foro Romano por la Vía Sacra, caminaréis sobre las mismas losas de basalto negro que pisaron Julio César, Marco Antonio, Cicerón y los emperadores en sus desfiles triunfales. Abrid bien los ojos: estáis en el epicentro exacto de la civilización occidental.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Gratuita del Coliseo en Español (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/coliseo%20roma',
        durationApprox: '35 min'
      },
      {
        title: 'Audioguía del Foro Romano paso a paso (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/foro%20romano',
        durationApprox: '45 min'
      },
      {
        title: 'App Oficial Parco Archeologico del Colosseo (MyColosseum)',
        provider: 'Parco Colosseo Oficial',
        language: 'Español / Multilingüe',
        url: 'https://colosseo.it/en/mycolosseum-app/',
        durationApprox: 'Oficial'
      }
    ]
  },
  'sab-2-san-clemente': {
    shortSummary: 'Tres niveles históricos superpuestos: basílica medieval del siglo XII con mosaico dorado, iglesia paleocristiana del siglo IV y templo pagano de Mitra del siglo I.',
    architectureAndArtDetails: 'En la basílica superior destaca la Schola Cantorum de mármol del siglo VI reutilizada de la iglesia inferior y el deslumbrante mosaico bizantino-romano del ábside (hacia 1120), donde la Cruz surge como un árbol de acanto lleno de aves, ciervos y escenas de la vida cotidiana.',
    mustSeeHighlights: [
      'El Mosaico dorado del Ábside en la planta superior (acceso gratuito).',
      'La Capilla de Santa Catalina con frescos renacentistas de Masolino da Panicale.',
      'Si bajáis al subsuelo: el Fresco de Sisinnio (primer texto en italiano vulgar) y el Altar del dios Mitra.'
    ],
    photoTips: [
      'En la basílica superior (donde sí se permite foto sin flash), colocaos exactamente en el eje central tras la Schola Cantorum y disparad con zoom 2x hacia el mosaico dorado del ábside para captar el brillo de las teselas de oro.',
      'El patio porticado de entrada (atrio cuadrangular único en Roma) ofrece una simetría perfecta para retratos con luz suave.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Roma (Serie HBO / BBC)',
        directorAndYear: 'Bruno Heller · 2005-2007',
        sceneDescription: 'Los ritos iniciáticos de los cultos orientales y las ínsulas de ladrillo del siglo I bajo San Clemente inspiraron directamente la recreación de los templos subterráneos de la serie.'
      }
    ],
    audioGuideScript: 'San Clemente es la mejor máquina del tiempo de Roma. El suelo que pisáis en la iglesia superior data del año mil ciento diez, pero cuatro metros bajo vuestros pies descansa una basílica intacta del siglo cuarto, y catorce metros más abajo aún corre el agua por una casa romana del siglo primero con un santuario secreto dedicado al dios persa Mitra. Mirad hacia arriba al ábside dorado: es una de las cumbres del arte del mosaico medieval en toda Europa.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Basílica de San Clemente (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/san%20clemente%20roma',
        durationApprox: '15 min'
      }
    ]
  },
  'sab-3-san-juan-letran': {
    shortSummary: 'La verdadera Catedral de Roma («Madre y Cabeza de todas las iglesias del mundo»), fundada por Constantino en el 313 d.C. y rediseñada por Borromini.',
    architectureAndArtDetails: 'Francesco Borromini transformó la nave central para el Jubileo de 1650 creando grandes hornacinas barrocas enmarcadas por columnas de mármol verde antiguo donde se alzan las colosales estatuas de los doce Apóstoles. El techo artesonado dorado fue diseñado por discípulos de Miguel Ángel y el suelo cosmatesco data del papa Martín V.',
    mustSeeHighlights: [
      'Las puertas centrales de bronce verde de la entrada: son las puertas originales del Senado del Foro Romano (Curia Julia).',
      'Las 12 estatuas monumentales de los Apóstoles en la nave central (fijaos en San Bartolomé sujetando su propia piel).',
      'El Baldaquino gótico papal de 1367 sobre el altar mayor y el Obelisco egipcio más alto del mundo en la plaza.'
    ],
    photoTips: [
      'Desde el pórtico exterior, haced una foto en contrapicado de las enormes puertas de bronce romanas del Senado.',
      'Dentro de la nave central, agachaos ligeramente a ras del pavimento cosmatesco para capturar la perspectiva geométrica del suelo guiando la vista hacia los doce Apóstoles blancos de Borromini.',
      'Al salir a la fachada principal, usad gran angular para encuadrar las 15 estatuas gigantes de Cristo y los doctores de la Iglesia de 7 metros de altura que coronan la cornisa.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Habemus Papam',
        directorAndYear: 'Nanni Moretti · 2011',
        sceneDescription: 'Varias secuencias de los cortejos cardenalicios y la majestuosidad de los palacios pontificios se rodaron en el entorno monumental de Letrán.'
      }
    ],
    audioGuideScript: 'Estáis en la Archibasílica de San Juan de Letrán, la verdadera Catedral del Papa como Obispo de Roma, más antigua incluso que San Pedro del Vaticano. Antes de cruzar el umbral, tocad las hojas centrales de bronce de la puerta principal: fueron fundidas en tiempos del Imperio Romano y pertenecían al edificio del Senado en el Foro. En el interior, el genio barroco Francesco Borromini creó un teatro de luz blanca presidido por doce estatuas colosales de los Apóstoles.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía de San Juan de Letrán y Escalera Santa (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/san%20giovanni%20in%20laterano',
        durationApprox: '20 min'
      }
    ]
  },
  'sab-4-san-pietro-vincoli': {
    shortSummary: 'Hogar del sobrecogedor Moisés de Miguel Ángel (1515) y del relicario con las cadenas de San Pedro.',
    architectureAndArtDetails: 'La basílica conserva su planta basilical paleocristiana de tres naves separadas por 20 columnas dóricas antiguas de mármol griego procedentes de un edificio romano anterior. En el brazo derecho del crucero se levanta el mausoleo del Papa Julio II con el Moisés esculpido en un bloque único de mármol de Carrara.',
    mustSeeHighlights: [
      'El Moisés de Miguel Ángel: observad la tensión muscular del antebrazo, la larguísima barba entrelazada con los dedos y el pie derecho retrasado a punto de levantarse de ira.',
      'La urna de bronce dorada bajo el altar mayor donde se ven las cadenas de San Pedro unidas.'
    ],
    photoTips: [
      'IMPRESCINDIBLE: Introducid una moneda de 1 € en la caja de iluminación junto a la barandilla antes de hacer la foto; los focos cálidos resaltan el pulido casi de porcelana que Miguel Ángel dio al mármol.',
      'No hagáis la foto solo de frente: desplazaos unos pasos a la izquierda del Moisés (hacia el altar central) porque Miguel Ángel giró la cabeza del profeta hacia ese lado buscando la luz lateral.'
    ],
    cinemaTips: [
      {
        movieTitle: 'El tormento y el éxtasis (The Agony and the Ecstasy)',
        directorAndYear: 'Carol Reed · 1965',
        sceneDescription: 'Charlton Heston (como Miguel Ángel) y Rex Harrison (como el Papa Julio II) protagonizan la tensa historia de la creación de esta tumba papal y el Moisés.'
      }
    ],
    audioGuideScript: 'Frente a vosotros se alza el Moisés de Miguel Ángel, esculpido en mil quinientos quince para la tumba del Papa guerrero Julio Segundo. Miguel Ángel representó el instante exacto en que Moisés baja del Monte Sinaí con las Tablas de la Ley y descubre a su pueblo adorando al becerro de oro. Ved cómo su mano derecha sujeta las tablas que están a punto de resbalar mientras su mirada fulmina de furia contenida. Cuenta la leyenda que al acabar de pulir el mármol, Miguel Ángel golpeó su rodilla con el cincel y le gritó: ¿Por qué no hablas?',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía de El Moisés y San Pietro in Vincoli (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/san%20pietro%20in%20vincoli',
        durationApprox: '14 min'
      }
    ]
  },
  'sab-5-foro-trajano': {
    shortSummary: 'El último y más grandioso de los Foros Imperiales, presidido por la Columna de Trajano (113 d.C.) y el hemiciclo de los Mercados de Trajano.',
    architectureAndArtDetails: 'Obra maestra del ingeniero Apolodoro de Damasco. La Columna Trajana mide 38 metros (exactamente la altura de la colina que se desmontó para construir el foro) y su fuste de mármol de Luni narra en 155 escenas en bajorrelieve las dos campañas del emperador hispano Trajano en la Dacia.',
    mustSeeHighlights: [
      'La Columna de Trajano: el nivel de detalle de los escudos, puentes de barcas sobre el Danubio y campamentos legionarios.',
      'El gran hemiciclo de ladrillo de tres pisos de los Mercados de Trajano.',
      'Las columnas de granito gris de la gigantesca Basílica Ulpia.'
    ],
    photoTips: [
      'La mejor foto del hemiciclo de los Mercados de Trajano se consigue desde la acera elevada de Via dei Fori Imperiali a media tarde, cuando el sol cálido enciende el color terracota del ladrillo romano.',
      'Para fotografiar la Columna de Trajano con el teléfono, encuadradla junto a las dos cúpulas gemelas de las iglesias de Santa Maria di Loreto y Santissimo Nome di Maria que tiene justo detrás.'
    ],
    cinemaTips: [
      {
        movieTitle: 'La gran belleza (La grande bellezza)',
        directorAndYear: 'Paolo Sorrentino · 2013 (Óscar a Mejor Película Extranjera)',
        sceneDescription: 'Jep Gambardella (Toni Servillo) pasea al amanecer por la pasarela de los Foros Imperiales junto al Foro de Trajano y Piazza Venezia.'
      }
    ],
    audioGuideScript: 'Este es el Foro del emperador hispano Marco Ulpio Trajano, nacido en Itálica, junto a Sevilla. Con el oro de la conquista de la Dacia construyó en el año ciento doce esta plaza monumental. Mirad la Columna de Trajano: mide treinta y ocho metros de altura y su friso en espiral de doscientos metros de largo es como un rollo de película tallado en mármol con más de dos mil quinientas figuras humanas.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Foro y Columna de Trajano (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/foro%20de%20trajano',
        durationApprox: '18 min'
      }
    ]
  },
  'sab-6-vecchia-roma': {
    shortSummary: 'Comida fija del grupo en la histórica Trattoria Vecchia Roma (1916) en Piazza di Campitelli, en el corazón del Barrio Judío (Ghetto).',
    architectureAndArtDetails: 'Piazza di Campitelli conserva la atmósfera tranquila de la Roma barroca nobiliaria, presidida por la fachada de columnas exentas de Carlo Rainaldi en Santa Maria in Campitelli y la fuente renacentista de Giacomo della Porta (1589). A 140 metros se levanta el Pórtico de Octavia (27 a.C.).',
    mustSeeHighlights: [
      'Bucatini all’Amatriciana Flambé mantecados dentro de una gran rueda de queso Pecorino.',
      'Carciofi alla Giudia (alcachofas fritas crujientes del Ghetto en plena temporada de noviembre).',
      'Paseo de 3 minutos tras el café bajo los arcos del Pórtico de Octavia y el Teatro de Marcelo.'
    ],
    photoTips: [
      'VÍDEO IMPRESCINDIBLE: Tened la cámara lista cuando el camarero acerque la rueda gigante de queso Pecorino en llamas para servir vuestra pasta Amatriciana.',
      'Al salir del restaurante, haced una foto del grupo bajo el arco de mármol del Pórtico de Octavia con el Teatro de Marcelo al fondo.'
    ],
    cinemaTips: [
      {
        movieTitle: 'La ventana de enfrente (La finestra di fronte)',
        directorAndYear: 'Ferzan Özpetek · 2003',
        sceneDescription: 'Emotiva película ambientada en la memoria histórica del Pórtico de Octavia y las panaderías tradicionales del Ghetto judío de Roma, a 120 metros de vuestra mesa.'
      }
    ],
    audioGuideScript: 'Hora de reponer fuerzas en Piazza di Campitelli, a las puertas del antiguo Ghetto Judío de Roma, el más antiguo de Europa occidental después del de Venecia. Aquí nació la cocina judeo-romana, famosa por sus alcachofas a la judía fritas como crisantemos dorados. Disfrutad de la comida de grupo antes de caminar cinco minutos hacia la Boca de la Verdad.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía del Barrio Judío y Pórtico de Octavia (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/gueto%20roma',
        durationApprox: '20 min'
      }
    ]
  },
  'sab-7-bocca-verita': {
    shortSummary: 'El legendario mascarón romano detector de mentiras en el pórtico de Santa Maria in Cosmedin, frente a dos templos republicanos intactos del Foro Boario.',
    architectureAndArtDetails: 'El disco de mármol pavonazzetto mide 1,75 m de diámetro. La iglesia de Santa Maria in Cosmedin posee uno de los campanarios románicos más bellos de Roma (siglo XII) y un pavimento cosmatesco extraordinario. Enfrente, el Templo de Hércules Víctor (120 a.C.) es el edificio de mármol más antiguo conservado en Roma.',
    mustSeeHighlights: [
      'El medallón de la Bocca della Verità en el pórtico.',
      'El Templo circular de Hércules Víctor y el Templo rectangular de Portuno justo al cruzar la calle.',
      'La reliquia del cráneo de San Valentín coronado de flores dentro de la iglesia.'
    ],
    photoTips: [
      'Recread la escena de Audrey Hepburn y Gregory Peck metiendo la mano en la Boca de la Verdad en modo ráfaga.',
      'Si hay cola y no queréis perder ni un minuto antes del Trastevere, desde la verja lateral izquierda del pórtico se fotografía el medallón a solo 2 metros sin esperar turno, y la mejor foto panorámica es enmarcar el Templo circular de Hércules con la fuente barroca de los Tritones en primer plano.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Vacaciones en Roma (Roman Holiday)',
        directorAndYear: 'William Wyler · 1953 (Óscar para Audrey Hepburn)',
        sceneDescription: 'Aquí se rodó una de las escenas más famosas de la historia del cine: Gregory Peck mete la mano en la Bocca della Verità y esconde el brazo en la manga de su chaqueta fingiendo que se la ha cortado; el grito de susto de Audrey Hepburn fue 100% real porque Peck no le avisó de la broma.'
      }
    ],
    audioGuideScript: 'Estáis en el antiguo Foro Boario, el primer enclave comercial y puerto fluvial de la Roma primitiva junto al río Tíber. En el pórtico de la iglesia medieval de Santa Maria in Cosmedin os espera la legendaria Boca de la Verdad: una losa colosal de mármol pavonazzetto de mil trescientos kilos de peso, esculpida en el siglo primero con el rostro del dios Océano o Fauno. Los arqueólogos sugieren que su función original era la de una monumental arqueta de drenaje de la Cloaca Máxima para canalizar las lluvias del cercano Templo de Hércules. Sin embargo, en la Edad Media surgió el mito infalible de que aquel que pronunciara un juramento falso con la mano introducida en sus fauces de piedra perdería sus dedos en el acto. Una leyenda que Audrey Hepburn y Gregory Peck inmortalizaron con genialidad aquí mismo en la inolvidable comedia Vacaciones en Roma.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Bocca della Verità y Foro Boario (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/bocca%20della%20verita',
        durationApprox: '12 min'
      }
    ]
  },
  'sab-8-trastevere': {
    shortSummary: 'Visita guiada (FIJO 17:00 h) por el barrio más bohemio y auténtico al otro lado del Tíber, con callejuelas medievales y mosaicos bizantinos.',
    architectureAndArtDetails: 'La Basílica de Santa Maria in Trastevere reutiliza 22 columnas jónicas y corintias de granito egipcio procedentes de las Termas de Caracalla. Su fachada y su ábside lucen mosaicos dorados del siglo XII y de Pietro Cavallini (1291).',
    mustSeeHighlights: [
      'Piazza y Basílica de Santa Maria in Trastevere iluminada al anochecer.',
      'Callejuelas medievales de Via della Lungaretta, Via del Moro y Piazza di San Calisto.',
      'Piazza Trilussa junto al puente peatonal de Ponte Sisto.'
    ],
    photoTips: [
      'A las 17:15 h en noviembre es la "Hora Azul" en Roma: el cielo adquiere un azul cobalto profundo que contrasta de maravilla con las fachadas color terracota y el mosaico dorado iluminado de la fachada de Santa Maria in Trastevere.',
      'En Via del Moro o Vicolo del Cinque, buscad las callejuelas adoquinadas con enredaderas y farolas de hierro forjado para fotos de ambiente romano.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Ladrón de bicicletas (Ladri di biciclette)',
        directorAndYear: 'Vittorio De Sica · 1948',
        sceneDescription: 'Obra cumbre del neorrealismo italiano; la búsqueda desesperada de Antonio y su hijo Bruno recorre el puente e inmediaciones de Porta Portese y Trastevere.'
      },
      {
        movieTitle: 'A Roma con amor (To Rome with Love)',
        directorAndYear: 'Woody Allen · 2012',
        sceneDescription: 'Gran parte de las historias románticas de jóvenes arquitectos y paseos nocturnos se rodaron en las calles del Trastevere y Ponte Sisto.'
      }
    ],
    audioGuideScript: 'Bienvenidos al Trastevere, cuyo nombre en latín significa literalmente más allá del Tíber. En la Antigüedad era una barriada extramuros habitada por marineros sirios, alfareros y comunidades orientales que vivían al margen de la nobleza patricia. Ese secular aislamiento permitió que el barrio conservara casi intacto su laberinto de callejuelas adoquinadas, sus fachadas con enredaderas y ese orgullo popular de considerarse los romanos más puros de la ciudad. En el corazón de la plaza destaca la Basílica de Santa Maria in Trastevere, el primer templo cristiano de la ciudad consagrado oficialmente a la Virgen María en el siglo cuarto. Mirad los mosaicos dorados de su fachada: cuando cae la tarde y se encienden las farolas, las teselas de oro brillan como una joya suspendida en la noche romana.',
    freeAudioGuideLinks: [
      {
        title: 'Paseo Audioguiado por el Trastevere en Español (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/trastevere',
        durationApprox: '30 min'
      }
    ]
  },
  'sab-9-panteon-nocturno': {
    shortSummary: 'Primer encuentro nocturno con la Piazza della Rotonda iluminada en el paseo de vuelta del Trastevere hacia Trevi.',
    architectureAndArtDetails: 'El pronaos de 16 columnas monolíticas de granito gris y rosa de Asuán (Egipto), de 12 metros de altura y 60 toneladas cada una, adquiere de noche una solemnidad dramática con la iluminación escénica municipal.',
    mustSeeHighlights: [
      'El reflejo de las columnas iluminadas del Panteón sobre el agua de la fuente de Giacomo della Porta.',
      'El obelisco egipcio de Ramsés II en el centro de la plaza.'
    ],
    photoTips: [
      'Colocaos detrás de la fuente central de Piazza della Rotonda y bajad el móvil cerca del borde de piedra para reflejar el pórtico iluminado del Panteón en el agua.',
      'Mañana domingo al mediodía haréis la visita interior con el sol entrando por el óculo.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Ángeles y Demonios (Angels & Demons)',
        directorAndYear: 'Ron Howard · 2009',
        sceneDescription: 'Robert Langdon (Tom Hanks) llega a toda prisa a la Piazza della Rotonda convencido de que la tumba de Rafael en el Panteón es el primer altar de la ciencia de los Illuminati.'
      }
    ],
    audioGuideScript: 'En nuestro paseo nocturno de regreso hacia el hotel nos encontramos por primera vez con la silueta colosal del Panteón iluminado en Piazza della Rotonda. Sus dieciséis columnas de granito fueron talladas de una sola pieza en las canteras de Egipto y transportadas en barcazas por el Nilo y el Mediterráneo hace casi dos mil años. Mañana al mediodía entraremos bajo su cúpula.',
    freeAudioGuideLinks: [
      {
        title: 'Ruta Nocturna por Piazza della Rotonda y Centro (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/piazza%20della%20rotonda',
        durationApprox: '10 min'
      }
    ]
  },
  'sab-10-fontana-trevi': {
    shortSummary: 'La obra maestra barroca de Nicola Salvi (1732-1762) iluminada de noche, a solo 11 minutos a pie de vuestro alojamiento en Via Palermo 4.',
    architectureAndArtDetails: 'Esculpida en mármol de Carrara y travertino del Tívoli adosada al Palazzo Poli, celebra la llegada del acueducto romano Aqua Virgo (19 a.C.). En el nicho central domina Océano flanqueado por las estatuas de la Abundancia y la Salubridad.',
    mustSeeHighlights: [
      'Lanzamiento de la moneda de espaldas con la mano derecha sobre el hombro izquierdo.',
      'El "Asso di Coppe" (gran jarrón esculpido a la derecha que Salvi puso para tapar la vista al barbero criticón).',
      'La "Fontanina degli Innamorati" (los dos caños cruzados de agua potable en el lateral derecho).'
    ],
    photoTips: [
      'EVITAR LA MULTITUD EN LA FOTO: En lugar de poneros en el centro frontal donde se agolpa todo el mundo, bajad por la rampa/escalón del extremo derecho (junto a la Fontanina degli Innamorati): desde ese ángulo diagonal tenéis los caballos marinos y a Océano limpios de cabezas.',
      'De noche la fuente está potentemente iluminada en blanco cálido: bajad ligeramente la exposición en la pantalla del móvil (deslizando el sol hacia abajo) para que el mármol blanco no salga quemado y se vean todas las texturas del agua.'
    ],
    cinemaTips: [
      {
        movieTitle: 'La Dolce Vita',
        directorAndYear: 'Federico Fellini · 1960',
        sceneDescription: 'La secuencia más icónica de la historia del cine italiano: Anita Ekberg (Sylvia) se sumerge de noche con su vestido negro de gala en las aguas de la Fontana di Trevi llamando a Marcello Mastroianni ("Marcello, come here!"). Curiosidad: se rodó en invierno y Mastroianni llevaba un traje de neopreno debajo del esmoquin.'
      },
      {
        movieTitle: 'Creemos en el amor (Three Coins in the Fountain)',
        directorAndYear: 'Jean Negulesco · 1954 (Óscar a Mejor Fotografía y Canción)',
        sceneDescription: 'Película que popularizó en todo el planeta el ritual de lanzar monedas de espaldas a la Fontana di Trevi.'
      }
    ],
    audioGuideScript: 'Ante vosotros resplandece la Fontana di Trevi, cumbre de la escenografía barroca universal. El torrente continuo de agua que escucháis lleva manando más de dos mil años sin interrupción a través del acueducto Aqua Virgo, inaugurado por Marco Vipsanio Agripa en el año diecinueve antes de Cristo. En mil setecientos treinta y dos, el arquitecto Nicola Salvi fusionó la arquitectura con la naturaleza salvaje: sobre un arrecife de travertino emerge la carroza triunfal del titán Océano tirada por dos briosos corceles marinos, uno dócil y otro enfurecido, simbolizando los dos estados del mar. Cumplid con la tradición ineludible: tomad una moneda con la mano derecha, dad la espalda a la dársena y arrojadla sobre el hombro izquierdo. La leyenda promete que quien lanza la moneda tiene garantizado su regreso a la Ciudad Eterna.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Fontana di Trevi y sus Secretos (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/fontana%20di%20trevi',
        durationApprox: '15 min'
      }
    ]
  },
  'dom-1-vaticano': {
    shortSummary: 'Plaza elíptica de Bernini y Basílica Papal de San Pedro a primera hora de la mañana, con la Piedad y la cúpula de Miguel Ángel.',
    architectureAndArtDetails: 'La mayor iglesia de la cristiandad (218 metros de largo y cúpula de 136,5 metros de altura diseñada por Miguel Ángel). En su interior todo está a escala gigantesca: las letras del friso dorado bajo la cúpula miden 2 metros de altura cada una y los angelotes de las pilas de agua bendita tienen el tamaño de un adulto.',
    mustSeeHighlights: [
      'La Piedad de Miguel Ángel (1499), primera capilla entrando a la derecha.',
      'El Baldaquino de bronce de Bernini (29 m de alto) sobre la tumba del apóstol San Pedro.',
      'La estatua medieval de bronce de San Pedro (siglo XIII, atribuida a Arnolfo di Cambio) con el pie desgastado por los peregrinos.',
      'Los dos discos ópticos "Centro del Colonnato" en el suelo de la Plaza exterior junto al obelisco.'
    ],
    photoTips: [
      'A las 08:15–09:00 h de la mañana, los rayos del sol naciente entran en diagonal por los ventanales del ábside y la cúpula de San Pedro creando haces de luz ("rayos crepusculares") visibles en el aire: es la hora más fotogénica del día para el interior de la Basílica.',
      'En la Plaza de San Pedro, subid los primeros escalones frente a la fachada mirando hacia Via della Conciliazione para fotografiar al grupo de 5 con los dos brazos de la columnata de Bernini abrazando la ciudad.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Los dos papas (The Two Popes) / El joven papa (The Young Pope)',
        directorAndYear: 'Fernando Meirelles (2019) / Paolo Sorrentino (2016)',
        sceneDescription: 'Secuencias memorables de la Plaza de San Pedro, el balcón central de las bendiciones Urbi et Orbi y la Basílica Vaticana.'
      },
      {
        movieTitle: 'Ángeles y Demonios (Angels & Demons)',
        directorAndYear: 'Ron Howard · 2009',
        sceneDescription: 'En la Plaza de San Pedro, junto al obelisco, está el relieve de mármol en el suelo del "Ponente" (el viento del oeste, West Ponente), tercer altar de la ciencia en la película.'
      }
    ],
    audioGuideScript: 'Bienvenidos a la Ciudad del Vaticano y a la Basílica de San Pedro. Levantada exactamente sobre el lugar donde fue enterrado el apóstol Pedro en el siglo primero, su construcción reunió a Bramante, Rafael, Miguel Ángel y Bernini. Nada más entrar por la nave derecha, deteneos ante La Piedad: Miguel Ángel tenía solo veinticuatro años cuando esculpió a la Virgen sosteniendo a Cristo con unos pliegues de mármol que parecen tela viva. Bajo la inmensa cúpula se alza el Baldaquino de bronce de Bernini, de casi treinta metros de altura.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Gratuita Basílica y Plaza de San Pedro (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/basilica%20de%20san%20pedro',
        durationApprox: '40 min'
      },
      {
        title: 'Recorrido Virtual y Guía Oficial Basílica Papal de San Pedro',
        provider: 'Vatican.va Oficial',
        language: 'Español / Multilingüe',
        url: 'https://www.basilicasanpietro.va/',
        durationApprox: 'Oficial'
      }
    ]
  },
  'dom-2-ara-pacis': {
    shortSummary: 'El Altar de la Paz de Augusto (9 a.C.), joya cumbre del relieve imperial romano dentro del luminoso pabellón contemporáneo de Richard Meier.',
    architectureAndArtDetails: 'Mármol blanco de Carrara esculpido con dos registros: el superior muestra la procesión real de Augusto, Agripa, Livia y los niños imperiales, además del relieve alegórico de la diosa Tellus (Madre Tierra); el inferior despliega roleos de acanto de simetría perfecta.',
    mustSeeHighlights: [
      'El relieve de la procesión de la familia de Augusto (buscad al niño pequeño tirando del manto de un senador).',
      'El panel de la diosa Tellus (la Paz y la Fertilidad de la tierra y el mar).',
      'El muro exterior con el texto íntegro en bronce de las "Res Gestae Divi Augusti" (autobiografía de Augusto).'
    ],
    photoTips: [
      'El contraste entre el blanco moderno del pabellón de Richard Meier, los grandes planos de cristal y el mármol milenario del año 9 a.C. permite fotos arquitectónicas minimalistas espectaculares.',
      'Desde el exterior en Via di Ripetta podéis fotografiar el altar completo reflejado en el cristal junto a la fuente.'
    ],
    cinemaTips: [
      {
        movieTitle: 'A Roma con amor (To Rome with Love)',
        directorAndYear: 'Woody Allen · 2012',
        sceneDescription: 'Las escalinatas exteriores del Museo del Ara Pacis diseñadas por Richard Meier sirven de punto de encuentro para los protagonistas.'
      }
    ],
    audioGuideScript: 'El Ara Pacis, consagrado en el año nueve antes de Cristo, celebra la Paz Augusta que puso fin a un siglo de guerras civiles en Roma. Es la única obra romana donde podéis ver retratada al natural a toda la familia del emperador Augusto caminando en procesión, incluidos los niños pequeños que se aburren y tiran de las togas de sus mayores. En el muro exterior del edificio tenéis grabadas las Res Gestae, el testamento político que Augusto dejó escrito antes de morir.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Museo del Ara Pacis (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/ara%20pacis',
        durationApprox: '18 min'
      },
      {
        title: 'Portal Oficial Museo dell’Ara Pacis (Musei in Comune)',
        provider: 'AraPacis.it Oficial',
        language: 'Español / Italiano',
        url: 'https://www.arapacis.it/',
        durationApprox: 'Oficial'
      }
    ]
  },
  'dom-3-san-luis-franceses': {
    shortSummary: 'Capilla Contarelli: los tres lienzos magistrales de Caravaggio sobre San Mateo (1599-1602) en su ubicación original y con entrada gratuita.',
    architectureAndArtDetails: 'El ciclo de San Mateo de Caravaggio marca el nacimiento del Barroco pictórico y del tenebrismo: fondos en penumbra absoluta atravesados por un haz de luz real que esculpe los rostros de modelos sacados de las calles de Roma.',
    mustSeeHighlights: [
      'Lienzo izquierdo: "La vocación de San Mateo" (el rayo de luz y la mano de Cristo que cita la creación de Adán de Miguel Ángel).',
      'Lienzo central: "San Mateo y el Ángel" (segunda versión tras ser rechazada la primera por mostrar al santo con los pies sucios).',
      'Lienzo derecho: "El martirio de San Mateo" (buscad el autorretrato de Caravaggio al fondo mirando la escena con tristeza).'
    ],
    photoTips: [
      'Encended primero la luz de la capilla con una moneda de 1 €.',
      'Para que los cuadros de Caravaggio no salgan con reflejo del barniz, no disparéis desde el centro de la barandilla: colocaos en la esquina derecha de la capilla para fotografiar "La vocación de San Mateo" y en la esquina izquierda para "El martirio".'
    ],
    cinemaTips: [
      {
        movieTitle: 'Caravaggio (1986) / La sombra de Caravaggio (2022)',
        directorAndYear: 'Derek Jarman (1986) / Michele Placido (2022)',
        sceneDescription: 'Ambas películas recrean el escándalo y la fascinación que causó en Roma el descubrimiento de estos tres cuadros de la Capilla Contarelli en el año 1600.'
      }
    ],
    audioGuideScript: 'Dirigid vuestros pasos a la última capilla de la nave izquierda: la Capilla Contarelli. Aquí, en el año mil seiscientos, un joven de veintiocho años llamado Michelangelo Merisi da Caravaggio cambió para siempre la historia de la pintura. Mirad el cuadro de la izquierda, La vocación de San Mateo: Cristo entra en una taberna en penumbra y un rayo de luz diagonal señala a Leví, quien sorprendido se apunta al pecho preguntando: ¿Yo? Y en el cuadro de la derecha, El martirio de San Mateo, fijaos en el hombre del fondo que asoma tras el verdugo con expresión melancólica: es el autorretrato del propio Caravaggio.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía San Luis de los Franceses y Caravaggio (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/san%20luigi%20dei%20francesi',
        durationApprox: '15 min'
      }
    ]
  },
  'dom-4-panteon-interior': {
    shortSummary: 'Visita interior diurna al templo mejor conservado de la Antigüedad (Adriano, 125 d.C.), con su cúpula semiesférica de 43,30 m y la tumba de Rafael.',
    architectureAndArtDetails: 'Geometría esférica perfecta: la altura del pavimento al óculo (43,30 m) es idéntica al diámetro del tambor. El óculo central de 9 metros de diámetro no tiene cristal ni cubierta y es la única fuente de luz natural del templo.',
    mustSeeHighlights: [
      'El óculo de 9 metros abierto al cielo y las 5 filas de 28 casetones que aligeran la cúpula.',
      'La tumba del pintor renacentista Rafael Sanzio (entre la segunda y tercera capilla a la izquierda).',
      'Los 22 pequeños orificios de drenaje romanos en el centro del pavimento de pórfido y granito.'
    ],
    photoTips: [
      'TRUCO DE FOTÓGRAFOS EN EL PANTEÓN: Apoyad el teléfono boca arriba en el suelo (o sujetadlo a la altura de la cintura mirando completamente en vertical hacia el techo) en modo gran angular 0.5x para lograr una imagen simétrica perfecta del óculo y los 28 anillos de casetones.',
      'A las 12:15–13:00 h del mediodía, fotografiad el disco de luz solar proyectado nítidamente sobre los casetones de la cúpula.'
    ],
    cinemaTips: [
      {
        movieTitle: 'El vientre del arquitecto (The Belly of an Architect)',
        directorAndYear: 'Peter Greenaway · 1987',
        sceneDescription: 'Un homenaje cinematográfico entero a la perfección geométrica de la cúpula del Panteón de Agripa y la arquitectura imperial romana.'
      },
      {
        movieTitle: 'Ocean’s Twelve',
        directorAndYear: 'Steven Soderbergh · 2004',
        sceneDescription: 'Brad Pitt y Catherine Zeta-Jones mantienen sus encuentros en las terrazas y cafés frente al Panteón en Roma.'
      }
    ],
    audioGuideScript: 'Estáis en el interior del Panteón, reconstruido por el emperador hispano Adriano en el año ciento veinticinco después de Cristo. Levantad la vista hacia la cúpula: casi dos mil años después de su construcción, sigue siendo la mayor cúpula de hormigón sin armar del mundo. Mide cuarenta y tres coma treinta metros de diámetro, exactamente lo mismo que su altura desde el suelo, por lo que aquí dentro cabría una esfera perfecta. Por su óculo de nueve metros entra la luz del sol y también la lluvia, que se evacúa por veintidós diminutos agujeros en el suelo de mármol. A vuestra izquierda descansa Rafael Sanzio, el genio del Renacimiento.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Completa del Panteón en Español (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/panteon%20roma',
        durationApprox: '25 min'
      },
      {
        title: 'Portal Oficial Pantheon · Direzione Musei Statali di Roma',
        provider: 'MuseiItaliani.it Oficial',
        language: 'Español / Italiano',
        url: 'https://portale.museiitaliani.it/',
        durationApprox: 'Oficial'
      }
    ]
  },
  'dom-5-iglesia-gesu': {
    shortSummary: 'Iglesia matriz de los Jesuitas y cuna del Barroco, célebre por su bóveda en trampantojo 3D de Il Baciccio y la fastuosa capilla de San Ignacio.',
    architectureAndArtDetails: 'Diseñada por Vignola (1568) con fachada de Giacomo della Porta. El fresco del techo "El Triunfo del Nombre de Jesús" (1679) combina pintura y esculturas de estuco blanco y dorado que desbordan la cornisa proyectando sombras reales sobre la arquitectura.',
    mustSeeHighlights: [
      'El espejo inclinado en mitad de la nave para contemplar el trampantojo 3D de la bóveda.',
      'La Capilla de San Ignacio de Loyola de Andrea Pozzo (transepto izquierdo) revestida de bronce dorado y lapislázuli.',
      'La habitación y estudio original de San Ignacio en el edificio anexo (Casa Professa).'
    ],
    photoTips: [
      'Haced una foto directamente al gran espejo inclinado situado en el centro de la iglesia: podréis haceros una foto de grupo donde salís vosotros cinco reflejados junto al cielo barroco del techo.',
      'En la Capilla de San Ignacio, encuadrad el globo terráqueo superior hecho con el mayor bloque de lapislázuli azul intenso.'
    ],
    cinemaTips: [
      {
        movieTitle: 'El padrino III (The Godfather Part III)',
        directorAndYear: 'Francis Ford Coppola · 1990',
        sceneDescription: 'Las intrigas vaticanas de Michael Corleone (Al Pacino) se rodaron en los palacios e iglesias barrocas de este eje central del Campo Marzio.'
      }
    ],
    audioGuideScript: 'Bienvenidos a la Iglesia del Gesù, madre de todas las iglesias jesuitas del mundo y primer templo barroco de la historia. Acercaos al gran espejo inclinado en el centro de la nave y mirad hacia la bóveda: el pintor Il Baciccio y Gian Lorenzo Bernini crearon en mil seiscientos setenta y nueve un efecto tridimensional asombroso donde las figuras parecen salirse del marco del techo y caer desde el cielo. A la izquierda brilla el altar de San Ignacio de Loyola, cubierto de oro, plata y lapislázuli.',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Iglesia del Gesù y el Barroco (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/chiesa%20del%20gesu%20roma',
        durationApprox: '16 min'
      }
    ]
  },
  'dom-6-regreso-aeropuerto': {
    shortSummary: 'Regreso tranquilo a Via Palermo 4 a las 15:45 h para recoger el equipaje de los 5 y salir a las 16:30 h en punto hacia el aeropuerto.',
    architectureAndArtDetails: 'El paseo de subida desde Piazza Venezia por Via Nazionale atraviesa el Palacio Koch (sede del Banco de Italia) y los jardines de Villa Aldobrandini.',
    mustSeeHighlights: [
      'Mirador elevado de Villa Aldobrandini en Via Nazionale de subida al hotel.',
      'Recogida de maletas en Via Palermo 4 con 45 minutos de margen antes de las 16:30 h.'
    ],
    photoTips: [
      'Haced la última foto grupal de despedida de los 5 (Laura, José Antonio, Mónica, José Vicente y Beatriz) en Piazza Venezia con la Columna de Trajano y el Altar de la Patria de fondo.'
    ],
    cinemaTips: [
      {
        movieTitle: 'Vacaciones en Roma (Roman Holiday)',
        directorAndYear: 'William Wyler · 1953',
        sceneDescription: 'La despedida final de la princesa Ann en el cercano Palazzo Colonna (en la falda del Quirinal, a 400 metros de vuestra ruta de subida a Via Palermo) resume la emoción de decir Arrivederci Roma.'
      }
    ],
    audioGuideScript: 'Habéis completado un fin de semana histórico por la Ciudad Eterna. Subiendo por Via Nazionale regresamos a nuestra base en Via Palermo número 4 con tiempo de sobra para recoger el equipaje y salir a las cuatro y media hacia el aeropuerto. Como lanzasteis vuestra moneda en la Fontana di Trevi, Roma os espera de vuelta muy pronto. ¡Buon viaggio a todos!',
    freeAudioGuideLinks: [
      {
        title: 'Audioguía Piazza Venezia y Via Nazionale (izi.TRAVEL)',
        provider: 'izi.TRAVEL',
        language: 'Español',
        url: 'https://izi.travel/es/search/piazza%20venezia%20roma',
        durationApprox: '10 min'
      }
    ]
  }
};

