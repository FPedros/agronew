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
      author: "Redação Agronews",
      content: `
        <p>A agricultura de precisão está revolucionando o agronegócio brasileiro, com fazendas que adotaram essas tecnologias reportando aumentos de até 40% na produtividade.</p>
        
        <p>Sistemas de monitoramento por satélite, drones e sensores IoT permitem que produtores tomem decisões baseadas em dados em tempo real sobre irrigação, fertilização e controle de pragas.</p>
        
        <h2>Investimento em Tecnologia</h2>
        <p>O investimento inicial pode parecer alto, mas o retorno vem rapidamente. Produtores relatam economia de até 30% em insumos agrícolas enquanto aumentam a produção.</p>
        
        <p>"É uma mudança de paradigma completa", afirma especialista em agrotecnologia. "Não estamos mais fazendo agricultura às cegas. Cada decisão é baseada em dados concretos."</p>
        
        <h2>Próximos Passos</h2>
        <p>O governo federal já sinalizou interesse em criar programas de incentivo para democratizar o acesso a essas tecnologias, especialmente para pequenos e médios produtores.</p>
      `,
    },
    "2": {
      title: "Novos Incentivos para Agricultura Sustentável",
      category: "Política",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200",
      time: "5h atrás",
      author: "Redação Agronews",
      content: `
        <p>O governo federal anunciou um novo programa de crédito verde destinado a pequenos e médios produtores rurais que adotarem práticas sustentáveis.</p>
        
        <p>O programa oferece taxas de juros reduzidas e prazos estendidos para investimentos em tecnologias limpas, sistemas de irrigação eficientes e energia renovável.</p>
        
        <h2>Detalhes do Programa</h2>
        <p>O crédito pode chegar a R$ 500 mil por produtor, com taxas de 3% ao ano e prazo de até 15 anos para pagamento.</p>
        
        <p>"É um passo importante para alinhar a agricultura brasileira com as melhores práticas ambientais globais", destacou o ministro da Agricultura.</p>
        
        <h2>Como Se Candidatar</h2>
        <p>As inscrições começam no próximo mês através do portal do governo. Produtores precisarão apresentar um plano de sustentabilidade aprovado por técnicos credenciados.</p>
      `,
    },
    "3": {
      title: "Previsão do Tempo: Chuvas Favoráveis para Próxima Semana",
      category: "Clima",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200",
      time: "8h atrás",
      author: "Redação Agronews",
      content: `
        <p>Um sistema meteorológico vindo do Pacífico promete trazer chuvas regulares para as principais regiões produtoras do país na próxima semana.</p>
        
        <p>Segundo meteorologistas, as precipitações devem ficar entre 40mm e 80mm, ideal para as culturas de soja e milho que estão em fase de desenvolvimento.</p>
        
        <h2>Impacto nas Safras</h2>
        <p>A chegada das chuvas é especialmente bem-vinda no Centro-Oeste, que vinha enfrentando um período de estiagem mais prolongado que o normal.</p>
        
        <p>"Essa chuva vai recuperar a umidade do solo e dar fôlego para as plantas", explica agrometeorologista especializado.</p>
        
        <h2>Recomendações</h2>
        <p>Produtores devem aproveitar para planejar aplicações de fertilizantes e defensivos, considerando a janela de tempo entre as chuvas.</p>
      `,
    },
    "4": {
      title: "Brasil registra safra histórica de milho em meio a desafios",
      category: "Inovação",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
      time: "2h atrás",
      author: "Rally da Safra",
      content: `
        <p>O Brasil está prestes a colher uma das maiores safras de milho da história, com a segunda safra atingindo impressionantes 123,3 milhões de toneladas, segundo avaliação do Rally da Safra.</p>
        
        <p>As impressões iniciais captadas durante as visitas às principais regiões produtoras indicam um cenário promissor para o agronegócio brasileiro, mesmo diante de desafios climáticos e econômicos.</p>
        
        <h2>Fatores de Sucesso</h2>
        <p>O aumento da área plantada, combinado com condições climáticas favoráveis nas principais regiões produtoras do Centro-Oeste e Sul do Brasil, contribuiu significativamente para este resultado histórico.</p>
        
        <p>Tecnologias de precisão e manejo adequado das lavouras também foram determinantes para as altas produtividades registradas nas visitas de campo realizadas pelas equipes do Rally da Safra.</p>
        
        <h2>Impacto no Mercado</h2>
        <p>Esta safra recorde fortalece a posição do Brasil como um dos maiores exportadores mundiais de milho, abrindo novas oportunidades comerciais e consolidando o país no cenário internacional do agronegócio.</p>
        
        <h2>Perspectivas Futuras</h2>
        <p>Especialistas destacam que a manutenção desses resultados dependerá de investimentos contínuos em tecnologia, infraestrutura e políticas de apoio ao produtor rural.</p>
      `,
    },
    "5": {
      title: "Em cenário de incertezas com gripe aviária, Brasil pode colher recorde de milho",
      category: "Política",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200",
      time: "5h atrás",
      author: "Agroconsult",
      content: `
        <p>Mesmo em um cenário marcado por incertezas relacionadas à gripe aviária, o Brasil está projetado para colher um recorde de 112,9 milhões de toneladas de milho na segunda safra, segundo avaliação da Agroconsult.</p>
        
        <p>O crescimento da área plantada e as boas produtividades esperadas nas lavouras são os principais fatores que sustentam esta estimativa otimista.</p>
        
        <h2>Contexto da Gripe Aviária</h2>
        <p>A gripe aviária tem gerado preocupação no setor devido ao seu impacto potencial na demanda por milho, um dos principais insumos da avicultura. No entanto, as medidas de controle sanitário têm se mostrado eficazes.</p>
        
        <p>Durante a nova etapa do Rally da Safra, técnicos avaliarão in loco as condições das lavouras e conversarão com produtores para entender melhor as perspectivas e desafios da safra.</p>
        
        <h2>Oportunidades de Exportação</h2>
        <p>Com a produção elevada, o Brasil tem oportunidade de ampliar sua participação no mercado internacional, especialmente em países asiáticos e do Oriente Médio.</p>
        
        <h2>Recomendações</h2>
        <p>Especialistas recomendam que produtores mantenham atenção aos protocolos sanitários e busquem diversificar canais de comercialização para maximizar a rentabilidade da safra.</p>
      `,
    },
    "6": {
      title: "Rally da Safra inicia etapa algodão e avalia condições da safra 2024/25",
      category: "Clima",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200",
      time: "8h atrás",
      author: "Rally da Safra",
      content: `
        <p>Começou mais uma etapa do Rally da Safra, desta vez focada na cultura do algodão. Equipes especializadas percorrem os principais polos produtores da Bahia e Mato Grosso para mapear condições e perspectivas da safra 2024/25.</p>
        
        <p>O algodão brasileiro tem ganhado cada vez mais destaque no cenário global, com crescimento consistente tanto em área plantada quanto em qualidade do produto final.</p>
        
        <h2>Condições das Lavouras</h2>
        <p>As primeiras impressões indicam lavouras bem desenvolvidas, com bom stand de plantas e manejo adequado nas principais regiões visitadas.</p>
        
        <p>No oeste da Bahia, os técnicos observaram desenvolvimento uniforme das plantas, enquanto no Mato Grosso, o cenário é de otimismo moderado devido às condições climáticas favoráveis.</p>
        
        <h2>Desafios e Oportunidades</h2>
        <p>Entre os principais desafios citados pelos produtores estão o custo elevado dos insumos e a necessidade de manejo integrado de pragas, especialmente o bicudo-do-algodoeiro.</p>
        
        <p>Por outro lado, os preços internacionais atrativos e a demanda crescente por fibras de qualidade criam oportunidades para os produtores brasileiros.</p>
        
        <h2>Próximos Passos</h2>
        <p>O Rally da Safra continuará suas visitas pelas próximas semanas, com evento de apresentação dos resultados previsto para o final da etapa, quando serão divulgadas as estimativas oficiais de produção.</p>
      `,
    },
  };

  const article = newsData[id || "1"] || newsData["1"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="px-3 py-3 flex items-center gap-3">
          <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-base font-bold">Notícia</h1>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        <div className="w-full h-52 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-3 py-4">
          {/* Category & Meta */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase bg-primary/10 rounded-full text-primary">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{article.time}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Share Button */}
          <button className="mb-4 flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all active:scale-95">
            <Share2 className="w-3.5 h-3.5" />
            Compartilhar
          </button>

          {/* Article Content */}
          <div 
            className="prose prose-slate max-w-none text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-xs font-semibold mb-2 text-muted-foreground">Tags relacionadas</h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 text-[10px] bg-muted rounded-full">Agronegócio</span>
              <span className="px-2.5 py-1 text-[10px] bg-muted rounded-full">{article.category}</span>
              <span className="px-2.5 py-1 text-[10px] bg-muted rounded-full">Tecnologia</span>
              <span className="px-2.5 py-1 text-[10px] bg-muted rounded-full">Brasil</span>
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/news"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all active:scale-95"
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
