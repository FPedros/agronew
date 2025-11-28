import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const newsData: Record<string, any> = {
    "1": {
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
    "2": {
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
    "3": {
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
    "4": {
      title: "União Europeia revisa tarifas de importação agrícola",
      category: "GeoPolitica",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=1200",
      time: "1d atrás",
      author: "Análise de Mercado",
      content: `
        <p>A União Europeia anunciou revisão em suas tarifas de importação agrícola, movimento que pode impactar significativamente as exportações brasileiras de commodities.</p>
        
        <p>A decisão faz parte de uma estratégia mais ampla do bloco europeu de reposicionar sua política comercial agrícola, levando em conta questões ambientais e de sustentabilidade.</p>
        
        <h2>Impactos para o Brasil</h2>
        <p>O Brasil, como um dos principais fornecedores de produtos agrícolas para a Europa, poderá enfrentar mudanças nas condições de acesso ao mercado europeu, especialmente para soja, milho e carne bovina.</p>
        
        <p>Analistas estimam que o impacto pode variar entre 5% e 15% no volume de exportações, dependendo das tarifas finais estabelecidas.</p>
        
        <h2>Negociações em Curso</h2>
        <p>O governo brasileiro já iniciou conversas com representantes da União Europeia para negociar condições mais favoráveis e garantir a competitividade dos produtos nacionais.</p>
        
        <h2>Alternativas de Mercado</h2>
        <p>Diante deste cenário, produtores e exportadores brasileiros estão intensificando esforços para diversificar mercados, com foco em países asiáticos e do Oriente Médio.</p>
      `,
    },
    "5": {
      title: "25 anos de Agroconsult: excelência e confiança que transformam o agronegócio",
      category: "Inovação",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200",
      time: "1d atrás",
      author: "Agroconsult",
      content: `
        <p>Em 1997, o engenheiro agrônomo André Pessoa, recém-formado e apaixonado pelos desafios do campo, deu início a uma jornada que transformaria o cenário da consultoria agrícola no Brasil.</p>
        
        <p>Vinte e cinco anos depois, a Agroconsult se consolida como referência nacional em consultoria estratégica para o agronegócio, oferecendo soluções inovadoras e análises precisas que orientam decisões de milhares de produtores.</p>
        
        <h2>Trajetória de Sucesso</h2>
        <p>Ao longo dessas duas décadas e meia, a empresa desenvolveu metodologias próprias de análise de mercado, previsão de safras e gestão rural, sempre com foco na excelência técnica e na confiança dos clientes.</p>
        
        <p>O Rally da Safra, um dos projetos mais emblemáticos da Agroconsult, tornou-se referência no acompanhamento das principais culturas brasileiras, levando equipes técnicas a campo para avaliar in loco as condições das lavouras.</p>
        
        <h2>Inovação Constante</h2>
        <p>A empresa sempre esteve na vanguarda da incorporação de novas tecnologias ao trabalho de consultoria, utilizando imagens de satélite, modelagem climática e inteligência artificial para aprimorar suas análises.</p>
        
        <h2>Visão de Futuro</h2>
        <p>Para os próximos 25 anos, a Agroconsult projeta expandir sua atuação internacional e desenvolver novas soluções digitais que aproximem ainda mais a consultoria especializada dos produtores de todos os portes.</p>
      `,
    },
  };

  const article = newsData[id || "1"] || newsData["1"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
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
            className="prose prose-invert max-w-none text-sm leading-relaxed"
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
