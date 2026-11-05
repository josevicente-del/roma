/**
 * Datos de "Roma Secreta & Trucos Ópticos":
 * Ilusiones de perspectiva forzada, trampantojos barrocos y rincones secretos
 * a pocos minutos a pie de los puntos clave del viaje.
 */

export interface SecretRomePlace {
  id: string;
  title: string;
  subtitle: string;
  category: 'perspectiva' | 'trampantojo' | 'secreto-historico';
  categoryLabel: string;
  icon: string;
  locationName: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distanceFromHotelKm: number;
  walkingMinutesFromHotel: number;
  nearbyItineraryPoint: string;
  illusion: string;
  reality: string;
  howToExperience: string;
  historicalSecret: string;
  practicalTip: string;
  imageUrl: string;
  fallbackImageUrl: string;
  imageAlt: string;
  imageCaption: string;
}

export const SECRET_ROME_PLACES: SecretRomePlace[] = [
  {
    id: 'borromini-spada',
    title: 'La Falsa Perspectiva de Borromini',
    subtitle: 'La galería de 40 metros que en realidad mide 8 metros y medio',
    category: 'perspectiva',
    categoryLabel: 'Perspectiva Forzada Barroca · 1653',
    icon: '🏛️',
    locationName: 'Palazzo Spada (Piazza Capo di Ferro)',
    address: 'Piazza Capo di Ferro 13, 00186 Roma',
    coordinates: { lat: 41.8939, lng: 12.4717 },
    distanceFromHotelKm: 2.1,
    walkingMinutesFromHotel: 25,
    nearbyItineraryPoint: 'A 5 min a pie de Campo de\' Fiori y del cruce hacia Trastevere (Sábado tarde)',
    illusion: 'Desde el arco de entrada parece una monumental columnata clásica de casi 40 metros de longitud que culmina en una imponente estatua romana a tamaño heroico (unos 2 metros de altura).',
    reality: 'La galería mide exactamente 8,58 metros. El suelo se eleva sutilmente hacia el fondo, el techo desciende, las columnas se van haciendo progresivamente más pequeñas y la escultura final del guerrero mide apenas 60 centímetros.',
    howToExperience: 'Poneos en el punto de observación frente a la reja: pedidle al guía o mirad a alguien avanzar por la galería; en cuanto una persona camina unos pasos parece convertirse en un gigante que toca el techo con la cabeza.',
    historicalSecret: 'Francesco Borromini contó con la ayuda del fraile y matemático agustino Giovanni Maria da Bitonto en 1653. El cardenal Bernardino Spada encargó esta obra para transmitir una metáfora moral barroca: las apariencias terrenales engañan los sentidos y agrandan lo insignificante.',
    practicalTip: 'El patio interior y la perspectiva se pueden contemplar adquiriendo la entrada de la Galería Spada o en horario de visitas guiadas. Es una de las sorpresas matemáticas más aplaudidas de toda Europa.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Forced_perspective_gallery_by_Francesco_Borromini.jpg/960px-Forced_perspective_gallery_by_Francesco_Borromini.jpg',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Forced_perspective_gallery_by_Francesco_Borromini.jpg',
    imageAlt: 'Galería de perspectiva forzada de Francesco Borromini en Palazzo Spada',
    imageCaption: 'Palazzo Spada: la galería de 8,58 m que parece una columnata de 40 m de largo'
  },
  {
    id: 'cupula-sant-ignazio',
    title: 'La Falsa Cúpula de San Ignacio de Loyola',
    subtitle: 'El prodigioso trampantojo en 3D sobre un techo absolutamente plano',
    category: 'trampantojo',
    categoryLabel: 'Trampantojo Tridimensional · 1685',
    icon: '✨',
    locationName: 'Chiesa di Sant\'Ignazio di Loyola',
    address: 'Via del Caravita 8a (Piazza Sant\'Ignazio), 00186 Roma',
    coordinates: { lat: 41.8992, lng: 12.4797 },
    distanceFromHotelKm: 1.5,
    walkingMinutesFromHotel: 18,
    nearbyItineraryPoint: 'A solo 300 metros del Panteón de Agripa y Via del Corso (Domingo mañana)',
    illusion: 'Al alzar la vista hacia el crucero de la iglesia contemplarás una colosal cúpula barroca con artesonado dorado, linterna cenital, ventanas luminosas y relieves de mármol que ascienden al cielo.',
    reality: '¡El techo es completamente plano! No hay cúpula alguna. Se trata de una pintura sobre lienzo de 17 metros de diámetro pintada por el hermano jesuita Andrea Pozzo con una geometría perspectiva infalible.',
    howToExperience: 'Buscad en el suelo de la nave central un disco de mármol amarillo. Pararos exactamente encima de ese punto y mirad hacia arriba: la cúpula se revela con una tridimensionalidad perfecta. Luego, dad 10 pasos hacia el altar: la perspectiva se quiebra cómicamente y veréis que el lienzo es plano.',
    historicalSecret: 'Cuando se construyó la iglesia en 1626, el dinero para levantar una cúpula real de piedra se agotó y los vecinos de los conventos colindantes protestaron porque les taparía la luz solar. Los jesuitas llamaron a Andrea Pozzo, quien resolvió el dilema con una obra maestra de la perspectiva anamórfica.',
    practicalTip: 'Entrada gratuita. Además de la cúpula, en la nave hay un gran espejo inclinado que permite sacarse un selfie inolvidable con el techo celeste pintado sin dejarse el cuello.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Sant%27Ignazio_-_painted_dome_-_antmoose.jpg',
    fallbackImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Interior_Sant%27Ignazio_01.JPG/960px-Interior_Sant%27Ignazio_01.JPG',
    imageAlt: 'Falsa cúpula pintada en trampantojo por Andrea Pozzo en San Ignacio',
    imageCaption: 'Sant\'Ignazio: lienzo de 17 m de Andrea Pozzo que simula una cúpula de mármol real'
  },
  {
    id: 'ojo-cerradura-malta',
    title: 'El Ojo de la Cerradura de los Caballeros de Malta',
    subtitle: 'La mágica alineación que une tres Estados soberanos en un solo ojo',
    category: 'secreto-historico',
    categoryLabel: 'Curiosidad Geopolítica & Visual · 1765',
    icon: '🗝️',
    locationName: 'Piazza dei Cavalieri di Malta (Colina del Aventino)',
    address: 'Piazza dei Cavalieri di Malta 3, 00153 Roma',
    coordinates: { lat: 41.8825, lng: 12.4785 },
    distanceFromHotelKm: 2.7,
    walkingMinutesFromHotel: 32,
    nearbyItineraryPoint: 'En la cumbre del Aventino, a 5 min del Giardino degli Aranci (Jardín de los Naranjos)',
    illusion: 'Al acercar el ojo al cerrojo de bronce verde del gran portón de madera, la cúpula de San Pedro del Vaticano aparece como una joya minúscula y nítida al final de una galería abovedada de laureles y cipreses perfectamente podados.',
    reality: 'La plaza y el portón fueron diseñados en 1765 por el grabador y arquitecto Giovanni Battista Piranesi con una alineación óptica calculada al milímetro.',
    howToExperience: 'Acercaos a la puerta de hierro verde y pegad el ojo a la cerradura central. Si lleváis móvil, colocad la lente de la cámara pegada a la mirilla para obtener una de las fotografías más icónicas del viaje.',
    historicalSecret: 'Mirando por esta cerradura estás viendo TRES Estados soberanos a la vez: 1) La Villa Magistral de la Orden de Malta (territorio extraterritorial con pasaporte propio), 2) La ciudad de Roma (Italia) y 3) La Basílica de San Pedro (Estado de la Ciudad del Vaticano).',
    practicalTip: 'El mejor momento para visitarlo es a última hora de la tarde, justo antes del anochecer, combinándolo con las vistas panorámicas del Giardino degli Aranci, donde el sol se pone sobre el Tíber.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/View_of_St_Peter_trough_the_holy_keyhole_%28cropped%29.jpg/960px-View_of_St_Peter_trough_the_holy_keyhole_%28cropped%29.jpg',
    fallbackImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/View_of_St_Peter_trough_the_holy_keyhole.jpg/960px-View_of_St_Peter_trough_the_holy_keyhole.jpg',
    imageAlt: 'Cúpula de San Pedro a través del ojo de la cerradura de la Orden de Malta',
    imageCaption: 'Il Buco della Serratura: la cúpula vaticana encuadrada por los cipreses del Aventino'
  },
  {
    id: 'bocca-della-verita',
    title: 'La Boca de la Verdad (Bocca della Verità)',
    subtitle: 'El legendario detector de mentiras romano de 1.300 kilos de mármol',
    category: 'secreto-historico',
    categoryLabel: 'Leyenda Medieval & Monumento Clásico · Siglo I',
    icon: '🦁',
    locationName: 'Piazza della Bocca della Verità (Santa Maria in Cosmedin)',
    address: 'Piazza della Bocca della Verità 18, 00186 Roma',
    coordinates: { lat: 41.8881, lng: 12.4815 },
    distanceFromHotelKm: 2.0,
    walkingMinutesFromHotel: 24,
    nearbyItineraryPoint: 'Junto al Foro Boario y el Templo de Vesta, a 8 min del Circo Máximo',
    illusion: 'Una imponente máscara esculpida con rostro de fauno o dios fluvial (probablemente Océano) con los ojos y la boca abiertos, famosa en todo el mundo por la película Vacaciones en Roma con Audrey Hepburn.',
    reality: 'Originalmente en el siglo I d.C. no era un oráculo, sino una tapa de alcantarilla monumental (un desagüe pluvial sagrado) conectado a la Cloaca Máxima de Roma para tragar las aguas hacia el Tíber.',
    howToExperience: 'Mete la mano derecha en la boca abierta mientras tus acompañantes te hacen la foto: la leyenda juraba que a los infieles o embusteros la boca de piedra les cercenaba los dedos.',
    historicalSecret: 'La leyenda medieval cuenta que un marido suspicaz llevó a su esposa ante la piedra. El amante de la mujer se hizo pasar por demente en la plaza y la abrazó antes del examen; la mujer declaró bajo juramento que jamás había tocado a ningún hombre salvo a su marido y al loco que la acababa de abrazar, librándose así del mordisco.',
    practicalTip: 'Se encuentra en el pórtico de la preciosa iglesia medieval de Santa Maria in Cosmedin. Si hay cola larga en la verja, se puede contemplar perfectamente de perfil desde los barrotes sin esperar.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Rome_%28IT%29%2C_Bocca_della_Verit%C3%A0_--_2013_--_3479.jpg/960px-Rome_%28IT%29%2C_Bocca_della_Verit%C3%A0_--_2013_--_3479.jpg',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/00000_-_Rome_-_Bocca_della_Verita_%283506220441%29.jpg',
    imageAlt: 'La Bocca della Verità en el pórtico de Santa Maria in Cosmedin',
    imageCaption: 'La Bocca della Verità: disco de mármol pavonazzetto de 1.300 kg'
  }
];
