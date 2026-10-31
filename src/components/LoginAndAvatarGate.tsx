/**
 * Pantalla de Acceso (Login único compartido del grupo) y Selector de los 5 Avatares
 * (Laura, José Antonio, Mónica, José Vicente y Beatriz) adaptada al Estilo Visual
 * minimalista romano (#F7F3EC, #B5532F, #2B2420) con avatares circulares uniformes.
 */

import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Compass, Eye, EyeOff } from 'lucide-react';
import { TRAVELER_PROFILES, verifyGroupCredentials } from '../utils/auth';
import { TravelerProfile } from '../types/itinerary';

interface LoginAndAvatarGateProps {
  isAuthenticated: boolean;
  selectedProfile: TravelerProfile | null;
  onLoginSuccess: () => void;
  onSelectProfile: (profile: TravelerProfile) => void;
}

export const LoginAndAvatarGate: React.FC<LoginAndAvatarGateProps> = ({
  isAuthenticated,
  selectedProfile,
  onLoginSuccess,
  onSelectProfile
}) => {
  const [username, setUsername] = useState('roma2026');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const valid = await verifyGroupCredentials(username, password);
      if (valid) {
        onLoginSuccess();
      } else {
        setErrorMsg('Credenciales incorrectas. Usa el usuario y clave del grupo.');
      }
    } catch {
      setErrorMsg('Error al verificar las credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername('roma2026');
    setPassword('spqr2026');
    setErrorMsg('');
  };

  // PASO 1: Login único compartido
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-roman-bg text-roman-text">
        <div className="animate-page w-full max-w-md bg-roman-surface rounded-card shadow-elevated border border-roman-border overflow-hidden">
          <div className="p-7 text-center border-b border-roman-border space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-roman-terracotta text-white flex items-center justify-center shadow-soft">
              <Compass className="w-7 h-7" />
            </div>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-roman-terracotta font-bold pt-1">
              6 al 8 de Noviembre
            </span>
            <h1 className="font-serif text-3xl font-bold text-roman-text">
              Roma · Guía & Álbum
            </h1>
            <p className="text-xs text-roman-muted">
              Laura · José Antonio · Mónica · José Vicente · Beatriz
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-7 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-roman-elevated border border-roman-terracotta text-xs text-roman-terracotta font-bold">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-roman-muted mb-1.5">
                Usuario del grupo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-roman-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="touch-target w-full pl-10 pr-4 py-2.5 rounded-xl border border-roman-border bg-roman-bg text-roman-text text-sm focus:outline-none focus:border-roman-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-roman-muted mb-1.5">
                Contraseña compartida
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-roman-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la clave"
                  className="touch-target w-full pl-10 pr-11 py-2.5 rounded-xl border border-roman-border bg-roman-bg text-roman-text text-sm focus:outline-none focus:border-roman-terracotta"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="touch-target absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-roman-muted"
                  aria-label="Mostrar u ocultar clave"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Acción principal única en pantalla */}
            <button
              type="submit"
              disabled={loading}
              className="touch-target w-full py-3.5 rounded-card bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-sm shadow-soft transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? 'Comprobando acceso...' : 'Entrar a la Guía de Roma'}
            </button>

            <div className="pt-3 border-t border-roman-border flex items-center justify-between text-xs text-roman-muted">
              <span>
                Clave: <strong className="text-roman-text">spqr2026</strong>
              </span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-roman-terracotta font-bold underline"
              >
                Rellenar con un toque
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // PASO 2: Selección de Avatar Circular entre los 5 viajeros
  if (!selectedProfile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-roman-bg text-roman-text">
        <div className="animate-page w-full max-w-lg bg-roman-surface rounded-card shadow-elevated border border-roman-border p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-roman-terracotta">
              Perfil de Viajero
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-roman-text">
              ¿Quién eres?
            </h1>
            <p className="text-xs sm:text-sm text-roman-muted">
              Elige tu avatar para firmar las fotos que subas al álbum compartido.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {TRAVELER_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className="touch-target group flex flex-col items-center p-4 rounded-card border border-roman-border bg-roman-bg hover:border-roman-terracotta transition text-center"
              >
                {/* Avatar circular uniforme con un color distinto por persona */}
                <div
                  style={{ backgroundColor: profile.color }}
                  className="w-14 h-14 rounded-full text-white font-bold text-base flex items-center justify-center shadow-soft mb-2.5 group-hover:scale-105 transition-transform"
                >
                  {profile.initials}
                </div>
                <span className="font-serif font-bold text-base text-roman-text">
                  {profile.name}
                </span>
                <span className="text-[11px] text-roman-muted mt-0.5">
                  {profile.roleTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
