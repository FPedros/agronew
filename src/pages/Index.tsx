import { Home, TrendingUp, FileText, Newspaper, Video, Menu, Globe, Package, ShoppingCart, Ruler, MapPin, DollarSign, Award, Database, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agro.jpg";

const Index = () => {
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

  const latestNews = [
    {
      title: "Tecnologia de Precisão Aumenta Produtividade em 40%",
      category: "Inovação",
      time: "2h atrás",
    },
    {
      title: "Novos Incentivos para Agricultura Sustentável",
      category: "Política",
      time: "5h atrás",
    },
    {
      title: "Previsão do Tempo: Chuvas Favoráveis para Próxima Semana",
      category: "Clima",
      time: "8h atrás",
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
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <img
          src={heroImage}
          alt="Agronegócio de precisão"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary">
            Inovação + Agro + Tecnologia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
            Agronews
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Portal completo para o agronegócio moderno
          </p>
        </div>
      </section>

      {/* Highlight Banners */}
      <section className="px-4 -mt-8 mb-6 relative z-30">
        <div className="space-y-3">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-card via-muted/50 to-card backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-primary/20 border border-primary/40 rounded text-primary">
                      {highlight.badge}
                    </span>
                    <span className="text-xs text-muted-foreground">{highlight.date}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-0.5">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Sections Grid */}
      <section className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {mainSections.slice(0, 5).map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="group bg-card border border-border rounded-xl p-4 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">{section.description}</p>
              </div>
            );
          })}
          <Link
            to="/services"
            className="group bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30 rounded-xl p-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-primary">
              Ver Todos
            </h3>
            <p className="text-xs text-muted-foreground leading-snug">+9 serviços disponíveis</p>
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-secondary rounded-full" />
          Últimas Notícias do Agro
        </h2>
        <div className="space-y-3">
          {latestNews.map((news, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-4 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary/10 rounded text-primary">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                  <h3 className="text-sm font-medium leading-snug hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300">
          Ver Todas as Notícias
        </button>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 text-primary">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-medium">Serviços</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Newspaper className="w-5 h-5" />
            <span className="text-[10px] font-medium">Notícias</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Video className="w-5 h-5" />
            <span className="text-[10px] font-medium">Webinars</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
