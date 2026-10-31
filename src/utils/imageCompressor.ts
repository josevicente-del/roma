/**
 * Utilidad de compresión y redimensionado de imágenes en el cliente (navegador).
 * Reduce drásticamente el peso de las fotos tomadas con móviles modernos (de 8-12 MB a ~180-350 KB)
 * antes de subirlas a Supabase Storage o almacenarlas en IndexedDB, ahorrando datos en roaming en Italia.
 */

export interface CompressedImageResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  sizeKb: number;
}

/**
 * Redimensiona y comprime un archivo de imagen manteniendo la proporción de aspecto.
 * @param file Archivo original procedente del input de cámara o galería.
 * @param maxDimension Lado máximo permitido en píxeles (por defecto 1600px).
 * @param quality Calidad JPEG/WebP entre 0 y 1 (por defecto 0.80).
 */
export async function compressAndResizeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.8
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('No se pudo leer el archivo de imagen seleccionado.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagen no soportado.'));

      img.onload = () => {
        let { width, height } = img;

        // Calculamos nuevas dimensiones manteniendo el aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el lienzo de compresión 2D.'));
          return;
        }

        // Suavizado de alta calidad al escalar
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al generar el archivo comprimido.'));
              return;
            }
            resolve({
              blob,
              dataUrl,
              width,
              height,
              sizeKb: Math.round(blob.size / 1024)
            });
          },
          'image/jpeg',
          quality
        );
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

