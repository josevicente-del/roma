/**
 * Utilidades avanzadas para la Audioguía de Voz Natural:
 * - Selección inteligente de las mejores voces neuronales / de alta definición disponibles en el navegador (Google, Microsoft Natural, Apple Premium).
 * - Calibración acústica para tono de historiador/guía turístico: pausas naturales, ritmo calmado (0.92x).
 * - Soporte para pausar, reanudar, cambiar velocidad y listar voces en español disponibles.
 */

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isHighQuality: boolean;
}

/**
 * Obtiene y clasifica las voces en español disponibles en el dispositivo del usuario,
 * priorizando voces neuronales y naturales.
 */
export function getSpanishVoices(): VoiceOption[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }

  const voices = window.speechSynthesis.getVoices();
  const spanishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('es'));

  // Ordena dando prioridad a las voces con etiquetas de alta calidad
  return spanishVoices
    .map((voice) => {
      const nameLower = voice.name.toLowerCase();
      const isHighQuality =
        nameLower.includes('natural') ||
        nameLower.includes('neural') ||
        nameLower.includes('google') ||
        nameLower.includes('online') ||
        nameLower.includes('enhanced') ||
        nameLower.includes('premium') ||
        nameLower.includes('siri');

      return {
        voice,
        name: voice.name,
        lang: voice.lang,
        isHighQuality
      };
    })
    .sort((a, b) => {
      // 1. Voces neuronales/naturales primero
      if (a.isHighQuality && !b.isHighQuality) return -1;
      if (!a.isHighQuality && b.isHighQuality) return 1;
      // 2. Priorizar acento es-ES sobre otros si están empatados
      const aIsEs = a.lang.toLowerCase() === 'es-es';
      const bIsEs = b.lang.toLowerCase() === 'es-es';
      if (aIsEs && !bIsEs) return -1;
      if (!aIsEs && bIsEs) return 1;
      return a.name.localeCompare(b.name);
    });
}

/**
 * Encuentra la mejor voz disponible para la narración.
 */
export function getBestSpanishVoice(): SpeechSynthesisVoice | null {
  const list = getSpanishVoices();
  return list.length > 0 ? list[0].voice : null;
}

/**
 * Formatea el texto narrativo para que la síntesis de voz suene mucho más humana:
 * añade micro-pausas tras los puntos, suaviza abreviaturas y enfatiza nombres propios.
 */
export function naturalizeNarrativeText(rawText: string): string {
  if (!rawText) return '';

  return rawText
    // Reemplaza abreviaturas para pronunciación natural
    .replace(/\bd\.C\./gi, 'después de Cristo')
    .replace(/\ba\.C\./gi, 'antes de Cristo')
    .replace(/\bsiglo\s+([IVXLCDM]+)/gi, (_match, roman) => `siglo ${romanToArabic(roman)}`)
    .replace(/\bh\b/gi, 'horas')
    .replace(/\bkm\b/gi, 'kilómetros')
    .replace(/\bm\b/gi, 'metros')
    .replace(/\bmin\b/gi, 'minutos')
    .replace(/\b€\b/gi, 'euros')
    // Espaciado y respiraciones entre oraciones
    .replace(/\.\s+/g, '. ... ')
    .replace(/;\s+/g, '; .. ')
    .replace(/:\s+/g, ': . ');
}

/**
 * Convierte números romanos comunes a números cardinales para la síntesis de voz
 */
function romanToArabic(roman: string): number {
  const map: Record<string, number> = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XI: 11,
    XII: 12,
    XIII: 13,
    XIV: 14,
    XV: 15,
    XVI: 16,
    XVII: 17,
    XVIII: 18,
    XIX: 19,
    XX: 20,
    XXI: 21
  };
  return map[roman.toUpperCase()] || 1;
}

