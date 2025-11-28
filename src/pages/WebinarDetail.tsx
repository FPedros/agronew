import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Home, ArrowLeft, Clock, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { PremiumBadge } from "@/components/PremiumBadge";
import { useState, useEffect } from "react";
import { UpgradeModal } from "@/components/UpgradeModal";

const WebinarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const hasPremium = useHasPremiumAccess();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const { data: webinar, isLoading } = useQuery({
    queryKey: ['webinar', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (webinar && webinar.is_premium && !hasPremium) {
      setUpgradeModalOpen(true);
    }
  }, [webinar, hasPremium]);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Webinar não encontrado</h2>
          <Button asChild>
            <Link to="/webinars">Voltar para Webinars</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canWatch = !webinar.is_premium || hasPremium;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg tracking-tight">AgroEconomia</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
            <Link to="/services" className="transition-colors hover:text-primary">
              Serviços
            </Link>
            <Link to="/news" className="transition-colors hover:text-primary">
              Notícias
            </Link>
            <Link to="/webinars" className="transition-colors text-primary">
              Webinars
            </Link>
          </nav>
          <UserMenu />
        </div>
      </header>

      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/webinars">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Webinars
          </Link>
        </Button>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
            {canWatch && webinar.video_url ? (
              <video 
                controls 
                className="w-full h-full"
                poster={webinar.thumbnail_url || undefined}
              >
                <source src={webinar.video_url} type="video/mp4" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                {webinar.is_premium && !hasPremium ? (
                  <>
                    <div className="mb-4">
                      <PremiumBadge />
                    </div>
                    <p className="text-lg mb-4">Conteúdo Premium</p>
                    <Button onClick={() => setUpgradeModalOpen(true)}>
                      Fazer Upgrade
                    </Button>
                  </>
                ) : (
                  <p className="text-lg">Vídeo não disponível</p>
                )}
              </div>
            )}
          </div>

          {/* Webinar Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{webinar.category}</Badge>
                {webinar.is_premium && <PremiumBadge />}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {webinar.view_count || 0} visualizações
                </span>
                {webinar.duration && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(webinar.duration)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(webinar.created_at)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                {webinar.title}
              </h1>

              {webinar.presenter_name && (
                <div className="flex items-center gap-3 mb-6">
                  {webinar.presenter_image_url ? (
                    <img 
                      src={webinar.presenter_image_url} 
                      alt={webinar.presenter_name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {webinar.presenter_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{webinar.presenter_name}</p>
                    <p className="text-sm text-muted-foreground">Apresentador</p>
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold mb-3">Sobre este webinar</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {webinar.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </div>
  );
};

export default WebinarDetail;