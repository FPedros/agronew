import { Home, TrendingUp, Newspaper, Video, Menu, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = ["Todas", "Política", "Inovação", "Clima", "GeoPolitica"];

  const newsData = [
    {
      id: 1,
      title: "Tecnologia de Precisão Aumenta Produtividade em 40%",
      category: "Inovação",
      excerpt: "Novos sistemas de monitoramento por satélite revolucionam a agricultura brasileira",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      time: "2h atrás",
      author: "João Silva",
    },
    {
      id: 2,
      title: "Novos Incentivos para Agricultura Sustentável",
      category: "Política",
      excerpt: "Governo anuncia programa de crédito verde para pequenos e médios produtores",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
      time: "5h atrás",
      author: "Maria Santos",
    },
    {
      id: 3,
      title: "Previsão do Tempo: Chuvas Favoráveis para Próxima Semana",
      category: "Clima",
      excerpt: "Sistema meteorológico indica precipitações acima da média nas principais regiões produtoras",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
      time: "8h atrás",
      author: "Pedro Costa",
    },
    {
      id: 4,
      title: "Brasil e China Firmam Acordo Comercial de Commodities",
      category: "GeoPolitica",
      excerpt: "Nova parceria promete aumentar exportações de soja e milho em 25%",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800",
      time: "1d atrás",
      author: "Ana Oliveira",
    },
    {
      id: 5,
      title: "Startup Brasileira Desenvolve Drone para Pulverização Inteligente",
      category: "Inovação",
      excerpt: "Tecnologia nacional reduz uso de defensivos em até 60%",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      time: "1d atrás",
      author: "Carlos Mendes",
    },
    {
      id: 6,
      title: "Mudanças Climáticas Afetam Calendário Agrícola",
      category: "Clima",
      excerpt: "Pesquisadores alertam para necessidade de adaptação das culturas",
      image: "https://images.unsplash.com/photo-1611270629569-8b357cb88996?w=800",
      time: "2d atrás",
      author: "Fernanda Lima",
    },
    {
      id: 7,
      title: "Nova Lei Regulariza Uso de Agroquímicos",
      category: "Política",
      excerpt: "Congresso aprova medidas mais rigorosas para controle de defensivos",
      image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=800",
      time: "3d atrás",
      author: "Roberto Alves",
    },
    {
      id: 8,
      title: "União Europeia Revisa Tarifas de Importação Agrícola",
      category: "GeoPolitica",
      excerpt: "Decisão pode impactar exportações brasileiras de carne e grãos",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      time: "3d atrás",
      author: "Juliana Rocha",
    },
  ];

  const filteredNews = selectedCategory === "Todas" 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Agronews
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Últimas notícias do agronegócio
          </p>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* News List */}
      <section className="px-4 py-6">
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex gap-3 p-3">
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary/10 rounded text-primary">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
                    {news.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground">Por {news.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-medium">Serviços</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center gap-1 text-primary">
            <Newspaper className="w-5 h-5" />
            <span className="text-[10px] font-medium">Notícias</span>
          </Link>
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

export default News;
