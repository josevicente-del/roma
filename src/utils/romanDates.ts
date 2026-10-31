/**
 * Utilidades Cronológicas y de la Fundación de Roma («Ab Urbe Condita» - a.U.c.):
 * - Cálculo dinámico y en tiempo real de los días transcurridos desde la mítica
 *   fundación de Roma por Rómulo el 21 de abril del 753 a.C.
 * - Formato del año actual del viaje (2026) y fechas completas.
 */

export interface RomeFoundationChronology {
  /** Número total de días transcurridos desde el 21 de abril de 753 a.C. */
  days: number;
  /** Días formateados en español con separador de miles (ej. "1.014.836") */
  daysFormatted: string;
  /** Año en el calendario romano clásico (Ab Urbe Condita) */
  yearsAuc: number;
  /** Año AUC en numeración romana tradicional (ej. "MMDCCLXXIX a.U.c.") */
  aucRoman: string;
  /** Fecha mítica canónica según Varrón */
  foundationDateStr: string;
  /** Resumen breve para tarjetas y cabeceras */
  shortSummary: string;
}

/**
 * Convierte un número arábigo a numeración romana tradicional.
 */
export function toRomanNumeral(num: number): string {
  const romanLookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let result = '';
  let remaining = num;

  for (const key of Object.keys(romanLookup)) {
    const value = romanLookup[key];
    while (remaining >= value) {
      result += key;
      remaining -= value;
    }
  }

  return result;
}

/**
 * Calcula con precisión astronómica los días transcurridos desde la
 * fundación de Roma (21 de abril del 753 a.C.) hasta la fecha de ejecución.
 *
 * En la cronología astronómica:
 * El año 1 a.C. es el año 0.
 * El año 753 a.C. es el año -752.
 */
export function getDaysSinceRomeFoundation(targetDate: Date = new Date()): RomeFoundationChronology {
  // 21 de abril de 753 a.C. (mes 3 es abril en JavaScript, indexado desde 0)
  const foundationDate = new Date(-752, 3, 21, 0, 0, 0);

  const diffMs = targetDate.getTime() - foundationDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Cálculo del año Ab Urbe Condita: para años d.C., Año AUC = Año d.C. + 753
  const currentYear = targetDate.getFullYear();
  const yearsAuc = currentYear + 753;
  const aucRoman = `${toRomanNumeral(yearsAuc)} a.U.c.`;

  const daysFormatted = days.toLocaleString('es-ES');

  return {
    days,
    daysFormatted,
    yearsAuc,
    aucRoman,
    foundationDateStr: '21 de abril de 753 a.C.',
    shortSummary: `Día ${daysFormatted} de Roma (${aucRoman})`
  };
}

/** Constantes de fechas del viaje con año explícito */
export const TRIP_YEAR = 2026;
export const TRIP_DATES_LONG = '6 al 8 de Noviembre de 2026';
export const TRIP_DATES_SHORT = '6–8 Nov 2026';

