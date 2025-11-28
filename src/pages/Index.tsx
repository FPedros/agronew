import { Home, TrendingUp, FileText, Newspaper, Video, Menu, Globe, Package, ShoppingCart, Ruler, MapPin, DollarSign, Award, Database, Monitor, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-agro.jpg";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { UpgradeModal } from "@/components/UpgradeModal";

const Index = () => {
  const { user } = useAuth();
  const hasPremium = useHasPremiumAccess();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  // Fetch latest news from database
  const { data: latestNews = [] } = useQuery({
    queryKey: ['latest-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, category, author_name, author_image_url, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });
  const mainSections = [
    {
      title: "Valoração Rural",
      description: "Avaliação precisa de imóveis rurais",
      icon: TrendingUp,
      color: "from-agro-green to-agro-green-dark",
    },
    {
      title: "Consultoria",
      description: "Soluções estratégicas para o agro",
      icon: Menu,
      color: "from-agro-blue to-blue-600",
    },
    {
      title: "Projetos & Laudos",
      description: "Projetos técnicos especializados",
      icon: FileText,
      color: "from-agro-earth to-orange-700",
    },
    {
      title: "Agronew",
      description: "Notícias do agronegócio",
      icon: Newspaper,
      color: "from-primary to-agro-green-dark",
    },
    {
      title: "Webinars",
      description: "Conteúdo educacional ao vivo",
      icon: Video,
      color: "from-secondary to-agro-blue",
    },
    {
      title: "AgroTerra",
      description: "Gestão inteligente de terras",
      icon: Globe,
      color: "from-green-600 to-emerald-700",
    },
    {
      title: "AgriContend",
      description: "Conteúdo técnico especializado",
      icon: Package,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "AgroMarket",
      description: "Marketplace do agronegócio",
      icon: ShoppingCart,
      color: "from-amber-600 to-orange-600",
    },
    {
      title: "AgroSize",
      description: "Dimensionamento de projetos",
      icon: Ruler,
      color: "from-purple-600 to-violet-700",
    },
    {
      title: "AgroTracker",
      description: "Rastreamento e monitoramento",
      icon: MapPin,
      color: "from-red-600 to-rose-700",
    },
    {
      title: "Agrovalora",
      description: "Valorização de ativos rurais",
      icon: DollarSign,
      color: "from-teal-600 to-cyan-700",
    },
    {
      title: "AgroVip",
      description: "Serviços premium exclusivos",
      icon: Award,
      color: "from-yellow-600 to-amber-700",
    },
    {
      title: "CropData",
      description: "Dados e análise de safras",
      icon: Database,
      color: "from-slate-600 to-gray-700",
    },
    {
      title: "BDonline",
      description: "Banco de dados online",
      icon: Monitor,
      color: "from-indigo-600 to-blue-700",
    },
  ];

  const highlights = [
    {
      title: "Webinar Gratuito",
      subtitle: "Gestão Financeira no Agro 4.0",
      date: "Hoje, 19h",
      badge: "AO VIVO",
    },
    {
      title: "Novo Serviço",
      subtitle: "Consultoria em Gestão Ambiental",
      date: "Lançamento",
      badge: "NOVO",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
      {/* Hero Section with User Menu */}
      <section className="relative h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
        <img
          src={heroImage}
          alt="Agronegócio de precisão"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute top-3 right-3 z-30">
          <UserMenu />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-3 text-center">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-[0.15em] uppercase bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary">
            Inovação + Agro + Tecnologia
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse" style={{ letterSpacing: '-0.03em' }}>
            Agronews
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl font-normal">
            Portal completo para o agronegócio moderno
          </p>
        </div>
      </section>

      {/* Highlight Banners */}
      <section className="px-3 -mt-6 mb-4 relative z-30">
        <div className="space-y-2.5">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-card via-muted/50 to-card backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] uppercase bg-primary/20 border border-primary/40 rounded text-primary">
                      {highlight.badge}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-normal">{highlight.date}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-0.5 tracking-tight">{highlight.title}</h3>
                  <p className="text-xs text-muted-foreground font-normal leading-relaxed">{highlight.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Sections Grid */}
      <section className="px-3 mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2 tracking-tight">
          <span className="w-1 h-5 bg-primary rounded-full" />
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {mainSections.slice(0, 3).map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="group bg-card border border-border rounded-lg p-3 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-95"
              >
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors tracking-tight">
                  {section.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">{section.description}</p>
              </div>
            );
          })}
          <Link
            to="/services"
            className="group bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30 rounded-lg p-3 hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold mb-1 text-primary tracking-tight">
              Ver Todos
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">+11 serviços disponíveis</p>
          </Link>
        </div>
      </section>

      {/* Reports Section */}
      <section className="px-3 mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2 tracking-tight">
          <span className="w-1 h-5 bg-primary rounded-full" />
          Relatórios e Análises Técnicas
        </h2>
        <Link 
          to="/reports"
          className="block bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-lg p-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold mb-1 tracking-tight">Análises por Cultura</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                Soja, Milho, Algodão, Café, Cana e Gerais
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* Latest News */}
      <section className="px-3 mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2 tracking-tight">
          <span className="w-1 h-5 bg-secondary rounded-full" />
          Últimas Notícias do Agro
        </h2>
        <div className="space-y-2.5">
          {latestNews.length > 0 ? (
            latestNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="block bg-card border border-border rounded-lg p-3 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:border-primary/30 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] uppercase bg-primary/10 rounded text-primary">
                        {news.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        {new Date(news.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold leading-snug hover:text-primary transition-colors tracking-tight">
                      {news.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma notícia encontrada</p>
            </div>
          )}
        </div>
        <Link 
          to="/news"
          className="block w-full mt-3 py-2.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300 active:scale-95 text-center"
        >
          Ver Todas as Notícias
        </Link>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border z-50 shadow-lg">
        <div className="flex items-center justify-around py-2.5 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-0.5 text-primary active:scale-95">
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

export default Index;
