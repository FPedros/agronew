import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Home, Play, Clock, Eye, Upload, TrendingUp, FileText, Newspaper, Video, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { PremiumBadge } from "@/components/PremiumBadge";
import { UpgradeModal } from "@/components/UpgradeModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WebinarUpload } from "@/components/WebinarUpload";

const Webinars = () => {
  const { user } = useAuth();
  const hasPremium = useHasPremiumAccess();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const { data: webinars = [], isLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webinars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleWebinarClick = (webinar: any) => {
    if (webinar.is_premium && !hasPremium) {
      setUpgradeModalOpen(true);
      return;
    }
    // Increment view count
    supabase
      .from('webinars')
      .update({ view_count: (webinar.view_count || 0) + 1 })
      .eq('id', webinar.id)
      .then(() => {});
  };

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
          <div className="flex items-center gap-4">
            {user && (
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Webinar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload de Webinar</DialogTitle>
                  </DialogHeader>
                  <WebinarUpload onSuccess={() => setUploadDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Webinars Exclusivos
            </h1>
            <p className="text-lg text-muted-foreground">
              Assista palestras e apresentações de especialistas em agronegócio
            </p>
          </div>
        </div>
      </section>

      {/* Webinars Grid */}
      <section className="py-12 container">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : webinars.length === 0 ? (
          <div className="text-center py-20">
            <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Nenhum webinar disponível</h3>
            <p className="text-muted-foreground mb-6">
              {user ? "Faça upload do primeiro webinar" : "Faça login para fazer upload de webinars"}
            </p>
            {!user && (
              <Button asChild>
                <Link to="/auth">Fazer Login</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <Card 
                key={webinar.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleWebinarClick(webinar)}
              >
                <Link to={`/webinars/${webinar.id}`} className="block">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    {webinar.thumbnail_url ? (
                      <img 
                        src={webinar.thumbnail_url} 
                        alt={webinar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Play className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                    {webinar.is_premium && (
                      <div className="absolute top-3 right-3">
                        <PremiumBadge />
                      </div>
                    )}
                    {webinar.duration && (
                      <Badge className="absolute bottom-3 right-3 bg-black/80">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(webinar.duration)}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{webinar.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {webinar.view_count || 0} visualizações
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {webinar.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {webinar.description}
                    </p>

                    {webinar.presenter_name && (
                      <div className="flex items-center gap-2 pt-2 border-t">
                        {webinar.presenter_image_url ? (
                          <img 
                            src={webinar.presenter_image_url} 
                            alt={webinar.presenter_name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {webinar.presenter_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="text-sm font-medium">{webinar.presenter_name}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border z-50 shadow-lg">
        <div className="flex items-center justify-around py-2.5 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-medium">Início</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[9px] font-medium">Serviços</span>
          </Link>
          <Link to="/reports" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <FileText className="w-5 h-5" />
            <span className="text-[9px] font-medium">Relatórios</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Newspaper className="w-5 h-5" />
            <span className="text-[9px] font-medium">Notícias</span>
          </Link>
          <Link to="/webinars" className="flex flex-col items-center gap-0.5 text-primary active:scale-95">
            <Video className="w-5 h-5" />
            <span className="text-[9px] font-medium">Webinars</span>
          </Link>
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Menu className="w-5 h-5" />
            <span className="text-[9px] font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Webinars;