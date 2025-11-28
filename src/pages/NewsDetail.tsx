import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const newsData: Record<string, any> = {
    "1": {
      title: "Tecnologia de Precisão Aumenta Produtividade em 40%",
      category: "Inovação",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
      time: "2h atrás",
      author: "João Silva",
      content: `
        <p>A agricultura de precisão está revolucionando o agronegócio brasileiro, com fazendas que adotaram essas tecnologias reportando aumentos de até 40% na produtividade.</p>
        
        <p>Sistemas de monitoramento por satélite, drones e sensores IoT permitem que produtores tomem decisões baseadas em dados em tempo real sobre irrigação, fertilização e controle de pragas.</p>
        
        <h2>Investimento em Tecnologia</h2>
        <p>O investimento inicial pode parecer alto, mas o retorno vem rapidamente. Produtores relatam economia de até 30% em insumos agrícolas enquanto aumentam a produção.</p>
        
        <p>"É uma mudança de paradigma completa", afirma João Silva, especialista em agrotecnologia. "Não estamos mais fazendo agricultura às cegas. Cada decisão é baseada em dados concretos."</p>
        
        <h2>Próximos Passos</h2>
        <p>O governo federal já sinalizou interesse em criar programas de incentivo para democratizar o acesso a essas tecnologias, especialmente para pequenos e médios produtores.</p>
      `,
    },
    "2": {
      title: "Novos Incentivos para Agricultura Sustentável",
      category: "Política",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200",
      time: "5h atrás",
      author: "Maria Santos",
      content: `
        <p>O governo federal anunciou hoje um novo programa de crédito verde destinado a pequenos e médios produtores rurais que adotarem práticas sustentáveis.</p>
        
        <p>O programa oferece taxas de juros reduzidas e prazos estendidos para investimentos em tecnologias limpas, sistemas de irrigação eficientes e energia renovável.</p>
        
        <h2>Detalhes do Programa</h2>
        <p>O crédito pode chegar a R$ 500 mil por produtor, com taxas de 3% ao ano e prazo de até 15 anos para pagamento.</p>
        
        <p>"É um passo importante para alinhar a agricultura brasileira com as melhores práticas ambientais globais", destacou a ministra da Agricultura.</p>
        
        <h2>Como Se Candidatar</h2>
        <p>As inscrições começam no próximo mês através do portal do governo. Produtores precisarão apresentar um plano de sustentabilidade aprovado por técnicos credenciados.</p>
      `,
    },
    "3": {
      title: "Previsão do Tempo: Chuvas Favoráveis para Próxima Semana",
      category: "Clima",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200",
      time: "8h atrás",
      author: "Pedro Costa",
      content: `
        <p>Um sistema meteorológico vindo do Pacífico promete trazer chuvas regulares para as principais regiões produtoras do país na próxima semana.</p>
        
        <p>Segundo meteorologistas, as precipitações devem ficar entre 40mm e 80mm, ideal para as culturas de soja e milho que estão em fase de desenvolvimento.</p>
        
        <h2>Impacto nas Safras</h2>
        <p>A chegada das chuvas é especialmente bem-vinda no Centro-Oeste, que vinha enfrentando um período de estiagem mais prolongado que o normal.</p>
        
        <p>"Essa chuva vai recuperar a umidade do solo e dar fôlego para as plantas", explica Pedro Costa, agrometeorologista.</p>
        
        <h2>Recomendações</h2>
        <p>Produtores devem aproveitar para planejar aplicações de fertilizantes e defensivos, considerando a janela de tempo entre as chuvas.</p>
      `,
    },
  };

  const article = newsData[id || "1"] || newsData["1"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold">Notícia</h1>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Category & Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase bg-primary/10 rounded-full text-primary">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{article.time}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Share Button */}
          <button className="mb-6 flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>

          {/* Article Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: '1rem',
              lineHeight: '1.75',
            }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Tags relacionadas</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs bg-muted rounded-full">Agronegócio</span>
              <span className="px-3 py-1 text-xs bg-muted rounded-full">{article.category}</span>
              <span className="px-3 py-1 text-xs bg-muted rounded-full">Tecnologia</span>
              <span className="px-3 py-1 text-xs bg-muted rounded-full">Brasil</span>
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/news"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Notícias
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
