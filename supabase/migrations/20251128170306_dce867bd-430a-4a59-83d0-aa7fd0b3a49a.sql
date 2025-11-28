-- Criar tabela para relatórios e análises técnicas
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- Soja, Milho, Algodão, Café, Cana, Gerais
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  author_name TEXT NOT NULL,
  author_image_url TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Policy para leitura pública
CREATE POLICY "Todos os relatórios são visíveis para todos" 
ON public.reports 
FOR SELECT 
USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Criar índice para melhor performance nas consultas por categoria
CREATE INDEX idx_reports_category ON public.reports(category);
CREATE INDEX idx_reports_published_at ON public.reports(published_at DESC);