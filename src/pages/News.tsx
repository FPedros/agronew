import { Home, TrendingUp, Newspaper, Video, Menu, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = ["Todas", "Política", "Inovação", "Clima", "GeoPolitica"];

  const newsData = [
    {
      id: 1,
      title: "Brasil registra safra histórica de milho em meio a desafios",
      category: "Inovação",
      excerpt: "Segunda safra de milho atinge 123,3 milhões de toneladas em cenário promissor para o agronegócio brasileiro",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      time: "2h atrás",
      author: "Rally da Safra",
    },
    {
      id: 2,
      title: "Em cenário de incertezas com gripe aviária, Brasil pode colher recorde de milho",
      category: "Política",
      excerpt: "Brasil pode colher recorde de 112,9 milhões de toneladas de milho na segunda safra, aponta Agroconsult",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
      time: "5h atrás",
      author: "Agroconsult",
    },
    {
      id: 3,
      title: "Rally da Safra inicia etapa algodão e avalia condições da safra 2024/25",
      category: "Clima",
      excerpt: "Equipes percorrem principais polos produtores da Bahia e Mato Grosso para mapear condições e perspectivas da cultura",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
      time: "8h atrás",
      author: "Rally da Safra",
    },
    {
      id: 4,
      title: "União Europeia revisa tarifas de importação agrícola",
      category: "GeoPolitica",
      excerpt: "Decisão pode impactar exportações brasileiras de commodities e alterar dinâmica comercial global",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800",
      time: "1d atrás",
      author: "Análise de Mercado",
    },
    {
      id: 5,
      title: "25 anos de Agroconsult: excelência e confiança que transformam o agronegócio",
      category: "Inovação",
      excerpt: "Empresa completa 25 anos oferecendo consultoria estratégica e soluções inovadoras para o setor agrícola brasileiro",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      time: "1d atrás",
      author: "Agroconsult",
    },
    {
      id: 6,
      title: "Rally no Centro-Oeste: conversas sobre safra, mercado e expectativas",
      category: "Clima",
      excerpt: "Equipe percorre Sudoeste de Goiás e Sudeste do Mato Grosso avaliando condições das lavouras e perspectivas de produção",
      image: "https://images.unsplash.com/photo-1611270629569-8b357cb88996?w=800",
      time: "2d atrás",
      author: "Rally da Safra",
    },
    {
      id: 7,
      title: "Nova regulamentação para uso de defensivos agrícolas",
      category: "Política",
      excerpt: "Congresso aprova medidas mais rigorosas visando sustentabilidade e segurança alimentar",
      image: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=800",
      time: "3d atrás",
      author: "Política Agrícola",
    },
    {
      id: 8,
      title: "Brasil e China fortalecem parceria comercial agrícola",
      category: "GeoPolitica",
      excerpt: "Acordo bilateral visa aumentar exportações de soja, milho e outros produtos do agronegócio brasileiro",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      time: "3d atrás",
      author: "Comércio Exterior",
    },
    {
      id: 9,
      title: "Evento de encerramento da Etapa Milho revela resultados da safra 24/25",
      category: "Inovação",
      excerpt: "Depois de semanas em campo, Rally da Safra apresenta análise completa das principais regiões produtoras",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
      time: "4d atrás",
      author: "Rally da Safra",
    },
    {
      id: 10,
      title: "Mudanças climáticas exigem adaptação do calendário agrícola",
      category: "Clima",
      excerpt: "Pesquisadores alertam para necessidade de ajustes no plantio e manejo das culturas",
      image: "https://images.unsplash.com/photo-1611270629569-8b357cb88996?w=800",
      time: "5d atrás",
      author: "Pesquisa Agrícola",
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
