/**
 * Reproductor de Audioguía con Síntesis de Voz Natural:
 * - Selección automática de la voz de mayor fidelidad del dispositivo (Google, Microsoft Natural, Apple Siri/Premium).
 * - Control de reproducción: Reproducir, Pausar, Reanudar y Reiniciar.
 * - Modificador de velocidad de lectura (0.85x, 1x, 1.15x) para máxima comodidad auditiva.
 * - Visualizador de onda de sonido y transcripción para lectura sincronizada.
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Settings,
  ChevronDown,
  ChevronUp,
  Headphones
} from 'lucide-react';
import {
  getSpanishVoices,
  getBestSpanishVoice,
  naturalizeNarrativeText,
  VoiceOption
} from '../utils/audioGuide';

interface NaturalAudioGuidePlayerProps {
  title: string;
  script: string;
  durationApprox?: string;
}

export const NaturalAudioGuidePlayer: React.FC<NaturalAudioGuidePlayerProps> = ({
  title,
  script,
  durationApprox
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(0.92); // Ritmo natural pausado
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [supported, setSupported] = useState(true);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const list = getSpanishVoices();
      setAvailableVoices(list);
      if (list.length > 0) {
        setSelectedVoice((prev) => prev || list[0].voice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Al cambiar de texto o desmontar, detener
  useEffect(() => {
    stopPlayback();
  }, [script]);

  const stopPlayback = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handlePlayOrPause = () => {
    if (!supported) return;

    if (isPlaying && !isPaused) {
      // Pausar
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPlaying && isPaused) {
      // Reanudar
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Iniciar nueva narración
    window.speechSynthesis.cancel();

    const naturalText = naturalizeNarrativeText(script);
    const utterance = new SpeechSynthesisUtterance(naturalText);

    const voiceToUse = selectedVoice || getBestSpanishVoice();
    if (voiceToUse) {
      utterance.voice = voiceToUse;
      utterance.lang = voiceToUse.lang;
    } else {
      utterance.lang = 'es-ES';
    }

    utterance.rate = speed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      // Reinicia con la nueva velocidad
      stopPlayback();
      setTimeout(() => {
        handlePlayOrPause();
      }, 100);
    }
  };

  if (!supported) {
    return (
      <div className="p-3 bg-roman-elevated rounded-xl text-xs text-roman-muted">
        Tu navegador no soporta síntesis de voz offline.
      </div>
    );
  }

  const isHighQualityVoice =
    selectedVoice &&
    (selectedVoice.name.toLowerCase().includes('natural') ||
      selectedVoice.name.toLowerCase().includes('neural') ||
      selectedVoice.name.toLowerCase().includes('google') ||
      selectedVoice.name.toLowerCase().includes('premium'));

  return (
    <div className="rounded-2xl bg-roman-surface border border-roman-border shadow-sm p-4 space-y-3.5">
      {/* Cabecera del Reproductor */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying && !isPaused
                ? 'bg-roman-terracotta text-white animate-pulse'
                : 'bg-roman-elevated text-roman-terracotta'
            }`}
          >
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-roman-text flex items-center gap-1.5">
              <span>Audioguía de Voz Natural</span>
              {isHighQualityVoice && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-sans px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 font-semibold">
                  <Sparkles className="w-2.5 h-2.5" /> HD Natural
                </span>
              )}
            </h4>
            <p className="text-[11px] text-roman-muted">
              {durationApprox ? `Duración aprox. ~${durationApprox}` : 'Narración histórica inmersiva'}
            </p>
          </div>
        </div>

        {/* Botón de Ajustes de Voz */}
        <button
          onClick={() => setShowVoiceSettings(!showVoiceSettings)}
          className="p-1.5 rounded-lg text-roman-muted hover:text-roman-text hover:bg-roman-elevated transition"
          title="Configurar voz y velocidad"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Controles de Reproducción Principales */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-roman-elevated/70 p-2.5 rounded-xl border border-roman-border/50">
        <div className="flex items-center gap-2">
          {/* Botón Play / Pause */}
          <button
            onClick={handlePlayOrPause}
            className={`touch-target px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition ${
              isPlaying && !isPaused
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-roman-terracotta hover:bg-roman-terracottaHover text-white'
            }`}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar</span>
              </>
            ) : isPlaying && isPaused ? (
              <>
                <Play className="w-4 h-4" />
                <span>Reanudar</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Escuchar Audioguía</span>
              </>
            )}
          </button>

          {/* Botón Detener / Reiniciar */}
          {isPlaying && (
            <button
              onClick={stopPlayback}
              className="touch-target p-2 rounded-xl bg-roman-surface border border-roman-border text-roman-muted hover:text-roman-text transition"
              title="Detener narración"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selector de Velocidad */}
        <div className="flex items-center gap-1 bg-roman-surface rounded-lg p-0.5 border border-roman-border text-[11px] font-semibold">
          {[
            { label: '0.85x', val: 0.85 },
            { label: '1.0x', val: 0.95 },
            { label: '1.15x', val: 1.15 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleSpeedChange(item.val)}
              className={`px-2 py-1 rounded transition ${
                Math.abs(speed - item.val) < 0.05
                  ? 'bg-roman-terracotta text-white'
                  : 'text-roman-muted hover:text-roman-text'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizador de audio mientras habla */}
      {isPlaying && !isPaused && (
        <div className="flex items-center justify-center gap-1 py-1">
          <span className="w-1 h-3 bg-roman-terracotta rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-5 bg-roman-terracotta rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-2 bg-roman-terracotta rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="w-1 h-6 bg-roman-terracotta rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
          <span className="w-1 h-4 bg-roman-terracotta rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
          <span className="text-[11px] text-roman-terracotta font-medium ml-2">Narrando en vivo...</span>
        </div>
      )}

      {/* Panel Desplegable de Configuración de Voz */}
      {showVoiceSettings && (
        <div className="p-3 bg-roman-elevated rounded-xl border border-roman-border space-y-2 text-xs">
          <label className="font-bold text-roman-text block">Voz en español seleccionada:</label>
          {availableVoices.length > 0 ? (
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const found = availableVoices.find((v) => v.voice.name === e.target.value);
                if (found) {
                  setSelectedVoice(found.voice);
                  if (isPlaying) {
                    stopPlayback();
                  }
                }
              }}
              className="w-full p-2 rounded-lg bg-roman-surface border border-roman-border text-roman-text text-xs focus:ring-1 focus:ring-roman-terracotta"
            >
              {availableVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} {v.isHighQuality ? '✨ (Natural / HD)' : ''}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-[11px] text-roman-muted">
              Se utilizará la voz en español predeterminada del sistema.
            </p>
          )}
          <p className="text-[10px] text-roman-muted leading-tight">
            Consejo: En Android, iOS o Windows, las voces marcadas con «Natural», «Google» o «Neural» ofrecen una entonación idéntica a una locución humana profesional.
          </p>
        </div>
      )}

      {/* Desplegable para ver la Transcripción Completa del Guión */}
      <div>
        <button
          onClick={() => setShowScript(!showScript)}
          className="flex items-center justify-between w-full text-left text-xs font-bold text-roman-muted hover:text-roman-text transition pt-1"
        >
          <span>Leer transcripción del guión</span>
          {showScript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showScript && (
          <div className="mt-2 p-3 rounded-xl bg-roman-elevated/60 border border-roman-border text-xs text-roman-text leading-relaxed max-h-48 overflow-y-auto space-y-2 font-serif italic">
            <p>{script}</p>
          </div>
        )}
      </div>
    </div>
  );
};
