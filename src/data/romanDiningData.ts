/**
 * Datos y Guía de Gastronomía Romana para el Viaje a Roma (6–8 Noviembre 2026).
 * Pensado especialmente para el grupo de 5 viajeros alojados en Via Palermo 4 (Monti).
 *
 * Contiene:
 * - Los 4 grandes pilares de la pasta romana auténtica + antipasti + dulces.
 * - Restaurantes y trattorias curadas por zonas:
 *   1) Monti (al lado de vuestro hotel para viernes noche y domingo).
 *   2) Trastevere (para el paseo del sábado tarde-noche).
 *   3) Ghetto Judío & Panteón (para los almuerzos de sábado y domingo).
 */

export interface RomanDish {
  id: string;
  name: string;
  originalName: string;
  category: 'pasta' | 'antipasto' | 'dulce';
  shortDesc: string;
  ingredients: string;
  authenticityRule: string; // Regla de oro para evitar trampas turísticas
  winePairing: string;
}

export interface RomanRestaurant {
  id: string;
  name: string;
  zone: 'Monti' | 'Trastevere' | 'Ghetto & Panteón';
  category: 'trattoria' | 'aperitivo' | 'dulces';
  address: string;
  distanceFromHotelKm: number; // Distancia a pie desde Via Palermo 4
  walkingMinutesFromHotel: number;
  coordinates: { lat: number; lng: number };
  priceRange: '€' | '€€' | '€€€';
  approxPricePerson: string;
  mustOrderDish: string;
  expertTip: string;
  schedule: string;
  phone?: string;
}

export const ROMAN_SIGNATURE_DISHES: RomanDish[] = [
  {
    id: 'carbonara',
    name: 'Spaghetti alla Carbonara',
    originalName: 'Carbonara',
    category: 'pasta',
    shortDesc: 'La reina de Roma. Salsa sedosa y dorada de emulsión de yemas y queso pecorino con dados de guanciale crujientes.',
    ingredients: 'Guanciale de carrillada de cerdo curado, yemas de huevo frescas, Pecorino Romano DOP rallado al momento y pimienta negra molida gruesa.',
    authenticityRule: '🚨 REGLA DE ORO: ¡Nunca lleva nata, ni cebolla, ni champiñones, ni bacon ahumado! Si veis "con panna" en una carta, es una trampa para turistas.',
    winePairing: 'Vino blanco romano estructurado (Frascati Superiore DOCG) o tinto joven Cesanese.'
  },
  {
    id: 'cacio-e-pepe',
    name: 'Tonnarelli Cacio e Pepe',
    originalName: 'Cacio e Pepe',
    category: 'pasta',
    shortDesc: 'La aparente sencillez hecha arte: sólo pasta al dente, queso de oveja fundente y pimienta tostada.',
    ingredients: 'Tonnarelli al huevo, Pecorino Romano DOP curado y pimienta negra en grano tostada en sartén.',
    authenticityRule: '💡 El secreto reside en la mantecatura con el agua con almidón de cocer la pasta hasta crear una crema sedosa sin añadir ni mantequilla ni aceite.',
    winePairing: 'Castelli Romani Bianco o vino de los Montes Albanos.'
  },
  {
    id: 'amatriciana',
    name: 'Bucatini all\'Amatriciana',
    originalName: 'Amatriciana',
    category: 'pasta',
    shortDesc: 'Sabor intenso y umami campesino. Nació en Amatrice y fue adoptada por los taberneros de Roma.',
    ingredients: 'Bucatini (con su orificio central), guanciale crujiente dorado a fuego lento, tomate pelati San Marzano dulce y pecorino picante.',
    authenticityRule: '📌 Se hace con guanciale cortado en tiras gruesas y tomate entero pelado. No lleva ajo ni cebolla en la receta tradicional romana.',
    winePairing: 'Cesanese del Piglio DOCG (tinto con cuerpo medio).'
  },
  {
    id: 'gricia',
    name: 'Rigatoni alla Gricia',
    originalName: 'La Gricia',
    category: 'pasta',
    shortDesc: 'La "amatriciana blanca" y antecesora histórica de las salsas romanas antes de que llegara el tomate de América en el siglo XVI.',
    ingredients: 'Rigatoni, guanciale crujiente, pecorino romano y pimienta negra.',
    authenticityRule: '🧀 Para muchos romanos auténticos, es la pasta más sabrosa y contundente de la cocina de taberna.',
    winePairing: 'Vino tinto joven de la campiña romana o Sangiovese fresco.'
  },
  {
    id: 'carciofo-giudia',
    name: 'Carciofo alla Giudia',
    originalName: 'Alcachofa a la Judía',
    category: 'antipasto',
    shortDesc: 'Especialidad centenaria del Ghetto Judío romano: alcachofa "romanesco" abierta como una rosa y doblemente frita.',
    ingredients: 'Alcachofas mammole romanas sin espinas, sal marina y aceite de oliva virgen extra.',
    authenticityRule: '✨ Crujiente como una patata frita por fuera y tierna y mantecosa en el corazón. ¡Probadla en el Ghetto!',
    winePairing: 'Prosecco seco o Bellone del Lazio.'
  },
  {
    id: 'suppli',
    name: 'Supplì al Telefono',
    originalName: 'Supplì al Telefono',
    category: 'antipasto',
    shortDesc: 'El snack callejero favorito de Roma: croqueta alargada de arroz al pomodoro con un corazón de mozzarella fundente.',
    ingredients: 'Arroz cocinado con salsa de carne o pomodoro, relleno de mozzarella y rebozado con pan rallado crujiente.',
    authenticityRule: '📞 Se llama "al teléfono" porque al partirlo caliente con las manos, el queso derretido forma un largo cable telefónico entre las dos mitades.',
    winePairing: 'Cerveza artesana italiana o refresco Chinotto.'
  },
  {
    id: 'maritozzo',
    name: 'Maritozzo con la Panna',
    originalName: 'Maritozzo',
    category: 'dulce',
    shortDesc: 'El desayuno de los dioses romanos: bollo ovalado de masa madre aromatizado con cítricos y rellenado generosamente de nata fresca batida.',
    ingredients: 'Harina, huevos, miel, aceite de oliva, ralladura de naranja, y un corte central repleto de panna fresca.',
    authenticityRule: '☕ Es tradición centenaria tomarlo con un cappuccino por la mañana en la pastelería histórica Regoli, a 8 minutos de vuestro hotel.',
    winePairing: 'Cappuccino cremoso matutino o espresso doble.'
  }
];

export const ROMAN_RESTAURANTS: RomanRestaurant[] = [
  // --- ZONA 1: MONTI & CERCA DEL HOTEL EN VIA PALERMO 4 ---
  {
    id: 'carbonara-monti',
    name: 'La Carbonara dal 1906 (Monti)',
    zone: 'Monti',
    category: 'trattoria',
    address: 'Via Panisperna 214, 00184 Roma',
    distanceFromHotelKm: 0.3,
    walkingMinutesFromHotel: 4,
    coordinates: { lat: 41.8967, lng: 12.4908 },
    priceRange: '€€',
    approxPricePerson: '20 – 28 €',
    mustOrderDish: 'Pasta Carbonara en sartén y Carciofi alla Romana',
    expertTip: 'A solo 4 minutos a pie de vuestro hotel en Via Palermo. Excelente para la cena del viernes al llegar o la del sábado noche. Conviene entrar o reservar.',
    schedule: '12:30–14:30, 19:30–23:00 (Cierra domingos)',
    phone: '+39 06 482 5176'
  },
  {
    id: 'ai-tre-scalini',
    name: 'Ai Tre Scalini - Bottiglieria dal 1895',
    zone: 'Monti',
    category: 'aperitivo',
    address: 'Via Panisperna 251, 00184 Roma',
    distanceFromHotelKm: 0.3,
    walkingMinutesFromHotel: 4,
    coordinates: { lat: 41.8963, lng: 12.4913 },
    priceRange: '€€',
    approxPricePerson: '14 – 20 €',
    mustOrderDish: 'Tabla de quesos y embutidos del Lazio + Polpette al sugo',
    expertTip: 'La fachada está cubierta de hiedra verde. Ambiente bohemio inigualable para tomar un vino de la casa y unas tapas romanas nada más llegar el viernes noche.',
    schedule: '12:00–00:00 (Ininterrumpido)',
    phone: '+39 06 4890 7495'
  },
  {
    id: 'vecchia-roma-esquilino',
    name: 'Trattoria Vecchia Roma (Comida del Sábado)',
    zone: 'Monti',
    category: 'trattoria',
    address: 'Via Ferruccio 12, 00185 Roma',
    distanceFromHotelKm: 0.8,
    walkingMinutesFromHotel: 10,
    coordinates: { lat: 41.8941, lng: 12.5027 },
    priceRange: '€€',
    approxPricePerson: '18 – 25 €',
    mustOrderDish: 'Bucatini all\'Amatriciana flambeados dentro de una rueda de queso Pecorino',
    expertTip: 'Vuestra parada oficial de comida del sábado a las 14:30 h. Sitio mítico donde sirven la pasta flambeada en rueda de queso en directo.',
    schedule: '12:30–15:00, 19:30–23:00 (Cierra domingos)',
    phone: '+39 06 446 7143'
  },
  {
    id: 'pasticceria-regoli',
    name: 'Pasticceria Regoli dal 1916',
    zone: 'Monti',
    category: 'dulces',
    address: 'Via dello Statuto 60, 00185 Roma',
    distanceFromHotelKm: 0.7,
    walkingMinutesFromHotel: 8,
    coordinates: { lat: 41.8938, lng: 12.5019 },
    priceRange: '€',
    approxPricePerson: '3 – 5 €',
    mustOrderDish: 'Maritozzo con la panna montata recién batida (3,50 €)',
    expertTip: 'Consagrada como la mejor pastelería de Roma para comer el auténtico maritozzo. Si madrugáis el sábado o domingo antes de empezar la ruta, id a desayunar aquí.',
    schedule: '07:30–19:30 (Cierra martes)'
  },

  // --- ZONA 2: TRASTEVERE (SÁBADO TARDE / NOCHE) ---
  {
    id: 'da-enzo-al-29',
    name: 'Trattoria Da Enzo al 29',
    zone: 'Trastevere',
    category: 'trattoria',
    address: 'Via dei Vascellari 29, 00153 Roma (Trastevere)',
    distanceFromHotelKm: 2.2,
    walkingMinutesFromHotel: 28,
    coordinates: { lat: 41.8882, lng: 12.4777 },
    priceRange: '€€',
    approxPricePerson: '22 – 30 €',
    mustOrderDish: 'Cacio e Pepe cremoso, Polpette della nonna y Tiramisú artesanal',
    expertTip: 'Una de las mejores trattorias de toda Roma. No reservan: abren a las 19:30 h y suele formarse cola. Conviene estar a las 19:15 h para sentarse en el primer turno.',
    schedule: '12:30–15:00, 19:30–23:00 (Cierra domingos)',
    phone: '+39 06 581 2260'
  },
  {
    id: 'tonnarello-trastevere',
    name: 'Tonnarello Trastevere',
    zone: 'Trastevere',
    category: 'trattoria',
    address: 'Via della Paglia 1-2-3, 00153 Roma',
    distanceFromHotelKm: 2.5,
    walkingMinutesFromHotel: 30,
    coordinates: { lat: 41.8899, lng: 12.4697 },
    priceRange: '€€',
    approxPricePerson: '16 – 24 €',
    mustOrderDish: 'Tonnarelli en sartén de cobre caliente y Focaccia romana',
    expertTip: 'La trattoria con más ambiente de Trastevere. Sirven la pasta directamente en la sartén. Mesas en la calle con calefacción.',
    schedule: '11:30–23:30 (Ininterrumpido)'
  },
  {
    id: 'otaleg-gelato',
    name: 'Otaleg Trastevere (Heladería de Autor)',
    zone: 'Trastevere',
    category: 'dulces',
    address: 'Via di S. Cosimato 14a, 00153 Roma',
    distanceFromHotelKm: 2.5,
    walkingMinutesFromHotel: 30,
    coordinates: { lat: 41.8876, lng: 12.4708 },
    priceRange: '€',
    approxPricePerson: '3,50 – 5 €',
    mustOrderDish: 'Helado de Pistacchio crudo salado y Zabaglione',
    expertTip: 'Su nombre es Gelato al revés ("Otaleg"). Galardonado como uno de los mejores heladeros de Italia. Sin colorantes ni grasas hidrogenadas.',
    schedule: '12:00–22:00'
  },

  // --- ZONA 3: GHETTO JUDÍO, CAMPO DE' FIORI & PANTEÓN ---
  {
    id: 'nonna-betta-ghetto',
    name: 'Nonna Betta (Cocina Judeo-Romana)',
    zone: 'Ghetto & Panteón',
    category: 'trattoria',
    address: 'Via del Portico d\'Ottavia 16, 00186 Roma',
    distanceFromHotelKm: 1.8,
    walkingMinutesFromHotel: 22,
    coordinates: { lat: 41.8926, lng: 12.4776 },
    priceRange: '€€',
    approxPricePerson: '20 – 30 €',
    mustOrderDish: 'Carciofo alla Giudia crujiente (el rey del Ghetto) y Tagliolini con alcachofas y botarga',
    expertTip: 'Ubicado en la calle principal del Ghetto Judío, entre el Pórtico de Octavia y el Teatro de Marcelo. Ideal para probar la cocina kosher tradicional.',
    schedule: '11:00–23:00 (Cierra martes)',
    phone: '+39 06 6880 6263'
  },
  {
    id: 'armando-al-pantheon',
    name: 'Armando al Pantheon',
    zone: 'Ghetto & Panteón',
    category: 'trattoria',
    address: 'Salita de\' Crescenzi 31, 00186 Roma',
    distanceFromHotelKm: 1.6,
    walkingMinutesFromHotel: 20,
    coordinates: { lat: 41.8992, lng: 12.4759 },
    priceRange: '€€€',
    approxPricePerson: '30 – 45 €',
    mustOrderDish: 'Gricia con habas de temporada y Faraona ai funghi',
    expertTip: 'A sólo 30 metros del Panteón de Agripa. Clásico de la cocina señorial romana desde 1961. Requiere reserva previa.',
    schedule: '12:30–15:00, 19:00–23:00 (Cierra domingos)',
    phone: '+39 06 6880 3034'
  },
  {
    id: 'gelateria-giolitti',
    name: 'Gelateria Giolitti dal 1900',
    zone: 'Ghetto & Panteón',
    category: 'dulces',
    address: 'Via Uffici del Vicario 40, 00186 Roma',
    distanceFromHotelKm: 1.7,
    walkingMinutesFromHotel: 21,
    coordinates: { lat: 41.9011, lng: 12.4777 },
    priceRange: '€',
    approxPricePerson: '3 – 5 €',
    mustOrderDish: 'Cucurucho de Gianduia + Frutti di Bosco con "doppia panna"',
    expertTip: 'La heladería más mítica de Roma (donde Audrey Hepburn tomaba helado en Vacaciones en Roma). Procedimiento: primero pagas en la caja ("cassa"), coges el ticket y vas al mostrador.',
    schedule: '07:30–00:00 (Abierto todos los días)'
  }
];

