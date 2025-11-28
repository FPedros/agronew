import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, Lock, Home, TrendingUp, Newspaper, Video, Menu } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { UpgradeModal } from "@/components/UpgradeModal";
import { UserMenu } from "@/components/UserMenu";

const categories = [
  { id: "Todos", label: "Todos" },
  { id: "Soja", label: "Soja" },
  { id: "Milho", label: "Milho" },
  { id: "Algodão", label: "Algodão" },
  { id: "Café", label: "Café" },
  { id: "Cana", label: "Cana" },
  { id: "Gerais", label: "Gerais" },
];

const Reports = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const { user } = useAuth();
  const hasPremiumAccess = useHasPremiumAccess();

  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("reports")
        .select("*")
        .order("published_at", { ascending: false });

      if (selectedCategory !== "Todos") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleReportClick = (report: any) => {
    if (report.is_premium && !hasPremiumAccess) {
      setUpgradeModalOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 relative">
        <div className="absolute top-3 right-3 z-30">
          <UserMenu />
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Relatórios e Análises Técnicas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Análises especializadas por cultura de plantio com insights técnicos e mercadológicos
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : reports && reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Link
                key={report.id}
                to={handleReportClick(report) ? `/reports/${report.id}` : "#"}
                onClick={(e) => {
                  if (!handleReportClick(report)) {
                    e.preventDefault();
                  }
                }}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{report.category}</Badge>
                      {report.is_premium && (
                        <Lock className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {report.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {report.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(report.published_at), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {report.author_name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              Nenhum relatório encontrado nesta categoria
            </p>
          </div>
        )}
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

      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
    </div>
  );
};

export default Reports;