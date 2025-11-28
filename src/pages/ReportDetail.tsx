import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Lock, Home, TrendingUp, FileText, Newspaper, Video, Menu } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const hasPremiumAccess = useHasPremiumAccess();

  const { data: report, isLoading } = useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (report && report.is_premium && !hasPremiumAccess) {
      navigate("/reports");
    }
  }, [report, hasPremiumAccess, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Relatório não encontrado</h1>
          <Link to="/reports">
            <Button>Voltar para Relatórios</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Relatórios
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{report.category}</Badge>
            {report.is_premium && (
              <Badge variant="default" className="gap-1">
                <Lock className="w-3 h-3" />
                Premium
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {report.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {format(new Date(report.published_at), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Author */}
        <div className="flex items-center gap-4 mb-8 p-6 bg-secondary/20 rounded-lg">
          <Avatar className="w-16 h-16">
            <AvatarImage src={report.author_image_url} alt={report.author_name} />
            <AvatarFallback>
              {report.author_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Autor</p>
            <p className="font-semibold text-foreground">{report.author_name}</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: report.content }}
          />
        </div>
      </div>

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
          <Link to="/reports" className="flex flex-col items-center gap-0.5 text-primary active:scale-95">
            <FileText className="w-5 h-5" />
            <span className="text-[9px] font-medium">Relatórios</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Newspaper className="w-5 h-5" />
            <span className="text-[9px] font-medium">Notícias</span>
          </Link>
          <Link to="/webinars" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
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

export default ReportDetail;