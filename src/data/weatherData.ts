/**
 * Datos meteorológicos detallados y previsión horaria para el fin de semana en Roma:
 * Viernes 6, Sábado 7 y Domingo 8 de noviembre.
 */

export interface HourlyForecastItem {
  time: string;
  temp: number;
  feelsLike: number;
  condition: string;
  iconType: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'cloud-rain' | 'moon';
  rainProb: number; // Porcentaje 0 - 100
  windKmH: number;
  activityNote: string; // Qué toca en el itinerario a esa hora
}

export interface DayWeatherDetail {
  dayId: 'viernes' | 'sabado' | 'domingo';
  title: string;
  dateStr: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  rainChanceMax: number;
  humidity: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  clothingAdvice: string;
  hourly: HourlyForecastItem[];
}

export const ROME_WEEKEND_WEATHER: DayWeatherDetail[] = [
  {
    dayId: 'viernes',
    title: 'Viernes 6 de Noviembre de 2026',
    dateStr: 'Llegada nocturna',
    tempMax: 16,
    tempMin: 10,
    condition: 'Noche despejada y fresca',
    rainChanceMax: 15,
    humidity: 78,
    uvIndex: 2,
    sunrise: '06:52 h',
    sunset: '17:02 h',
    clothingAdvice: 'Chaqueta ligera o jersey abrigado para salir del aeropuerto a las 22:00 h y caminar hacia Via Palermo 4. La brisa nocturna en Monti ronda los 10-11 °C.',
    hourly: [
      {
        time: '21:00',
        temp: 13,
        feelsLike: 12,
        condition: 'Despejado',
        iconType: 'moon',
        rainProb: 10,
        windKmH: 9,
        activityNote: 'Vuelo en aproximación a Roma'
      },
      {
        time: '22:00',
        temp: 12,
        feelsLike: 11,
        condition: 'Cielos despejados',
        iconType: 'moon',
        rainProb: 10,
        windKmH: 8,
        activityNote: 'Aterrizaje y recogida de equipajes'
      },
      {
        time: '23:00',
        temp: 11,
        feelsLike: 10,
        condition: 'Fresco y sereno',
        iconType: 'moon',
        rainProb: 15,
        windKmH: 7,
        activityNote: 'Llegada y check-in en Via Palermo 4'
      },
      {
        time: '00:00',
        temp: 10,
        feelsLike: 9,
        condition: 'Despejado',
        iconType: 'moon',
        rainProb: 15,
        windKmH: 6,
        activityNote: 'Cena tardía en Monti o descanso'
      }
    ]
  },
  {
    dayId: 'sabado',
    title: 'Sábado 7 de Noviembre de 2026',
    dateStr: 'Jornada Imperial y Trastevere',
    tempMax: 17,
    tempMin: 9,
    condition: 'Intervalos soleados con nubes altas',
    rainChanceMax: 20,
    humidity: 68,
    uvIndex: 3,
    sunrise: '06:53 h',
    sunset: '17:01 h',
    clothingAdvice: 'Vestimenta por capas: camiseta + jersey fino + chaqueta. Calzado con buena suela de agarre para los adoquines y losas romanas del Foro que conservan humedad a primera hora. Paraguas plegable ligero por precaución.',
    hourly: [
      {
        time: '08:00',
        temp: 10,
        feelsLike: 9,
        condition: 'Fresco y luminoso',
        iconType: 'sun',
        rainProb: 10,
        windKmH: 7,
        activityNote: 'San Pietro in Vincoli (El Moisés)'
      },
      {
        time: '09:00',
        temp: 12,
        feelsLike: 11,
        condition: 'Soleado con brisa',
        iconType: 'sun',
        rainProb: 10,
        windKmH: 9,
        activityNote: 'Coliseo y Foro Romano (Entrada)'
      },
      {
        time: '11:00',
        temp: 15,
        feelsLike: 15,
        condition: 'Sol suave de otoño',
        iconType: 'cloud-sun',
        rainProb: 15,
        windKmH: 11,
        activityNote: 'Foro Romano y camino a San Clemente'
      },
      {
        time: '12:00',
        temp: 16,
        feelsLike: 16,
        condition: 'Nubes dispersas',
        iconType: 'cloud-sun',
        rainProb: 20,
        windKmH: 12,
        activityNote: 'Basílica de San Clemente'
      },
      {
        time: '13:00',
        temp: 17,
        feelsLike: 17,
        condition: 'Temperatura más agradable',
        iconType: 'cloud-sun',
        rainProb: 20,
        windKmH: 12,
        activityNote: 'San Juan de Letrán y paseo a Trajano'
      },
      {
        time: '14:30',
        temp: 17,
        feelsLike: 17,
        condition: 'Intervalos de nubes y claros',
        iconType: 'cloud-sun',
        rainProb: 15,
        windKmH: 10,
        activityNote: 'Comida en Vecchia Roma (Ghetto)'
      },
      {
        time: '16:00',
        temp: 15,
        feelsLike: 14,
        condition: 'Luz dorada de atardecer',
        iconType: 'cloud-sun',
        rainProb: 15,
        windKmH: 8,
        activityNote: 'Bocca della Verità e Isla Tiberina'
      },
      {
        time: '17:00',
        temp: 14,
        feelsLike: 13,
        condition: 'Puesta de sol (17:01 h)',
        iconType: 'moon',
        rainProb: 20,
        windKmH: 7,
        activityNote: 'Inicio Visita Guiada Trastevere'
      },
      {
        time: '19:00',
        temp: 12,
        feelsLike: 11,
        condition: 'Noche fresca',
        iconType: 'moon',
        rainProb: 20,
        windKmH: 8,
        activityNote: 'Final del tour y regreso por Ponte Sisto'
      },
      {
        time: '20:30',
        temp: 11,
        feelsLike: 10,
        condition: 'Sereno',
        iconType: 'moon',
        rainProb: 15,
        windKmH: 7,
        activityNote: 'Panteón y Fontana di Trevi iluminados'
      }
    ]
  },
  {
    dayId: 'domingo',
    title: 'Domingo 8 de Noviembre de 2026',
    dateStr: 'Vaticano, Centro Histórico y Vuelta',
    tempMax: 16,
    tempMin: 8,
    condition: 'Mañana despejada, nubes por la tarde',
    rainChanceMax: 25,
    humidity: 72,
    uvIndex: 3,
    sunrise: '06:55 h',
    sunset: '17:00 h',
    clothingAdvice: 'Mañana fría a las 08:00 h en la Plaza de San Pedro (8-9 °C) junto al río Tíber: llevad abrigo cómodo y fular para cubrir hombros dentro de la Basílica. A mediodía sube a 16 °C para comer.',
    hourly: [
      {
        time: '08:00',
        temp: 9,
        feelsLike: 7,
        condition: 'Mañana fresca y despejada',
        iconType: 'sun',
        rainProb: 10,
        windKmH: 9,
        activityNote: 'Llegada a Plaza de San Pedro'
      },
      {
        time: '09:00',
        temp: 11,
        feelsLike: 10,
        condition: 'Sol matinal',
        iconType: 'sun',
        rainProb: 10,
        windKmH: 10,
        activityNote: 'Interior de la Basílica Vaticana'
      },
      {
        time: '10:30',
        temp: 14,
        feelsLike: 13,
        condition: 'Soleado junto al Tíber',
        iconType: 'cloud-sun',
        rainProb: 15,
        windKmH: 11,
        activityNote: 'Castel Sant’Angelo y Museo Ara Pacis'
      },
      {
        time: '11:30',
        temp: 15,
        feelsLike: 15,
        condition: 'Nubes altas',
        iconType: 'cloud-sun',
        rainProb: 20,
        windKmH: 12,
        activityNote: 'San Luis de los Franceses (Caravaggio)'
      },
      {
        time: '12:00',
        temp: 16,
        feelsLike: 16,
        condition: 'Mediodía luminoso',
        iconType: 'cloud-sun',
        rainProb: 20,
        windKmH: 12,
        activityNote: 'Iglesia del Gesù (12:02 h)'
      },
      {
        time: '12:35',
        temp: 16,
        feelsLike: 16,
        condition: 'Luz cenital sobre el óculo',
        iconType: 'sun',
        rainProb: 20,
        windKmH: 11,
        activityNote: 'Panteón de Agripa (Interior)'
      },
      {
        time: '13:30',
        temp: 16,
        feelsLike: 16,
        condition: 'Agradable',
        iconType: 'cloud-sun',
        rainProb: 25,
        windKmH: 10,
        activityNote: 'Almuerzo de despedida'
      },
      {
        time: '15:30',
        temp: 15,
        feelsLike: 14,
        condition: 'Nubes en aumento',
        iconType: 'cloud',
        rainProb: 25,
        windKmH: 9,
        activityNote: 'Subida a Via Palermo 4 (Recogida maletas)'
      },
      {
        time: '16:30',
        temp: 14,
        feelsLike: 13,
        condition: 'Intervalos nubosos',
        iconType: 'cloud',
        rainProb: 20,
        windKmH: 9,
        activityNote: 'Salida puntual en transfer al aeropuerto'
      }
    ]
  }
];

