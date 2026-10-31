/**
 * Script Node.js sin dependencias externas para generar iconos PNG reales (180x180, 192x192 y 512x512)
 * con estética romana (Terracota #B5532F, Travertino #F7F3EC y Cúpula del Panteón)
 * compatibles al 100% con iOS (apple-touch-icon) y Android PWA (any + maskable).
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const combined = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(combined), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function generateRomanIconPng(size, filePath) {
  const rawData = Buffer.alloc(size * (size * 4 + 1));

  // Colores: Terracota (#B5532F -> 181, 83, 47) y Travertino (#F7F3EC -> 247, 243, 236)
  const bgR = 181, bgG = 83, bgB = 47;
  const fgR = 247, fgG = 243, fgB = 236;

  const cx = size / 2;
  const cy = size / 2;
  const domeRadius = size * 0.25;
  const oculusRadius = size * 0.042;
  const strokeW = Math.max(3, size * 0.035);

  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    rawData[rowStart] = 0; // Filtro PNG: None

    for (let x = 0; x < size; x++) {
      const px = rowStart + 1 + x * 4;
      let isForeground = false;

      // Marco interior sutil redondeado
      const margin = size * 0.1;
      if (
        (Math.abs(x - margin) < strokeW * 0.5 || Math.abs(x - (size - margin)) < strokeW * 0.5) &&
        y >= margin && y <= size - margin
      ) {
        isForeground = true;
      }
      if (
        (Math.abs(y - margin) < strokeW * 0.5 || Math.abs(y - (size - margin)) < strokeW * 0.5) &&
        x >= margin && x <= size - margin
      ) {
        isForeground = true;
      }

      // Base horizontal del templo romano
      const baseLineY = size * 0.72;
      if (Math.abs(y - baseLineY) < strokeW * 0.65 && x >= size * 0.23 && x <= size * 0.77) {
        isForeground = true;
      }

      // Columnas laterales del templo
      const leftColX = cx - domeRadius;
      const rightColX = cx + domeRadius;
      if (
        (Math.abs(x - leftColX) < strokeW * 0.6 || Math.abs(x - rightColX) < strokeW * 0.6) &&
        y >= cy && y <= baseLineY
      ) {
        isForeground = true;
      }

      // Cúpula semiesférica del Panteón
      const distCenter = Math.hypot(x - cx, y - cy);
      if (y <= cy && Math.abs(distCenter - domeRadius) < strokeW * 0.65) {
        isForeground = true;
      }

      // Óculo solar superior
      const distOculus = Math.hypot(x - cx, y - size * 0.34);
      if (distOculus <= oculusRadius) {
        isForeground = true;
      }

      if (isForeground) {
        rawData[px] = fgR;
        rawData[px + 1] = fgG;
        rawData[px + 2] = fgB;
        rawData[px + 3] = 255;
      } else {
        rawData[px] = bgR;
        rawData[px + 1] = bgG;
        rawData[px + 2] = bgB;
        rawData[px + 3] = 255;
      }
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idatData = zlib.deflateSync(rawData);
  const pngBuffer = Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idatData),
    makeChunk('IEND', Buffer.alloc(0))
  ]);

  fs.writeFileSync(filePath, pngBuffer);
}

const iconsDir = path.resolve('public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

generateRomanIconPng(180, path.join(iconsDir, 'apple-touch-icon.png'));
generateRomanIconPng(192, path.join(iconsDir, 'icon-192.png'));
generateRomanIconPng(512, path.join(iconsDir, 'icon-512.png'));
console.log('Iconos PNG generados correctamente.');

