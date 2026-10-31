/**
 * Servicio híbrido de Backend y Almacenamiento para el Álbum de Fotos Compartido.
 *
 * ARQUITECTURA ELEGIDA:
 * 1. Modo Nube (Supabase Storage + PostgreSQL Database):
 *    - Coste: 100% Gratuito (Free Tier incluye 1 GB de Storage y 500 MB de base de datos, suficiente para +3.500 fotos comprimidas del viaje).
 *    - Cuando VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY están presentes, sube el Blob comprimido al bucket 'roma-photos' y registra los metadatos en la tabla 'photos'.
 * 2. Modo Offline / Local Inteligente (IndexedDB nativo):
 *    - Si el usuario está sin cobertura dentro de una basílica o aún no ha configurado las variables de Supabase, guarda las fotos en IndexedDB del navegador, permitiendo probar y usar todas las funciones (subida múltiple, filtros, visor y exportación ZIP) de inmediato.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DayId, SharedPhoto, TravelerProfile } from '../types/itinerary';
import { CompressedImageResult } from '../utils/imageCompressor';

/**
 * Normaliza la URL de Supabase para admitir tanto el endpoint de API
 * (https://<project-ref>.supabase.co) como enlaces copiados del dashboard de Supabase
 * (https://supabase.com/dashboard/project/<project-ref>/...).
 */
function normalizeSupabaseUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  const dashboardMatch = trimmed.match(/\/project\/([a-z0-9_-]+)/i);
  if (dashboardMatch && dashboardMatch[1]) {
    return `https://${dashboardMatch[1]}.supabase.co`;
  }
  return trimmed;
}

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

export const isCloudConfigured = Boolean(
  supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey && supabaseAnonKey.length > 10
);

export const supabase: SupabaseClient | null = isCloudConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

const DB_NAME = 'RomaTravelAlbumDB';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

/**
 * Genera una imagen SVG en base64 con estética de postal romana para las fotos de demostración iniciales.
 */
function createRomanDemoSvgDataUrl(
  title: string,
  subtitle: string,
  gradientStart: string,
  gradientEnd: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradientStart}"/>
        <stop offset="100%" stop-color="${gradientEnd}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#g)"/>
    <circle cx="950" cy="220" r="110" fill="#FDE68A" opacity="0.25"/>
    <!-- Silueta arquitectónica romana artística -->
    <path d="M0 680 L1200 680 L1200 900 L0 900 Z" fill="#181311" opacity="0.55"/>
    <path d="M220 680 V430 A140 140 0 0 1 500 430 V680 Z" fill="#FAF6F0" opacity="0.14"/>
    <path d="M540 680 V380 L880 380 V680 Z" fill="#FAF6F0" opacity="0.12"/>
    <circle cx="710" cy="380" r="170" fill="#FAF6F0" opacity="0.16"/>
    <rect x="90" y="90" width="1020" height="720" rx="24" fill="none" stroke="#FAF6F0" stroke-width="3" opacity="0.3"/>
    <text x="140" y="560" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#FAF6F0">${title}</text>
    <text x="140" y="625" font-family="sans-serif" font-size="30" fill="#FDE68A" letter-spacing="2">${subtitle}</text>
    <text x="140" y="160" font-family="Georgia, serif" font-size="24" fill="#FAF6F0" opacity="0.8" letter-spacing="5">ROMA · VI-VIII NOVIEMBRE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const INITIAL_DEMO_PHOTOS: SharedPhoto[] = [
  {
    id: 'demo-coliseo-1',
    url: createRomanDemoSvgDataUrl('Coliseo al Amanecer', 'Llegada puntual del grupo a las 09:00 h', '#9E3B24', '#431407'),
    placeId: 'sab-1-coliseo-foro',
    placeName: 'Foro Romano y Coliseo (FIJO)',
    day: 'sabado',
    authorId: 'laura',
    authorName: 'Laura',
    caption: '¡Primera parada del sábado! La luz matinal sobre los arcos del Anfiteatro Flavio desde Monti.',
    takenAt: '2026-11-07T09:05:00.000Z',
    width: 1200,
    height: 900,
    sizeKb: 185
  },
  {
    id: 'demo-vecchia-roma-2',
    url: createRomanDemoSvgDataUrl('Amatriciana en Vecchia Roma', 'Piazza di Campitelli · Barrio Judío', '#B45309', '#451A03'),
    placeId: 'sab-6-vecchia-roma',
    placeName: 'Comida en Trattoria Vecchia Roma (FIJO - Ghetto)',
    day: 'sabado',
    authorId: 'jose-vicente',
    authorName: 'José Vicente',
    caption: 'Alcachofas a la judía y bucatini flameados en rueda de Pecorino en la terraza de Piazza Campitelli.',
    takenAt: '2026-11-07T14:50:00.000Z',
    width: 1200,
    height: 900,
    sizeKb: 210
  },
  {
    id: 'demo-trastevere-3',
    url: createRomanDemoSvgDataUrl('Atardecer en Trastevere', 'Mosaicos dorados de Santa Maria in Trastevere', '#7E22CE', '#3B0764'),
    placeId: 'sab-8-trastevere',
    placeName: 'Visita Guiada por el Trastevere (FIJO)',
    day: 'sabado',
    authorId: 'monica',
    authorName: 'Mónica',
    caption: 'Callejuelas color ocre y farolas encendiéndose durante la visita guiada de las 17:00 h.',
    takenAt: '2026-11-07T17:45:00.000Z',
    width: 1200,
    height: 900,
    sizeKb: 195
  },
  {
    id: 'demo-vaticano-4',
    url: createRomanDemoSvgDataUrl('Columnata de San Pedro', 'Domingo 08:15 h sin colas en el Vaticano', '#1D4ED8', '#172554'),
    placeId: 'dom-1-vaticano',
    placeName: 'Ciudad del Vaticano: Plaza y Basílica de San Pedro',
    day: 'domingo',
    authorId: 'jose-antonio',
    authorName: 'José Antonio',
    caption: 'Madrugar el domingo mereció totalmente la pena: la Plaza de Bernini casi para nosotros cinco.',
    takenAt: '2026-11-08T08:25:00.000Z',
    width: 1200,
    height: 900,
    sizeKb: 204
  },
  {
    id: 'demo-panteon-5',
    url: createRomanDemoSvgDataUrl('Óculo del Panteón', 'Esfera perfecta de 43,30 metros de Adriano', '#B45309', '#78350F'),
    placeId: 'dom-4-panteon-interior',
    placeName: 'Panteón de Agripa (Visita Interior Diurna)',
    day: 'domingo',
    authorId: 'beatriz',
    authorName: 'Beatriz',
    caption: 'El haz de luz solar entrando en vertical por el óculo de 9 metros sobre los casetones romanos.',
    takenAt: '2026-11-08T12:25:00.000Z',
    width: 1200,
    height: 900,
    sizeKb: 198
  }
];

/**
 * Abre la base de datos IndexedDB local para persistencia offline de fotografías.
 */
function openLocalPhotoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function getAllLocalPhotos(): Promise<SharedPhoto[]> {
  try {
    const db = await openLocalPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const list = (req.result as SharedPhoto[]) || [];
        if (list.length === 0) {
          // Sembramos las 4 postales iniciales en el primer arranque
          seedInitialDemoPhotos(db).then(() => resolve(INITIAL_DEMO_PHOTOS));
        } else {
          resolve(list.sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()));
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return INITIAL_DEMO_PHOTOS;
  }
}

async function seedInitialDemoPhotos(db: IDBDatabase): Promise<void> {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const item of INITIAL_DEMO_PHOTOS) {
      store.put(item);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function saveLocalPhoto(photo: SharedPhoto): Promise<void> {
  const db = await openLocalPhotoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(photo);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function removeLocalPhoto(id: string): Promise<void> {
  const db = await openLocalPhotoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Obtiene todas las fotos del álbum (desde Supabase si está activo, o desde IndexedDB local).
 */
export async function fetchAlbumPhotos(): Promise<SharedPhoto[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('roma_photos')
        .select('*')
        .order('taken_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          url: row.url,
          placeId: row.place_id,
          placeName: row.place_name,
          day: row.day as DayId,
          authorId: row.author_id as TravelerProfile['id'],
          authorName: row.author_name,
          caption: row.caption || '',
          takenAt: row.taken_at,
          width: row.width || 1200,
          height: row.height || 900,
          sizeKb: row.size_kb || 200
        }));
      }
    } catch {
      // Fallback transparente a IndexedDB si no hay conexión en ese momento
    }
  }
  return getAllLocalPhotos();
}

/**
 * Sube una foto ya comprimida y redimensionada en el cliente al álbum compartido.
 */
export async function uploadCompressedPhoto(params: {
  compressed: CompressedImageResult;
  placeId: string;
  placeName: string;
  day: DayId;
  author: TravelerProfile;
  caption: string;
}): Promise<SharedPhoto> {
  const { compressed, placeId, placeName, day, author, caption } = params;
  const id = `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const takenAt = new Date().toISOString();

  // Si Supabase está configurado y tenemos red, subimos al Bucket y a PostgreSQL
  if (supabase) {
    try {
      const filePath = `${day}/${id}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('roma-photos')
        .upload(filePath, compressed.blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('roma-photos')
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        await supabase.from('roma_photos').insert({
          id,
          url: publicUrl,
          place_id: placeId,
          place_name: placeName,
          day,
          author_id: author.id,
          author_name: author.name,
          caption,
          taken_at: takenAt,
          width: compressed.width,
          height: compressed.height,
          size_kb: compressed.sizeKb
        });

        const cloudPhoto: SharedPhoto = {
          id,
          url: publicUrl,
          placeId,
          placeName,
          day,
          authorId: author.id,
          authorName: author.name,
          caption,
          takenAt,
          width: compressed.width,
          height: compressed.height,
          sizeKb: compressed.sizeKb
        };
        await saveLocalPhoto(cloudPhoto);
        return cloudPhoto;
      }
    } catch {
      // Si falla la red en movilidad, se guarda en local sin perder la foto
    }
  }

  // Guardado garantizado en IndexedDB local
  const localPhoto: SharedPhoto = {
    id,
    url: compressed.dataUrl,
    placeId,
    placeName,
    day,
    authorId: author.id,
    authorName: author.name,
    caption,
    takenAt,
    width: compressed.width,
    height: compressed.height,
    sizeKb: compressed.sizeKb
  };

  await saveLocalPhoto(localPhoto);
  return localPhoto;
}

/**
 * Elimina una fotografía del álbum.
 */
export async function deleteAlbumPhoto(id: string): Promise<void> {
  if (supabase) {
    try {
      await supabase.from('roma_photos').delete().eq('id', id);
    } catch {
      // Ignorar si estamos offline
    }
  }
  await removeLocalPhoto(id);
}

/**
 * Sincroniza automáticamente hacia Supabase las fotos tomadas sin conexión (DataURL en IndexedDB)
 * en cuanto el móvil recupera la cobertura 4G/Wi-Fi.
 */
export async function syncOfflinePhotosToCloud(): Promise<number> {
  if (!supabase || !navigator.onLine) return 0;

  try {
    const localPhotos = await getAllLocalPhotos();
    const unsynced = localPhotos.filter(
      (p) => p.url.startsWith('data:image/jpeg') && !p.id.startsWith('demo-')
    );
    if (unsynced.length === 0) return 0;

    let syncedCount = 0;
    for (const photo of unsynced) {
      try {
        const res = await fetch(photo.url);
        const blob = await res.blob();
        const filePath = `${photo.day}/${photo.id}.jpg`;

        const { error: uploadErr } = await supabase.storage
          .from('roma-photos')
          .upload(filePath, blob, { contentType: 'image/jpeg', upsert: true });

        if (!uploadErr) {
          const { data: pubData } = supabase.storage
            .from('roma-photos')
            .getPublicUrl(filePath);

          await supabase.from('roma_photos').upsert({
            id: photo.id,
            url: pubData.publicUrl,
            place_id: photo.placeId,
            place_name: photo.placeName,
            day: photo.day,
            author_id: photo.authorId,
            author_name: photo.authorName,
            caption: photo.caption,
            taken_at: photo.takenAt,
            width: photo.width,
            height: photo.height,
            size_kb: photo.sizeKb
          });

          await saveLocalPhoto({ ...photo, url: pubData.publicUrl });
          syncedCount++;
        }
      } catch {
        // Reintentará en la siguiente ventana online
      }
    }
    return syncedCount;
  } catch {
    return 0;
  }
}

