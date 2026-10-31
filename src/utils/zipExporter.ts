/**
 * Utilidad para descargar fotografías individuales o generar un archivo comprimido .ZIP
 * con todas las fotos del viaje (o las filtradas en pantalla) ordenadas por día y autor.
 */

import JSZip from 'jszip';
import { SharedPhoto } from '../types/itinerary';

/**
 * Descarga una única fotografía en el dispositivo del usuario.
 */
export async function downloadSinglePhoto(photo: SharedPhoto): Promise<void> {
  try {
    const response = await fetch(photo.url);
    const blob = await response.blob();
    const ext = blob.type.includes('svg') ? 'svg' : 'jpg';
    const safePlace = photo.placeName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const filename = `Roma_${photo.day}_${safePlace}_${photo.authorName}.${ext}`;

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Error al descargar la foto:', err);
  }
}

/**
 * Genera y descarga un archivo ZIP completo con todas las fotografías recibidas y un resumen en texto.
 */
export async function exportPhotosToZip(
  photos: SharedPhoto[],
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('Album_Roma_6-8_Noviembre');
  if (!folder) return;

  let index = 1;
  const total = photos.length;
  const manifestLines: string[] = [
    '==============================================================',
    ' ÁLBUM COMPARTIDO DE ROMA (6 AL 8 DE NOVIEMBRE)',
    ' Viajeros: Laura, José Antonio, Mónica, José Vicente y grupo',
    '==============================================================',
    ''
  ];

  for (const photo of photos) {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const ext = blob.type.includes('svg') ? 'svg' : 'jpg';
      const safeAuthor = photo.authorName.replace(/\s+/g, '_');
      const safePlace = photo.placeName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 28);
      const fileName = `${String(index).padStart(2, '0')}_${photo.day}_${safePlace}_por_${safeAuthor}.${ext}`;

      folder.file(fileName, blob);

      const dateFormatted = new Date(photo.takenAt).toLocaleString('es-ES');
      manifestLines.push(
        `#${index} - [${photo.day.toUpperCase()}] ${photo.placeName}`,
        `   Subida por: ${photo.authorName} (${dateFormatted})`,
        `   Comentario: ${photo.caption || 'Sin comentario'}`,
        `   Archivo: ${fileName}`,
        ''
      );
    } catch (e) {
      console.warn('No se pudo empaquetar una imagen en el ZIP:', e);
    }
    if (onProgress) onProgress(index, total);
    index++;
  }

  folder.file('INDICE_DE_RECUERDOS.txt', manifestLines.join('\n'));

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = zipUrl;
  link.download = `Album_Roma_Recuerdos_${photos.length}_fotos.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(zipUrl);
}

