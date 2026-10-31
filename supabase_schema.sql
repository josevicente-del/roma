-- =============================================================================
-- ESQUEMA SQL DE SUPABASE PARA EL ÁLBUM COMPARTIDO DE ROMA (6-8 NOVIEMBRE)
-- Copia y pega este script en el "SQL Editor" de tu proyecto gratuito de Supabase
-- =============================================================================

-- 1. Crear tabla de metadatos de fotografías
CREATE TABLE IF NOT EXISTS public.roma_photos (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  place_id TEXT NOT NULL,
  place_name TEXT NOT NULL,
  day TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  caption TEXT DEFAULT '',
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  width INTEGER DEFAULT 1200,
  height INTEGER DEFAULT 900,
  size_kb INTEGER DEFAULT 200
);

-- 2. Habilitar Row Level Security (RLS) con políticas de acceso para el grupo
ALTER TABLE public.roma_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica del album del grupo"
  ON public.roma_photos FOR SELECT
  USING (true);

CREATE POLICY "Permitir subida de fotos al grupo"
  ON public.roma_photos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir borrado de fotos al grupo"
  ON public.roma_photos FOR DELETE
  USING (true);

-- 3. Crear el Bucket público 'roma-photos' en Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('roma-photos', 'roma-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Lectura publica bucket roma-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'roma-photos');

CREATE POLICY "Subida publica bucket roma-photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'roma-photos');

