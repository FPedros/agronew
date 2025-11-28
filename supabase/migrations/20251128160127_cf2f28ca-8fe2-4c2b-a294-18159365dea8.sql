-- Create webinars table
CREATE TABLE public.webinars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- duration in seconds
  category TEXT NOT NULL,
  presenter_name TEXT NOT NULL,
  presenter_image_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;

-- Create policies for webinars
CREATE POLICY "Webinars são visíveis para todos"
ON public.webinars
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem inserir webinars"
ON public.webinars
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas admins podem atualizar webinars"
ON public.webinars
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas admins podem deletar webinars"
ON public.webinars
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_webinars_updated_at
BEFORE UPDATE ON public.webinars
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for webinar videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'webinar-videos',
  'webinar-videos',
  true,
  1073741824, -- 1GB limit
  ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
);

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('webinar-thumbnails', 'webinar-thumbnails', true);

-- Create storage policies for videos
CREATE POLICY "Vídeos são públicos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'webinar-videos');

CREATE POLICY "Usuários autenticados podem fazer upload de vídeos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'webinar-videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem atualizar seus vídeos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'webinar-videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem deletar seus vídeos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'webinar-videos' AND auth.uid() IS NOT NULL);

-- Create storage policies for thumbnails
CREATE POLICY "Thumbnails são públicos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'webinar-thumbnails');

CREATE POLICY "Usuários autenticados podem fazer upload de thumbnails"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'webinar-thumbnails' AND auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem atualizar thumbnails"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'webinar-thumbnails' AND auth.uid() IS NOT NULL);

CREATE POLICY "Usuários autenticados podem deletar thumbnails"
ON storage.objects
FOR DELETE
USING (bucket_id = 'webinar-thumbnails' AND auth.uid() IS NOT NULL);