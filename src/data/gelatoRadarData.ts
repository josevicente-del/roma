/**
 * Datos y Reglas del "Radar de Gelato Auténtico vs. Trampas de Turistas"
 * 
 * Especialmente adaptado para el grupo de 5 viajeros en Roma, con la geolocalización
 * precisa de las mejores heladerías de culto cerca del hotel (Via Palermo 4) y la ruta.
 */

export interface GelatoAuthenticityRule {
  id: string;
  badge: string;
  title: string;
  theTrap: string;
  theAuthentic: string;
  expertWhy: string;
}

export interface AuthenticGelateria {
  id: string;
  name: string;
  tagline: string;
  zone: 'Monti (Junto al Hotel)' | 'Navona & Panteón' | 'Trastevere' | 'Otras Zonas';
  address: string;
  coordinates: { lat: number; lng: number };
  distanceFromHotelKm: number;
  walkingMinutesFromHotel: number;
  priceRange: string;
  mustTryFlavors: string[];
  signatureFeature: string;
  usesCarapine: boolean; // Si usa pozos tradicionales de acero inoxidable
  hasFreeChocolateDip: boolean; // Si tiene baño de chocolate crujiente (ej: Frigidarium)
  expertTip: string;
  schedule: string;
  imageUrl: string;
  fallbackImageUrl: string;
}

export const GELATO_AUTHENTICITY_RULES: GelatoAuthenticityRule[] = [
  {
    id: 'color',
    badge: 'Color Natural',
    title: '1. El Test del Color Real (Pistacho y Plátano)',
    theTrap: 'Pistacho verde radiactivo / flúor, plátano amarillo limón brillante o menta verde césped.',
    theAuthentic: 'El pistacho debe ser verde oliva parduzco y apagado; el plátano es blanco cremoso o grisáceo (la pulpa de plátano se oxida); la menta es blanca (el extracto de menta es incoloro).',
    expertWhy: 'Si tiene colores chillones, usan colorantes artificiales y pastas industriales cargadas de azúcar y conservantes.'
  },
  {
    id: 'montanas',
    badge: 'Estructura',
    title: '2. ¡Prohibidas las «Montañas» Hinchadas!',
    theTrap: 'Grandes bandejas con el helado levantado 15-20 cm sobre el borde formando picos que desafían la gravedad sin derretirse.',
    theAuthentic: 'El helado auténtico está a nivel de la cubeta o, idealmente, guardado bajo tapas de acero en pozos redondos («carapine»).',
    expertWhy: 'Para que un helado resista al aire a temperatura ambiente sin derretirse, necesitan inflarlo con aire caliente y grasas vegetales hidrogenadas. El helado artesano puro se derretiría en 3 minutos.'
  },
  {
    id: 'carapine',
    badge: 'Conservación',
    title: '3. El Sello Supremo: Pozos «Carapine»',
    theTrap: 'Vitrinas de cristal abiertas donde el helado está expuesto a la luz, al aire y a la humedad continua.',
    theAuthentic: 'Mostradores con tapas circulares de acero inoxidable que esconden pozos profundos refrigerados.',
    expertWhy: 'La carapina protege el helado de la luz y el aire, garantizando una temperatura homogénea y una textura sedosa sin cristales de hielo.'
  },
  {
    id: 'panna',
    badge: 'Ritual Romano',
    title: '4. El Secreto Sagrado: «¿Con Panna?»',
    theTrap: 'Nata de spray industrial de bote con sabor metálico o que te cobren 1,50 € por un chorro.',
    theAuthentic: 'Nata montada fresca («panna fresca montata a mano») batida a diario, densa y sin apenas azúcar para coronar el helado.',
    expertWhy: 'En Roma el helado siempre se pide con panna. En templos auténticos como Giolitti o Frigidarium es gratuita o cuesta apenas 0,30–0,50 € y es una experiencia celestial.'
  },
  {
    id: 'cassa',
    badge: 'Protocolo Local',
    title: '5. La Regla de Oro: «Prima alla Cassa»',
    theTrap: 'Ir directo al mostrador a pedir sabores sin haber pasado por la caja en sitios concurridos.',
    theAuthentic: 'Primero se va a la caja («cassa»), se pide el tamaño (cono o coppetta: piccolo, medio, grande), se paga, se coge el ticket y luego se elige en el mostrador.',
    expertWhy: 'En las heladerías históricas respetan este orden rigurosamente. Agiliza el servicio y evita que toquen dinero con las manos que sirven los conos.'
  }
];

export const AUTHENTIC_GELATERIAS: AuthenticGelateria[] = [
  {
    id: 'frigidarium',
    name: 'Frigidarium',
    tagline: 'El legendario baño de chocolate negro o blanco crujiente gratuito',
    zone: 'Navona & Panteón',
    address: 'Via del Governo Vecchio 112, 00186 Roma',
    coordinates: { lat: 41.8981, lng: 12.4705 },
    distanceFromHotelKm: 2.1,
    walkingMinutesFromHotel: 25,
    priceRange: '2,50 – 4,50 €',
    mustTryFlavors: ['Sabor Frigidarium (crema con galletas y caramelo)', 'Pistacchio Bronte', 'Cioccolato Fondente'],
    signatureFeature: '🍫 Baño gratis de chocolate negro o blanco fundido que se solidifica al instante sobre el helado formando una costra crujiente irresistible.',
    usesCarapine: false,
    hasFreeChocolateDip: true,
    expertTip: 'Está en una de las calles adoquinadas más bonitas de Roma (a 3 min de Piazza Navona). Siempre hay fila, pero avanza rapidísimo. No te olvides de pedir: «Con cioccolato sopra».',
    schedule: '10:00 – 01:00 (Ininterrumpido hasta tarde)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Rome_%28IT%29%2C_Bocca_della_Verit%C3%A0_--_2013_--_3479.jpg/960px-Rome_%28IT%29%2C_Bocca_della_Verit%C3%A0_--_2013_--_3479.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'giolitti',
    name: 'Gelateria Giolitti dal 1900',
    tagline: 'La heladería más señorial y legendaria de la historia de Roma',
    zone: 'Navona & Panteón',
    address: 'Via Uffici del Vicario 40, 00186 Roma',
    coordinates: { lat: 41.9011, lng: 12.4777 },
    distanceFromHotelKm: 1.7,
    walkingMinutesFromHotel: 21,
    priceRange: '3,00 – 5,50 €',
    mustTryFlavors: ['Zabaione al Marsala', 'Riso (helado de arroz con leche, su clásico)', 'Frutti di Bosco con Doppia Panna'],
    signatureFeature: '👑 Camareros vestidos de etiqueta, suelo de mármol Art Déco y más de 60 sabores tradicionales elaborados a diario desde 1900.',
    usesCarapine: false,
    hasFreeChocolateDip: false,
    expertTip: '¡Prima alla cassa! Pagad primero el ticket en la caja del fondo antes de acercaros al mostrador. Probad la panna montata doble: es la más famosa de la ciudad.',
    schedule: '07:30 – 00:00 (Abierto todos los días)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'otaleg',
    name: 'Otaleg! Trastevere',
    tagline: '«Gelato» al revés: la cima de la pureza y mejor heladería de Italia',
    zone: 'Trastevere',
    address: 'Via di S. Cosimato 14a, 00153 Roma',
    coordinates: { lat: 41.8876, lng: 12.4708 },
    distanceFromHotelKm: 2.5,
    walkingMinutesFromHotel: 30,
    priceRange: '3,50 – 5,00 €',
    mustTryFlavors: ['Pistacchio crudo salado', 'Cacio e Pepe con higos (edición especial)', 'Mango puro de Sicilia'],
    signatureFeature: '🏺 Heladería con laboratorio a la vista de Marco Radicioni, guardado 100% en pozos carapine. Cero colorantes, cero conservantes.',
    usesCarapine: true,
    hasFreeChocolateDip: false,
    expertTip: 'Esencial durante el paseo de la tarde del sábado por Trastevere. Sus sorbetes de fruta tienen más del 70% de pulpa fresca de temporada.',
    schedule: '12:00 – 22:30',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'fatamorgana-monti',
    name: 'Fatamorgana Monti (Al Lado del Hotel)',
    tagline: 'A solo 4 minutos a pie de vuestro alojamiento en Via Palermo 4',
    zone: 'Monti (Junto al Hotel)',
    address: 'Piazza degli Zingari 5, 00184 Roma',
    coordinates: { lat: 41.8963, lng: 12.4925 },
    distanceFromHotelKm: 0.35,
    walkingMinutesFromHotel: 4,
    priceRange: '2,80 – 4,50 €',
    mustTryFlavors: ['Bacio del Principe (avellana y chocolate amargo)', 'Panspeziato romano', 'Madagascar (chocolate con flor de sal)'],
    signatureFeature: '🌿 100% artesanal y apto para celíacos (cucuruchos sin gluten elaborados con harina de arroz). Sabores herbales y botánicos irrepetibles.',
    usesCarapine: true,
    hasFreeChocolateDip: false,
    expertTip: 'Vuestra heladería de cabecera del viaje: está en la plaza más bohemia del barrio de Monti, a 300 metros de vuestra puerta. Perfecta para el helado de regreso tras la cena.',
    schedule: '12:00 – 23:30',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'gelateria-del-teatro',
    name: 'Gelateria del Teatro',
    tagline: 'Obrador a la vista en un rincón renacentista de cuento',
    zone: 'Navona & Panteón',
    address: 'Via dei Coronari 65, 00186 Roma',
    coordinates: { lat: 41.9006, lng: 12.4700 },
    distanceFromHotelKm: 2.2,
    walkingMinutesFromHotel: 26,
    priceRange: '3,00 – 5,00 €',
    mustTryFlavors: ['Ricotta con higos caramelizados y nueces', 'Lavanda y melocotón blanco', 'Frambuesa con salvia'],
    signatureFeature: '🪟 Una gran ventana acristalada a la calle permite ver a los maestros pelar la fruta fresca y fundir los bloques de chocolate de origen.',
    usesCarapine: false,
    hasFreeChocolateDip: false,
    expertTip: 'Situada en una de las calles más fotogénicas de Roma (Via dei Coronari). Tomarse el helado sentado en la escalinata de piedra contigua es una maravilla.',
    schedule: '11:00 – 23:00',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'gunther',
    name: 'Günther Gelato Italiano',
    tagline: 'El maestro tirolés que conquistó el corazón de Roma',
    zone: 'Navona & Panteón',
    address: 'Piazza di Sant\'Eustachio 47, 00186 Roma',
    coordinates: { lat: 41.8984, lng: 12.4746 },
    distanceFromHotelKm: 1.8,
    walkingMinutesFromHotel: 22,
    priceRange: '3,00 – 5,00 €',
    mustTryFlavors: ['Pino Mugo del Tirol', 'Chocolate con chile habanero', 'Leche de montaña con vainilla Bourbon'],
    signatureFeature: '🏔️ Elaborado con agua mineral pura Plose de los Alpes y leche ecológica certificada. Recetas de autor premiadas internacionalmente.',
    usesCarapine: true,
    hasFreeChocolateDip: false,
    expertTip: 'Justo enfrente de la iglesia de Sant\'Eustachio (famosa por el ciervo con la cruz en el tejado) y junto al mítico café de Sant\'Eustachio.',
    schedule: '11:00 – 23:30',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=960&auto=format&fit=crop'
  },
  {
    id: 'come-il-latte',
    name: 'Come il Latte',
    tagline: 'Fuentes continuas de chocolate caliente blanco y negro para tu cono',
    zone: 'Otras Zonas',
    address: 'Via Silvio Spaventa 24, 00187 Roma',
    coordinates: { lat: 41.9069, lng: 12.4962 },
    distanceFromHotelKm: 1.2,
    walkingMinutesFromHotel: 14,
    priceRange: '3,00 – 5,00 €',
    mustTryFlavors: ['Caramelo salado con galleta', 'Pistacchio siciliano', 'Crema Come il Latte con galleta de barquillo'],
    signatureFeature: '🚰 Grifos de chocolate fundido: rellenan el fondo del barquillo con chocolate templado antes de servir el helado y lo coronan con nata y galleta casera.',
    usesCarapine: true,
    hasFreeChocolateDip: true,
    expertTip: 'Decoración vintage encantadora como una lechería antigua de los años 50 con botellas de vidrio. Es un favorito absoluto de los romanos locales.',
    schedule: '11:00 – 23:00',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Giolitti_in_Rome.jpg/960px-Giolitti_in_Rome.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=960&auto=format&fit=crop'
  }
];
