-- Update RLS policies to allow all users to view all content
DROP POLICY IF EXISTS "Notícias gratuitas são visíveis para todos" ON public.news;
CREATE POLICY "Todas as notícias são visíveis para todos" 
ON public.news 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Serviços gratuitos são visíveis para todos" ON public.services;
CREATE POLICY "Todos os serviços são visíveis para todos" 
ON public.services 
FOR SELECT 
USING (true);