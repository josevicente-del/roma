/**
 * Componente Principal de la PWA "Roma: Guía Interactiva & Álbum de Viaje (6-8 Noviembre)".
 * Cumple el sistema de diseño minimalista romano (#F7F3EC, #B5532F, #2B2420):
 * - Barra inferior fija con las 4 pestañas exactas: Hoy, Itinerario, Mapa, Álbum.
 * - Avatares circulares uniformes con un color único para Laura, José Antonio, Mónica, José Vicente y Beatriz.
 * - Fuentes autoalojadas offline (Playfair Display + DM Sans).
 */

import React, { useEffect, useState } from 'react';
import {
  Compass,
  Calendar,
  Map,
  Camera,
  Sun,
  Moon,
  CloudSun,
  Coins,
  WifiOff,
  LogOut,
  ChevronDown,
  Download,
  Layers,
  X
} from 'lucide-react';
import rawItineraryData from './data/itinerary.json';
import {
  Coordinates,
  DayId,
  ItineraryData,
  ItineraryPlace,
  TravelerProfile
} from './types/itinerary';
import { TRAVELER_PROFILES } from './utils/auth';
import { syncOfflinePhotosToCloud } from './services/supabaseClient';
import { LoginAndAvatarGate } from './components/LoginAndAvatarGate';
import { TodayView } from './components/TodayView';
import { TodayAndTimelineView } from './components/TodayAndTimelineView';
import { InteractiveMapView } from './components/InteractiveMapView';
import { WeatherForecastView } from './components/WeatherForecastView';
import { RomanDiningGuideView } from './components/RomanDiningGuideView';
import { GroupExpenseSplitter } from './components/GroupExpenseSplitter';
import { SharedPhotoAlbumView } from './components/SharedPhotoAlbumView';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { TrajanColumnSpecialSection } from './components/TrajanColumnSpecialSection';
import { PiazzaNavonaNightFountainsView } from './components/PiazzaNavonaNightFountainsView';
import { RomanForum80MinGuide } from './components/RomanForum80MinGuide';
import { getDaysSinceRomeFoundation, TRIP_DATES_SHORT } from './utils/romanDates';
import { Analytics } from '@vercel/analytics/next';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const itineraryData = rawItineraryData as unknown as ItineraryData;

type ActiveTab = 'hoy' | 'itinerario' | 'mapa' | 'trajano' | 'gastos' | 'tiempo' | 'album';

const AUTH_STORAGE_KEY = 'roma_pwa_auth_session_v1';
const PROFILE_STORAGE_KEY = 'roma_pwa_active_profile_v1';
const THEME_STORAGE_KEY = 'roma_pwa_theme_v1';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [activeProfile, setActiveProfile] = useState<TravelerProfile | null>(() => {
    const savedId = localStorage.getItem(PROFILE_STORAGE_KEY);
    return TRAVELER_PROFILES.find((p) => p.id === savedId) || null;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
  });

  // Las 4 pestañas exactas de la barra inferior: Hoy, Itinerario, Mapa, Álbum
  const [activeTab, setActiveTab] = useState<ActiveTab>('hoy');
  const [selectedDayId, setSelectedDayId] = useState<DayId>('sabado');
  const [simulatedTime, setSimulatedTime] = useState<string>('11:50');
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<ItineraryPlace | null>(null);
  const [preselectedAlbumPlaceId, setPreselectedAlbumPlaceId] = useState<string | null>(null);
  const [showDiningGuideModal, setShowDiningGuideModal] = useState<boolean>(false);
  const [showTrajanModal, setShowTrajanModal] = useState<boolean>(false);
  const [showNavonaModal, setShowNavonaModal] = useState<boolean>(false);
  const [showForumGuideModal, setShowForumGuideModal] = useState<boolean>(false);

  const [showProfileSwitcher, setShowProfileSwitcher] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);

  // Estado para instalación nativa PWA (Android/Chrome y guía iOS)
  const [deferredInstallPrompt, setDeferredInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosInstallModal, setShowIosInstallModal] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  // Cronología viva: días exactos desde la fundación de Roma (21 de abril de 753 a.C.)
  const romeChronology = getDaysSinceRomeFoundation();

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      syncOfflinePhotosToCloud();
    };
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallPwaClick = async () => {
    if (deferredInstallPrompt) {
      await deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      setDeferredInstallPrompt(null);
    } else {
      setShowIosInstallModal(true);
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleSelectProfile = (profile: TravelerProfile) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, profile.id);
    setActiveProfile(profile);
    setShowProfileSwitcher(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    setIsAuthenticated(false);
    setActiveProfile(null);
  };

  const requestUserGeolocation = () => {
    if (!('geolocation' in navigator)) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setGeoLoading(false);
      },
      () => {
        setUserCoords(itineraryData.tripMeta.accommodation.coordinates);
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  if (!isAuthenticated || !activeProfile) {
    return (
      <LoginAndAvatarGate
        isAuthenticated={isAuthenticated}
        selectedProfile={activeProfile}
        onLoginSuccess={handleLoginSuccess}
        onSelectProfile={handleSelectProfile}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-roman-bg text-roman-text transition-colors">
      {/* CABECERA MINIMALISTA CON ESPACIO EN BLANCO Y CAMBIO DE AVATAR EN 1 TOQUE */}
      <header className="sticky top-0 z-30 bg-roman-bg/90 backdrop-blur-md border-b border-roman-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg sm:text-xl text-roman-text">
                Roma
              </h1>
              <span className="text-xs font-semibold text-roman-muted">
                {TRIP_DATES_SHORT}
              </span>
              {isOffline && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-roman-elevated text-roman-terracotta text-[10px] font-bold">
                  <WifiOff className="w-3 h-3" /> Offline
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-roman-muted">
              <span>Via Palermo 4 · Monti</span>
              <span>·</span>
              <span
                className="font-mono text-roman-terracotta font-semibold"
                title="Días calculados dinámicamente en tiempo real desde la fundación mítica de Roma (21 de abril del 753 a.C. · Ab Urbe Condita)"
              >
                🏛️ Día {romeChronology.daysFormatted} AUC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Botón Instalar App PWA si aún no está instalada en modo standalone */}
            {!isStandalone && (
              <button
                onClick={handleInstallPwaClick}
                className="touch-target px-3 py-1 rounded-full bg-roman-terracotta text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-soft transition"
                title="Instalar aplicación en el móvil"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Instalar App</span>
              </button>
            )}

            {/* Selector de Avatar Circular (Laura, José Antonio, Mónica, José Vicente, Beatriz) */}
            <button
              onClick={() => setShowProfileSwitcher(!showProfileSwitcher)}
              className="touch-target flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-roman-surface border border-roman-border shadow-soft transition"
              title="Cambiar perfil con un toque"
            >
              <span
                style={{ backgroundColor: activeProfile.color }}
                className="w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center"
              >
                {activeProfile.initials}
              </span>
              <span className="text-xs font-bold text-roman-text">
                {activeProfile.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-roman-muted" />
            </button>

            {/* Botón Modo Claro / Oscuro (WCAG AA) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="touch-target w-11 h-11 rounded-full bg-roman-surface border border-roman-border flex items-center justify-center text-roman-text shadow-soft transition"
              aria-label="Cambiar modo claro u oscuro"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {showProfileSwitcher && (
              <div className="animate-modal absolute right-0 top-14 w-64 bg-roman-surface rounded-card shadow-elevated border border-roman-border p-2.5 z-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-roman-muted px-2.5 py-1.5">
                  Cambiar Viajero Activo (5)
                </div>
                <div className="space-y-1">
                  {TRAVELER_PROFILES.map((prof) => {
                    const isCurrent = prof.id === activeProfile.id;
                    return (
                      <button
                        key={prof.id}
                        onClick={() => handleSelectProfile(prof)}
                        className={`touch-target w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition ${
                          isCurrent
                            ? 'bg-roman-elevated font-bold text-roman-terracotta'
                            : 'hover:bg-roman-bg text-roman-text'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            style={{ backgroundColor: prof.color }}
                            className="w-7 h-7 rounded-full text-white font-bold text-[11px] flex items-center justify-center"
                          >
                            {prof.initials}
                          </span>
                          <div>
                            <div className="font-bold">{prof.name}</div>
                            <div className="text-[10px] text-roman-muted">
                              {prof.roleTitle}
                            </div>
                          </div>
                        </div>
                        {isCurrent && <span className="text-xs font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-roman-border">
                  <button
                    onClick={handleLogout}
                    className="touch-target w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-roman-terracotta hover:bg-roman-bg font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL CON AMPLIO ESPACIO EN BLANCO */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-5">
        {activeTab === 'hoy' && (
          <TodayView
            data={itineraryData}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            simulatedTime={simulatedTime}
            onChangeSimulatedTime={setSimulatedTime}
            userCoords={userCoords}
            onRequestGeolocation={requestUserGeolocation}
            geoLoading={geoLoading}
            onSelectPlace={(place) => setSelectedPlaceModal(place)}
            onGoToFullItinerary={() => setActiveTab('itinerario')}
            onGoToFullMap={() => setActiveTab('mapa')}
            onGoToWeather={() => setActiveTab('tiempo')}
            onGoToExpenses={() => setActiveTab('gastos')}
            onOpenDiningGuide={() => setShowDiningGuideModal(true)}
            onOpenForumGuide={() => setShowForumGuideModal(true)}
            onOpenTrajanGuide={() => setActiveTab('trajano')}
            onOpenNavonaGuide={() => setShowNavonaModal(true)}
            onOpenAlbumForPlace={(placeId) => {
              setPreselectedAlbumPlaceId(placeId);
              setActiveTab('album');
            }}
          />
        )}

        {activeTab === 'itinerario' && (
          <TodayAndTimelineView
            days={itineraryData.days}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            simulatedTime={simulatedTime}
            hotelCoords={itineraryData.tripMeta.accommodation.coordinates}
            onSelectPlace={(place) => setSelectedPlaceModal(place)}
            onOpenMapForDay={(dayId) => {
              setSelectedDayId(dayId);
              setActiveTab('mapa');
            }}
            onOpenAlbumForPlace={(placeId) => {
              setPreselectedAlbumPlaceId(placeId);
              setActiveTab('album');
            }}
            userCoords={userCoords}
          />
        )}

        {activeTab === 'mapa' && (
          <InteractiveMapView
            days={itineraryData.days}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            hotelCoords={itineraryData.tripMeta.accommodation.coordinates}
            hotelAddress={itineraryData.tripMeta.accommodation.address}
            userCoords={userCoords}
            onRequestGeolocation={requestUserGeolocation}
            onSelectPlace={(place) => setSelectedPlaceModal(place)}
          />
        )}

        {activeTab === 'trajano' && (
          <div className="animate-page pb-28">
            <TrajanColumnSpecialSection
              userCoords={userCoords}
              isStandaloneTab={true}
            />
          </div>
        )}

        {activeTab === 'gastos' && (
          <div className="animate-page space-y-6 pb-28">
            <GroupExpenseSplitter />
          </div>
        )}

        {activeTab === 'tiempo' && (
          <WeatherForecastView
            onGoToPlaceDetail={(placeId) => {
              const allPlaces = itineraryData.days.flatMap((d) => d.places);
              const found = allPlaces.find((p) => p.id === placeId);
              if (found) setSelectedPlaceModal(found);
            }}
          />
        )}

        {activeTab === 'album' && (
          <SharedPhotoAlbumView
            days={itineraryData.days}
            activeProfile={activeProfile}
            preselectedPlaceId={preselectedAlbumPlaceId}
            onClearPreselectedPlace={() => setPreselectedAlbumPlaceId(null)}
          />
        )}
      </main>

      {/* MODAL DE FICHA DE LUGAR CON AUDIOGUÍA, FOTO TIPS Y CINE */}
      <PlaceDetailModal
        place={selectedPlaceModal}
        userCoords={userCoords}
        onClose={() => setSelectedPlaceModal(null)}
        onOpenAlbumForPlace={(placeId) => {
          setPreselectedAlbumPlaceId(placeId);
          setActiveTab('album');
        }}
        onOpenDiningGuide={() => setShowDiningGuideModal(true)}
        onOpenTrajanColumn={() => setActiveTab('trajano')}
        onOpenPiazzaNavona={() => setShowNavonaModal(true)}
        onOpenForumGuide={() => setShowForumGuideModal(true)}
      />

      {/* MODAL ESPECIAL GUÍA DETALLADA: EL FORO ROMANO EN 80 MINUTOS */}
      {showForumGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowForumGuideModal(false)}
        >
          <div
            className="animate-modal w-full max-w-3xl max-h-[94vh] bg-roman-bg text-roman-text rounded-t-[24px] sm:rounded-[24px] shadow-elevated border border-roman-border overflow-y-auto p-5 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <RomanForum80MinGuide
              onClose={() => setShowForumGuideModal(false)}
              onGoToNextScheduleStop={() => {
                setShowForumGuideModal(false);
                const allPlaces = itineraryData.days.flatMap((d) => d.places);
                const nextPlace = allPlaces.find((p) => p.id === 'sab-2-san-clemente');
                if (nextPlace) setSelectedPlaceModal(nextPlace);
              }}
            />
          </div>
        </div>
      )}

      {/* MODAL ESPECIAL MONOGRÁFICO: LA COLUMNA DE TRAJANO */}
      {showTrajanModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowTrajanModal(false)}
        >
          <div
            className="animate-modal w-full max-w-2xl max-h-[92vh] bg-roman-bg text-roman-text rounded-t-[24px] sm:rounded-[24px] shadow-elevated border border-roman-border overflow-y-auto p-5 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <TrajanColumnSpecialSection
              userCoords={userCoords}
              onClose={() => setShowTrajanModal(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL ESPECIAL VISITA NOCTURNA: PIAZZA NAVONA & LAS 3 FUENTES */}
      {showNavonaModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowNavonaModal(false)}
        >
          <div
            className="animate-modal w-full max-w-2xl max-h-[92vh] bg-roman-bg text-roman-text rounded-t-[24px] sm:rounded-[24px] shadow-elevated border border-roman-border overflow-y-auto p-5 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <PiazzaNavonaNightFountainsView
              userCoords={userCoords}
              onClose={() => setShowNavonaModal(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL DE LA GUÍA GASTRONÓMICA ROMANA Y RESTAURANTES CURADOS */}
      {showDiningGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowDiningGuideModal(false)}
        >
          <div
            className="animate-modal w-full max-w-2xl max-h-[92vh] bg-roman-bg text-roman-text rounded-t-[24px] sm:rounded-[24px] shadow-elevated border border-roman-border overflow-y-auto p-5 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <RomanDiningGuideView
              userCoords={userCoords}
              hotelCoords={itineraryData.tripMeta.accommodation.coordinates}
              onClose={() => setShowDiningGuideModal(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL DE INSTRUCCIÓN RÁPIDA PARA INSTALAR LA PWA EN IPHONE / ANDROID */}
      {showIosInstallModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowIosInstallModal(false)}
        >
          <div
            className="animate-modal max-w-sm w-full bg-roman-surface rounded-card border border-roman-border p-5 space-y-3 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-roman-text">
                Instalar App en tu Móvil
              </h3>
              <button
                onClick={() => setShowIosInstallModal(false)}
                className="p-1 text-roman-muted hover:text-roman-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-roman-muted leading-relaxed">
              Para llevar la guía de Roma a pantalla completa y con soporte sin conexión:
            </p>
            <ul className="space-y-2 text-xs text-roman-text list-disc pl-4">
              <li>
                <strong>En iPhone (Safari):</strong> Toca el botón <strong>Compartir</strong> en la barra inferior y elige <strong>«Añadir a la pantalla de inicio»</strong>.
              </li>
              <li>
                <strong>En Android (Chrome):</strong> Toca el menú de tres puntos <code>⋮</code> arriba a la derecha y selecciona <strong>«Instalar aplicación»</strong>.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* BARRA INFERIOR FIJA CON LAS 7 SECCIONES: HOY, RUTA, MAPA, TRAJANO, GASTOS, TIEMPO, ÁLBUM */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-roman-surface/95 backdrop-blur-md border-t border-roman-border px-1 py-1.5 safe-area-bottom">
        <div className="max-w-xl mx-auto grid grid-cols-7 gap-0.5">
          <button
            onClick={() => setActiveTab('hoy')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'hoy'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Compass className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Hoy</span>
          </button>

          <button
            onClick={() => setActiveTab('itinerario')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'itinerario'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Calendar className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Ruta</span>
          </button>

          <button
            onClick={() => setActiveTab('mapa')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'mapa'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Map className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Mapa</span>
          </button>

          <button
            onClick={() => setActiveTab('trajano')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'trajano'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Layers className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Trajano</span>
          </button>

          <button
            onClick={() => setActiveTab('gastos')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'gastos'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Coins className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Gastos</span>
          </button>

          <button
            onClick={() => setActiveTab('tiempo')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'tiempo'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <CloudSun className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Tiempo</span>
          </button>

          <button
            onClick={() => setActiveTab('album')}
            className={`touch-target flex flex-col items-center justify-center py-1 rounded-xl transition ${
              activeTab === 'album'
                ? 'text-roman-terracotta font-bold'
                : 'text-roman-muted hover:text-roman-text'
            }`}
          >
            <Camera className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">Álbum</span>
          </button>
        </div>
      </nav>

      {/* Monitorización de visitas y rendimiento con Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
