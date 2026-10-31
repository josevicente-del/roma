/**
 * Componente robusto de visualización de monumentos y relieves históricos.
 * 
 * Garantiza:
 * 1. referrerPolicy="no-referrer" para evitar bloqueos de hotlinking por CDNs.
 * 2. Carga progresiva sin parpadeos negros (shimmer degradado en tonos cálidos romanos).
 * 3. Fallback automático a CDN de alta disponibilidad si la URL primaria falla.
 * 4. Fallback ilustrado imperial elegante en caso de modo offline (NUNCA un recuadro negro).
 */

import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface MonumentImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  icon?: string;
  title?: string;
  caption?: string;
}

export const MonumentImage: React.FC<MonumentImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = 'w-full h-56 sm:h-72 object-cover',
  icon = '🏛️',
  title,
  caption
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setIsFailed(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (isFailed) {
    return (
      <div className="w-full h-56 sm:h-72 rounded-xl bg-gradient-to-br from-[#3D2F28] via-[#2B2420] to-[#1C1613] p-6 flex flex-col items-center justify-center text-center text-stone-200 border border-roman-border shadow-inner">
        <span className="text-4xl mb-2 filter drop-shadow">{icon}</span>
        <h5 className="font-serif font-bold text-base text-amber-200 mb-1">
          {title || alt}
        </h5>
        {caption && (
          <p className="text-xs text-stone-300 max-w-sm line-clamp-2 italic">
            {caption}
          </p>
        )}
        <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full bg-black/40 text-[11px] font-mono text-amber-400 border border-white/10">
          <Sparkles className="w-3 h-3" /> Ilustración & Ficha In Situ
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[14rem] sm:min-h-[18rem] bg-stone-800 overflow-hidden">
      {/* Esqueleto shimmer en tonos romanos mientras carga */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 animate-pulse flex flex-col items-center justify-center text-stone-400">
          <span className="text-3xl opacity-40">{icon}</span>
          <span className="text-xs text-stone-400 mt-2">Cargando monumento...</span>
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

