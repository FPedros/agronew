import { Home, TrendingUp, Newspaper, Video, Menu, Filter, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserMenu } from "@/components/UserMenu";
import { useHasPremiumAccess } from "@/hooks/useSubscription";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const hasPremium = useHasPremiumAccess();

  const { data: newsData = [] } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const categories = ["Todas", ...Array.from(new Set(newsData.map(n => n.category)))];

  const filteredNews = selectedCategory === "Todas" 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="px-3 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent tracking-tight">
              Agronews
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">
              Últimas notícias do agronegócio
            </p>
          </div>
          <UserMenu />
        </div>

        {/* Categories */}
        <div className="px-3 pb-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
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
      <section className="px-3 py-4">
        <div className="space-y-3">
          {filteredNews.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="block relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary/30"
            >
              {news.is_premium && !hasPremium && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold z-10">
                  <Lock className="w-3 h-3" />
                  Premium
                </div>
              )}
              <div className="p-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={news.image_url}
                      alt={news.title}
                      className={`w-full h-full object-cover ${news.is_premium && !hasPremium ? 'opacity-50' : ''}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] uppercase bg-primary/10 rounded text-primary">
                        {news.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        {new Date(news.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold mb-1.5 line-clamp-2 leading-tight hover:text-primary transition-colors tracking-tight">
                      {news.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-1.5 leading-relaxed font-normal">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <img 
                        src={news.author_image_url} 
                        alt={news.author_name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[10px] text-muted-foreground font-normal">{news.author_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
          <Link to="/news" className="flex flex-col items-center gap-0.5 text-primary active:scale-95">
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

export default News;
