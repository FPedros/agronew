import { TrendingUp, FileText, Newspaper, Video, Menu, Globe, Package, ShoppingCart, Ruler, MapPin, DollarSign, Award, Database, Monitor, Home, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserMenu } from "@/components/UserMenu";
import { useHasPremiumAccess } from "@/hooks/useSubscription";
import { UpgradeModal } from "@/components/UpgradeModal";

const Services = () => {
  const hasPremium = useHasPremiumAccess();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const allServices = [
    {
      title: "Valoração Rural",
      description: "Avaliação precisa de imóveis rurais",
      icon: TrendingUp,
      color: "from-agro-green to-agro-green-dark",
      premium: false,
    },
    {
      title: "Consultoria",
      description: "Soluções estratégicas para o agro",
      icon: Menu,
      color: "from-agro-blue to-blue-600",
      premium: false,
    },
    {
      title: "Projetos & Laudos",
      description: "Projetos técnicos especializados",
      icon: FileText,
      color: "from-agro-earth to-orange-700",
      premium: true,
    },
    {
      title: "Agronew",
      description: "Notícias do agronegócio",
      icon: Newspaper,
      color: "from-primary to-agro-green-dark",
      premium: false,
    },
    {
      title: "Webinars",
      description: "Conteúdo educacional ao vivo",
      icon: Video,
      color: "from-secondary to-agro-blue",
      premium: true,
    },
    {
      title: "AgroTerra",
      description: "Gestão inteligente de terras",
      icon: Globe,
      color: "from-green-600 to-emerald-700",
      premium: true,
    },
    {
      title: "AgriContend",
      description: "Conteúdo técnico especializado",
      icon: Package,
      color: "from-blue-600 to-indigo-700",
      premium: true,
    },
    {
      title: "AgroMarket",
      description: "Marketplace do agronegócio",
      icon: ShoppingCart,
      color: "from-amber-600 to-orange-600",
      premium: false,
    },
    {
      title: "AgroSize",
      description: "Dimensionamento de projetos",
      icon: Ruler,
      color: "from-purple-600 to-violet-700",
      premium: true,
    },
    {
      title: "AgroTracker",
      description: "Rastreamento e monitoramento",
      icon: MapPin,
      color: "from-red-600 to-rose-700",
      premium: true,
    },
    {
      title: "Agrovalora",
      description: "Valorização de ativos rurais",
      icon: DollarSign,
      color: "from-teal-600 to-cyan-700",
      premium: true,
    },
    {
      title: "AgroVip",
      description: "Serviços premium exclusivos",
      icon: Award,
      color: "from-yellow-600 to-amber-700",
      premium: true,
    },
    {
      title: "CropData",
      description: "Dados e análise de safras",
      icon: Database,
      color: "from-slate-600 to-gray-700",
      premium: true,
    },
    {
      title: "BDonline",
      description: "Banco de dados online",
      icon: Monitor,
      color: "from-indigo-600 to-blue-700",
      premium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="px-3 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent tracking-tight">
              Nossos Serviços
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">
              Soluções completas para o agronegócio
            </p>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Services Grid */}
      <section className="px-3 py-4">
        <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} />
        <div className="grid grid-cols-2 gap-3">
          {allServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-95"
              >
                {service.premium && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUpgradeModalOpen(true);
                    }}
                    className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold z-10 hover:from-yellow-600 hover:to-amber-700 transition-all active:scale-95"
                  >
                    <Lock className="w-3 h-3" />
                  </button>
                )}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-primary transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border z-50 shadow-lg">
        <div className="flex items-center justify-around py-2.5 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-medium">Início</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center gap-0.5 text-primary active:scale-95">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[9px] font-medium">Serviços</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Newspaper className="w-5 h-5" />
            <span className="text-[9px] font-medium">Notícias</span>
          </Link>
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Video className="w-5 h-5" />
            <span className="text-[9px] font-medium">Webinars</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Menu className="w-5 h-5" />
            <span className="text-[9px] font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Services;
