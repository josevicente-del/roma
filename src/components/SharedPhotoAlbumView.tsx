/**
 * Pestaña 4: Álbum de Fotos Compartido con el nuevo Estilo Visual Minimalista:
 * - Cuadrícula tipo Masonry (column-count) con carga progresiva (lazy loading) y esqueletos de carga.
 * - Chips redondos para filtros por Día, por Persona (Laura, José Antonio, Mónica, José Vicente y Beatriz) y por Lugar.
 * - Avatares circulares uniformes con un color único por viajero.
 * - Acción principal clara para subir fotos comprimidas en el cliente y visor a pantalla completa con zoom sutil.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Download,
  FolderArchive,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { DayId, DaySchedule, SharedPhoto, TravelerProfile } from '../types/itinerary';
import { TRAVELER_PROFILES } from '../utils/auth';
import { compressAndResizeImage } from '../utils/imageCompressor';
import {
  deleteAlbumPhoto,
  fetchAlbumPhotos,
  uploadCompressedPhoto
} from '../services/supabaseClient';
import { downloadSinglePhoto, exportPhotosToZip } from '../utils/zipExporter';

interface SharedPhotoAlbumViewProps {
  days: DaySchedule[];
  activeProfile: TravelerProfile;
  preselectedPlaceId: string | null;
  onClearPreselectedPlace: () => void;
}

export const SharedPhotoAlbumView: React.FC<SharedPhotoAlbumViewProps> = ({
  days,
  activeProfile,
  preselectedPlaceId,
  onClearPreselectedPlace
}) => {
  const allPlaces = days.flatMap((d) => d.places);

  const [photos, setPhotos] = useState<SharedPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState<boolean>(true);

  const [selectedPlaceIdForUpload, setSelectedPlaceIdForUpload] = useState<string>(
    preselectedPlaceId || allPlaces[1]?.id || allPlaces[0].id
  );
  const [caption, setCaption] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgressText, setUploadProgressText] = useState<string>('');
  const [uploadSuccessBanner, setUploadSuccessBanner] = useState<string>('');

  // Filtros en Chips
  const [filterDay, setFilterDay] = useState<string>('all');
  const [filterPlaceId, setFilterPlaceId] = useState<string>(preselectedPlaceId || 'all');
  const [filterAuthorId, setFilterAuthorId] = useState<string>('all');

  // Visor Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Exportación ZIP
  const [zipGenerating, setZipGenerating] = useState<boolean>(false);
  const [zipStatus, setZipStatus] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    if (preselectedPlaceId) {
      setSelectedPlaceIdForUpload(preselectedPlaceId);
      setFilterPlaceId(preselectedPlaceId);
    }
  }, [preselectedPlaceId]);

  const loadPhotos = async () => {
    setLoadingPhotos(true);
    const list = await fetchAlbumPhotos();
    setPhotos(list);
    setLoadingPhotos(false);
  };

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const placeObj = allPlaces.find((p) => p.id === selectedPlaceIdForUpload) || allPlaces[0];
    setUploading(true);
    setUploadSuccessBanner('');

    const fileArray = Array.from(files);
    const newlyUploaded: SharedPhoto[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgressText(`Comprimiendo ${i + 1}/${fileArray.length}...`);
      try {
        const compressed = await compressAndResizeImage(file, 1600, 0.8);
        const savedPhoto = await uploadCompressedPhoto({
          compressed,
          placeId: placeObj.id,
          placeName: placeObj.nameEs,
          day: placeObj.day as DayId,
          author: activeProfile,
          caption:
            caption.trim() ||
            `Recuerdo en ${placeObj.nameEs} por ${activeProfile.name}`
        });
        newlyUploaded.push(savedPhoto);
      } catch (err) {
        console.error('Error al comprimir imagen:', err);
      }
    }

    setPhotos((prev) => [...newlyUploaded, ...prev]);
    setUploading(false);
    setUploadProgressText('');
    setCaption('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadSuccessBanner(
      `${newlyUploaded.length} ${
        newlyUploaded.length === 1 ? 'foto firmada' : 'fotos firmadas'
      } por ${activeProfile.name}`
    );
    setTimeout(() => setUploadSuccessBanner(''), 4000);
  };

  const filteredPhotos = photos.filter((photo) => {
    if (filterDay !== 'all' && photo.day !== filterDay) return false;
    if (filterPlaceId !== 'all' && photo.placeId !== filterPlaceId) return false;
    if (filterAuthorId !== 'all' && photo.authorId !== filterAuthorId) return false;
    return true;
  });

  const getProfileById = (id: string): TravelerProfile => {
    return TRAVELER_PROFILES.find((p) => p.id === id) || TRAVELER_PROFILES[0];
  };

  const handleDownloadZip = async () => {
    if (filteredPhotos.length === 0) return;
    setZipGenerating(true);
    try {
      await exportPhotosToZip(filteredPhotos, (curr, tot) => {
        setZipStatus(`ZIP ${curr}/${tot}...`);
      });
    } finally {
      setZipGenerating(false);
      setZipStatus('');
    }
  };

  const handleDeletePhoto = async (photo: SharedPhoto) => {
    await deleteAlbumPhoto(photo.id);
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setLightboxIndex(null);
  };

  const showPrevPhoto = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const showNextPhoto = () => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <div className="animate-page space-y-6 pb-28">
      {/* TARJETA DE SUBIDA CON UNA ACCIÓN PRINCIPAL CLARA */}
      <section className="rounded-card bg-roman-surface border border-roman-border shadow-soft p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: activeProfile.color }}
              className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-sm"
            >
              {activeProfile.initials}
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-roman-text">
                Álbum del Grupo
              </h2>
              <p className="text-xs text-roman-muted">
                Subiendo ahora con la firma de <strong>{activeProfile.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={zipGenerating || filteredPhotos.length === 0}
            className="touch-target px-3.5 py-2 rounded-xl bg-roman-bg hover:bg-roman-elevated border border-roman-border text-roman-text font-bold text-xs inline-flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <FolderArchive className="w-4 h-4 text-roman-terracotta" />
            {zipGenerating ? zipStatus : `Descargar ZIP (${filteredPhotos.length})`}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={selectedPlaceIdForUpload}
            onChange={(e) => setSelectedPlaceIdForUpload(e.target.value)}
            className="touch-target w-full px-3.5 py-2.5 rounded-xl border border-roman-border bg-roman-bg text-roman-text text-xs font-medium focus:outline-none focus:border-roman-terracotta"
          >
            {days.map((day) => (
              <optgroup key={day.id} label={day.title}>
                {day.places.map((place) => (
                  <option key={place.id} value={place.id}>
                    #{place.order} · {place.nameEs}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Añade un comentario breve (opcional)..."
            className="touch-target w-full px-3.5 py-2.5 rounded-xl border border-roman-border bg-roman-bg text-roman-text text-xs focus:outline-none focus:border-roman-terracotta"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />

        {/* Botón grande principal (>= 48px) */}
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="touch-target w-full py-3.5 px-5 rounded-card bg-roman-terracotta hover:bg-roman-terracottaHover text-white font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition"
        >
          <Camera className="w-5 h-5" />
          {uploading ? uploadProgressText : 'Subir Fotos desde Cámara o Galería'}
        </button>

        {uploadSuccessBanner && (
          <div className="p-3 rounded-xl bg-roman-elevated text-roman-text text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-roman-sage shrink-0" />
            {uploadSuccessBanner}
          </div>
        )}
      </section>

      {/* CHIPS PARA FILTROS (Día, Viajero con Avatar Circular y Lugar) */}
      <div className="space-y-3">
        {/* Chips por Persona */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterAuthorId('all')}
            className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition ${
              filterAuthorId === 'all'
                ? 'bg-roman-terracotta text-white'
                : 'bg-roman-surface text-roman-muted border border-roman-border'
            }`}
          >
            Todos (5)
          </button>
          {TRAVELER_PROFILES.map((prof) => {
            const active = filterAuthorId === prof.id;
            return (
              <button
                key={prof.id}
                onClick={() => setFilterAuthorId(active ? 'all' : prof.id)}
                className={`touch-target pl-2 pr-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 inline-flex items-center gap-1.5 transition border ${
                  active
                    ? 'bg-roman-terracotta text-white border-transparent'
                    : 'bg-roman-surface text-roman-text border-roman-border'
                }`}
              >
                <span
                  style={{ backgroundColor: prof.color }}
                  className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {prof.initials}
                </span>
                {prof.name}
              </button>
            );
          })}
        </div>

        {/* Chips por Día + Selector de Lugar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {(['all', 'viernes', 'sabado', 'domingo'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setFilterDay(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
                  filterDay === d
                    ? 'bg-[#2B2420] text-[#F7F3EC] dark:bg-[#F5F0E8] dark:text-[#181412]'
                    : 'bg-roman-surface text-roman-muted border border-roman-border'
                }`}
              >
                {d === 'all' ? 'Todos los días' : d}
              </button>
            ))}
          </div>

          <select
            value={filterPlaceId}
            onChange={(e) => {
              setFilterPlaceId(e.target.value);
              if (e.target.value === 'all') onClearPreselectedPlace();
            }}
            className="px-3 py-1.5 rounded-full bg-roman-surface border border-roman-border text-xs text-roman-text max-w-[220px]"
          >
            <option value="all">Todos los lugares</option>
            {allPlaces.map((p) => (
              <option key={p.id} value={p.id}>
                #{p.order} · {p.nameEs}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CUADRÍCULA MASONRY CON ESQUELETOS DE CARGA Y LAZY LOADING */}
      {loadingPhotos ? (
        <div className="masonry-grid">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="masonry-item rounded-card bg-roman-surface border border-roman-border p-3 animate-pulse space-y-2"
            >
              <div className="w-full h-40 rounded-xl bg-roman-elevated" />
              <div className="h-3 w-2/3 rounded bg-roman-elevated" />
              <div className="h-3 w-1/2 rounded bg-roman-elevated" />
            </div>
          ))}
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="p-10 rounded-card bg-roman-surface border border-roman-border text-center space-y-2">
          <p className="font-serif font-bold text-base text-roman-text">
            Aún no hay fotos con este filtro
          </p>
          <p className="text-xs text-roman-muted">
            Usa el botón superior para estrenar este rincón del álbum.
          </p>
        </div>
      ) : (
        <div className="masonry-grid">
          {filteredPhotos.map((photo, index) => {
            const author = getProfileById(photo.authorId);
            // Variación sutil de aspecto para lucir el diseño tipo Masonry
            const aspectClass = index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]';

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="masonry-item group cursor-pointer rounded-card overflow-hidden bg-roman-surface border border-roman-border shadow-soft hover:shadow-elevated transition"
              >
                <div className={`relative ${aspectClass} bg-roman-elevated overflow-hidden`}>
                  <img
                    src={photo.url}
                    alt={photo.caption || photo.placeName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Avatar circular con el color único de la persona */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                    <span
                      style={{ backgroundColor: author.color }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    >
                      {author.initials}
                    </span>
                    <span>{photo.authorName}</span>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="text-[11px] font-bold text-roman-terracotta truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {photo.placeName}
                  </div>
                  <p className="text-xs text-roman-text line-clamp-2 leading-snug">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VISOR A PANTALLA COMPLETA CON MICROANIMACIÓN DE ZOOM */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 select-none"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            if (deltaX > 50) showPrevPhoto();
            if (deltaX < -50) showNextPhoto();
            setTouchStartX(null);
          }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div
                style={{
                  backgroundColor: getProfileById(filteredPhotos[lightboxIndex].authorId).color
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
              >
                {getProfileById(filteredPhotos[lightboxIndex].authorId).initials}
              </div>
              <div>
                <div className="text-sm font-bold">
                  {filteredPhotos[lightboxIndex].authorName}
                </div>
                <div className="text-xs opacity-75 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {lightboxIndex + 1} de {filteredPhotos.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadSinglePhoto(filteredPhotos[lightboxIndex])}
                className="touch-target w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
                title="Descargar foto"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeletePhoto(filteredPhotos[lightboxIndex])}
                className="touch-target w-11 h-11 rounded-full bg-white/15 hover:bg-red-600 flex items-center justify-center text-white"
                title="Eliminar foto"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLightboxIndex(null)}
                className="touch-target w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={showPrevPhoto}
              className="touch-target absolute left-2 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredPhotos[lightboxIndex].url}
              alt={filteredPhotos[lightboxIndex].caption}
              className="animate-modal max-h-[72vh] max-w-full object-contain rounded-card shadow-2xl"
            />

            <button
              onClick={showNextPhoto}
              className="touch-target absolute right-2 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-xl mx-auto text-center text-white space-y-1 pb-2">
            <div className="text-xs font-bold text-[#D46B46]">
              {filteredPhotos[lightboxIndex].placeName}
            </div>
            <p className="text-sm text-stone-200">
              {filteredPhotos[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
