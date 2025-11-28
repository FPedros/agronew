import { TrendingUp, FileText, Newspaper, Video, Menu, Globe, Package, ShoppingCart, Ruler, MapPin, DollarSign, Award, Database, Monitor, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const allServices = [
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Nossos Serviços
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Soluções completas para o agronegócio
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group bg-card border border-border rounded-xl p-5 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center gap-1 text-primary">
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

export default Services;
