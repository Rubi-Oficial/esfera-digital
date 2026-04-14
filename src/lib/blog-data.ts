import { TrendingUp, Search, Palette, Megaphone, Code, BarChart3, Share2, Mail, DollarSign, Stethoscope, Scale, Leaf, Factory, Cannabis, Rocket, Hotel, UtensilsCrossed, SmilePlus, Building2, type LucideIcon } from "lucide-react";
import blogMarketing from "@/assets/blog-marketing.jpg";
import blogSeo from "@/assets/blog-seo.jpg";
import blogDesign from "@/assets/blog-design.jpg";
import blogStrategy from "@/assets/blog-strategy.jpg";
import blogCode from "@/assets/blog-code.jpg";
import blogAnalytics from "@/assets/blog-analytics.jpg";
import blogSocialMedia from "@/assets/blog-social-media.jpg";
import blogEmail from "@/assets/blog-email.jpg";
import blogPaidTraffic from "@/assets/blog-paid-traffic.jpg";
import blogSiteMedicos from "@/assets/blog-site-medicos.jpg";
import blogSiteAdvogados from "@/assets/blog-site-advogados.jpg";
import blogSiteAgronomos from "@/assets/blog-site-agronomos.jpg";
import blogSiteSiderurgicas from "@/assets/blog-site-siderurgicas.jpg";
import blogSiteCannabis from "@/assets/blog-site-cannabis.jpg";
import blogLandingProjetos from "@/assets/blog-landing-projetos.jpg";
import blogSitePousadas from "@/assets/blog-site-pousadas.jpg";
import blogSiteRestaurantes from "@/assets/blog-site-restaurantes.jpg";
import blogSiteDentistas from "@/assets/blog-site-dentistas.jpg";
import blogSiteImobiliarias from "@/assets/blog-site-imobiliarias.jpg";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  icon: LucideIcon;
  readTime: string;
  date: string;
  image: string;
  message: string;
  content: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "por-que-todo-negocio-precisa-de-um-site-profissional",
    title: "Por que todo negócio precisa de um site profissional em 2026",
    excerpt: "Descubra como um site estratégico pode triplicar seus leads e posicionar sua marca como referência no mercado digital.",
    category: "Presença Digital",
    icon: TrendingUp,
    readTime: "5 min",
    date: "10 Abr 2026",
    image: blogMarketing,
    message: "Olá, quero saber mais sobre criação de sites profissionais",
    content: [
      "Em 2026, ter um site profissional deixou de ser diferencial — é pré-requisito. Empresas sem presença digital própria perdem credibilidade antes mesmo do primeiro contato comercial. Estudos mostram que 87% dos consumidores pesquisam online antes de tomar qualquer decisão de compra.",
      "Um site estratégico funciona como seu melhor vendedor: trabalha 24 horas por dia, 7 dias por semana, sem férias e sem comissão. Ele transmite autoridade, gera confiança e captura leads qualificados de forma automatizada.",
      "A diferença entre um site amador e um profissional está na estratégia por trás do design. Um site profissional é construído com foco em conversão: cada elemento visual, cada texto e cada botão são posicionados para guiar o visitante até a ação desejada.",
      "Além da conversão, um site profissional é otimizado para mecanismos de busca (SEO), garantindo que sua empresa apareça quando potenciais clientes procuram por seus serviços no Google. Isso significa tráfego orgânico — visitantes que chegam sem que você precise investir em anúncios.",
      "Outro fator crucial é a velocidade de carregamento e a experiência mobile. Em 2026, mais de 70% do tráfego web vem de dispositivos móveis. Um site que demora para carregar ou não funciona bem no celular perde visitantes e, consequentemente, vendas.",
      "Investir em um site profissional é investir no ativo mais valioso do seu marketing digital: a sua casa própria na internet. Diferente das redes sociais, onde você é apenas inquilino sujeito a mudanças de algoritmo, seu site é seu — e ninguém pode tirar isso de você.",
    ],
  },
  {
    slug: "seo-para-pequenas-empresas-guia-completo",
    title: "SEO para pequenas empresas: guia completo para aparecer no Google",
    excerpt: "Estratégias práticas de otimização que qualquer empresa pode aplicar para conquistar as primeiras posições no Google.",
    category: "SEO",
    icon: Search,
    readTime: "8 min",
    date: "05 Abr 2026",
    image: blogSeo,
    message: "Olá, quero saber mais sobre SEO para minha empresa",
    content: [
      "SEO (Search Engine Optimization) é o conjunto de técnicas que fazem seu site aparecer nas primeiras posições do Google. Para pequenas empresas, dominar o SEO local pode ser a diferença entre ser encontrado ou ficar invisível para potenciais clientes.",
      "O primeiro passo é a pesquisa de palavras-chave. Identifique os termos que seus clientes usam para buscar seus serviços. Ferramentas como Google Keyword Planner e Ubersuggest são gratuitas e extremamente úteis para essa etapa.",
      "A otimização on-page é fundamental: títulos otimizados (H1, H2, H3), meta descriptions atrativas, URLs amigáveis e conteúdo de qualidade que responda às dúvidas dos seus clientes. Cada página do seu site deve focar em um tema específico.",
      "O SEO técnico garante que o Google consiga ler e indexar seu site corretamente. Isso inclui sitemap XML, robots.txt, dados estruturados (Schema.org), velocidade de carregamento e certificado SSL (HTTPS).",
      "Para negócios locais, o Google Meu Negócio é obrigatório. Preencha todas as informações, adicione fotos reais, responda avaliações e mantenha horários atualizados. Isso impacta diretamente sua visibilidade nas buscas locais e no Google Maps.",
      "Backlinks — links de outros sites apontando para o seu — são um dos fatores mais importantes de ranqueamento. Busque parcerias, publique conteúdo relevante e apareça em diretórios do seu segmento para construir autoridade.",
      "SEO é um investimento de médio a longo prazo, mas os resultados são duradouros. Enquanto anúncios param de gerar tráfego quando você para de pagar, um bom SEO continua trazendo visitantes qualificados por meses e até anos.",
    ],
  },
  {
    slug: "design-que-converte-como-estetica-influencia-vendas",
    title: "Design que converte: como a estética influencia suas vendas",
    excerpt: "Entenda a psicologia por trás do design e como elementos visuais estratégicos podem aumentar suas conversões em até 200%.",
    category: "Design & UX",
    icon: Palette,
    readTime: "6 min",
    date: "28 Mar 2026",
    image: blogDesign,
    message: "Olá, quero um site com design que converte",
    content: [
      "O design do seu site não é apenas sobre aparência — é sobre resultados. Estudos de neuromarketing comprovam que visitantes formam uma opinião sobre sua marca em apenas 50 milissegundos. E essa primeira impressão é quase impossível de reverter.",
      "A hierarquia visual é o princípio mais importante do design que converte. Ela guia o olhar do visitante naturalmente pelos elementos da página, desde o título principal até o botão de ação. Sem hierarquia, o visitante se perde e abandona o site.",
      "Cores têm poder psicológico comprovado. Azul transmite confiança (usado por bancos e empresas de tecnologia), verde sugere crescimento e saúde, enquanto laranja e vermelho criam urgência. A escolha da paleta de cores deve refletir os valores da sua marca e os objetivos de conversão.",
      "Espaço em branco (whitespace) é um dos elementos mais subestimados do design. Ele melhora a legibilidade, destaca elementos importantes e transmite sofisticação. Sites que utilizam espaço em branco estrategicamente convertem até 20% mais.",
      "A tipografia impacta diretamente a percepção de profissionalismo. Fontes legíveis, tamanhos adequados e contraste suficiente garantem que sua mensagem seja lida e compreendida. Nunca use mais de 2-3 famílias tipográficas em um site.",
      "CTAs (Call-to-Action) são os elementos que efetivamente convertem visitantes em leads. Botões com cores contrastantes, textos orientados à ação e posicionamento estratégico podem aumentar suas conversões significativamente.",
    ],
  },
  {
    slug: "marketing-digital-para-iniciantes-por-onde-comecar",
    title: "Marketing digital para iniciantes: por onde começar",
    excerpt: "Um roteiro claro para empresas que estão dando os primeiros passos no marketing digital e querem resultados rápidos.",
    category: "Marketing Digital",
    icon: Megaphone,
    readTime: "7 min",
    date: "20 Mar 2026",
    image: blogStrategy,
    message: "Olá, quero começar no marketing digital",
    content: [
      "O marketing digital pode parecer complexo para quem está começando, mas com o roteiro certo, qualquer empresa pode construir uma presença digital sólida e gerar resultados em poucas semanas.",
      "O primeiro passo é definir seu público-alvo com clareza. Quem são seus clientes ideais? Quais problemas eles enfrentam? Onde eles passam tempo online? Sem essas respostas, qualquer estratégia será tiro no escuro.",
      "Seu site é a base de toda estratégia digital. Antes de investir em anúncios ou redes sociais, garanta que você tem um site profissional, otimizado e preparado para converter visitantes em clientes.",
      "Google Meu Negócio é gratuito e indispensável para negócios locais. Configure seu perfil completo, adicione fotos, responda avaliações e publique atualizações regularmente. Muitas empresas conseguem seus primeiros clientes apenas com essa ferramenta.",
      "Redes sociais devem ser escolhidas estrategicamente. Não tente estar em todas — escolha 2-3 plataformas onde seu público está. Para B2B, LinkedIn é essencial. Para B2C, Instagram e Facebook ainda dominam. TikTok cresce rapidamente em todos os segmentos.",
      "E-mail marketing continua sendo o canal com maior ROI do marketing digital. Comece capturando e-mails no seu site com uma oferta de valor (e-book, checklist, desconto) e nutra esses contatos com conteúdo relevante.",
      "Métricas são fundamentais desde o início. Configure o Google Analytics no seu site e acompanhe: visitantes, taxa de conversão, origem do tráfego e comportamento dos usuários. Dados orientam decisões e evitam desperdício de recursos.",
    ],
  },
  {
    slug: "landing-page-vs-site-institucional-qual-escolher",
    title: "Landing page vs site institucional: qual escolher?",
    excerpt: "Entenda as diferenças, vantagens e quando usar cada tipo de página para maximizar seus resultados online.",
    category: "Desenvolvimento Web",
    icon: Code,
    readTime: "4 min",
    date: "15 Mar 2026",
    image: blogCode,
    message: "Olá, quero entender a diferença entre landing page e site",
    content: [
      "Landing page e site institucional são ferramentas diferentes para objetivos diferentes. Entender quando usar cada uma é fundamental para maximizar o retorno do seu investimento em marketing digital.",
      "Uma landing page é uma página única com um objetivo específico: converter visitantes em leads ou clientes. Ela remove todas as distrações (menu, links, informações extras) e foca 100% em uma única ação — preencher um formulário, fazer uma compra ou agendar uma reunião.",
      "O site institucional é uma estrutura mais completa que apresenta sua empresa de forma abrangente. Com múltiplas páginas (sobre, serviços, portfólio, contato, blog), ele constrói credibilidade, melhora o SEO e atende diferentes perfis de visitantes.",
      "Quando usar landing page: campanhas de tráfego pago, lançamentos de produtos, promoções temporárias, captação de leads para eventos ou webinars. A simplicidade e foco da landing page resultam em taxas de conversão até 5x maiores que páginas convencionais.",
      "Quando usar site institucional: quando você precisa de presença digital completa, ranqueamento orgânico no Google, múltiplos pontos de contato e construção de autoridade de marca a longo prazo.",
      "A melhor estratégia? Ter ambos. O site institucional como base da sua presença digital e landing pages específicas para campanhas pontuais. Essa combinação maximiza tanto a autoridade da marca quanto a conversão direta.",
    ],
  },
  {
    slug: "como-medir-roi-do-seu-site-metricas-essenciais",
    title: "Como medir o ROI do seu site: métricas essenciais",
    excerpt: "Aprenda a acompanhar os indicadores certos para provar que seu investimento em presença digital está gerando retorno.",
    category: "Analytics",
    icon: BarChart3,
    readTime: "6 min",
    date: "08 Mar 2026",
    image: blogAnalytics,
    message: "Olá, quero entender o ROI do meu site",
    content: [
      "Muitas empresas investem em um site profissional mas não sabem medir se o investimento está gerando retorno. Acompanhar as métricas certas transforma seu site de um custo em um investimento mensurável.",
      "A taxa de conversão é a métrica mais importante. Ela indica quantos visitantes realizam a ação desejada (preencher formulário, ligar, enviar mensagem no WhatsApp). A média de mercado é 2-3%, mas sites otimizados podem alcançar 5-10%.",
      "O tráfego orgânico mostra quantas pessoas encontram seu site via Google sem anúncios pagos. Esse número deve crescer consistentemente ao longo dos meses se seu SEO estiver funcionando. É o tráfego mais valioso por ser gratuito e qualificado.",
      "O custo por lead (CPL) é calculado dividindo seu investimento total pelo número de leads gerados. Compare esse valor com o CPL de outros canais (anúncios, indicações) para entender a eficiência do seu site como ferramenta de aquisição.",
      "O tempo médio na página e a taxa de rejeição indicam a qualidade do conteúdo e da experiência do usuário. Se visitantes saem rápido, algo no design, conteúdo ou velocidade precisa ser ajustado.",
      "Para calcular o ROI final: (Receita gerada pelo site - Investimento) / Investimento × 100. Considere que um site profissional gera resultados por anos, então o ROI tende a crescer exponencialmente com o tempo.",
    ],
  },
  {
    slug: "redes-sociais-para-empresas-estrategias-que-funcionam",
    title: "Redes sociais para empresas: estratégias que realmente funcionam em 2026",
    excerpt: "Descubra como usar Instagram, LinkedIn e TikTok de forma estratégica para gerar autoridade, engajamento e vendas para sua empresa.",
    category: "Redes Sociais",
    icon: Share2,
    readTime: "7 min",
    date: "01 Mar 2026",
    image: blogSocialMedia,
    message: "Olá, quero melhorar a presença da minha empresa nas redes sociais",
    content: [
      "Redes sociais não são apenas vitrines — são canais estratégicos de relacionamento, autoridade e vendas. Em 2026, empresas que tratam redes sociais como 'obrigação' perdem para aquelas que as usam como ferramenta de negócio.",
      "O erro mais comum é estar em todas as plataformas sem estratégia. O segredo é escolher 2-3 redes onde seu público realmente está e dominar cada uma delas. Para B2B, LinkedIn é indispensável. Para B2C visual, Instagram lidera. TikTok cresce em todos os segmentos com conteúdo autêntico.",
      "Conteúdo de valor supera conteúdo promocional. A regra 80/20 continua válida: 80% do seu conteúdo deve educar, inspirar ou entreter, e apenas 20% deve vender diretamente. Empresas que só postam sobre si mesmas perdem seguidores rapidamente.",
      "Consistência é mais importante que frequência. É melhor postar 3 vezes por semana com qualidade do que diariamente com conteúdo genérico. Crie um calendário editorial mensal e mantenha uma identidade visual coerente em todos os posts.",
      "Stories e Reels são os formatos com maior alcance orgânico atualmente. Vídeos curtos, bastidores, depoimentos de clientes e tutoriais rápidos geram até 3x mais engajamento que posts estáticos no feed.",
      "Métricas que importam: taxa de engajamento (não apenas curtidas), alcance de não-seguidores, cliques no link da bio, mensagens diretas recebidas e, principalmente, leads e vendas geradas. Número de seguidores é métrica de vaidade — foque em conversão.",
      "Social selling é a evolução natural: use as redes para iniciar conversas, construir relacionamentos e direcionar prospects para seu site ou WhatsApp. O funil começa no conteúdo e termina na venda consultiva.",
    ],
  },
  {
    slug: "email-marketing-guia-completo-para-converter-mais",
    title: "E-mail marketing: guia completo para converter mais em 2026",
    excerpt: "Aprenda a criar campanhas de e-mail que geram até 4200% de ROI com automação, segmentação e conteúdo estratégico.",
    category: "E-mail Marketing",
    icon: Mail,
    readTime: "8 min",
    date: "22 Fev 2026",
    image: blogEmail,
    message: "Olá, quero implementar e-mail marketing na minha empresa",
    content: [
      "O e-mail marketing continua sendo o canal digital com maior ROI: em média, cada R$1 investido gera R$42 de retorno. Em 2026, com a inteligência artificial integrada às plataformas, os resultados são ainda mais expressivos para quem domina a estratégia.",
      "Tudo começa com a construção da lista. Nunca compre listas de e-mails — além de ser ilegal (LGPD), a taxa de conversão é praticamente zero. Crie iscas digitais de valor: e-books, checklists, webinars, descontos exclusivos. O visitante troca o e-mail por algo que resolve um problema real.",
      "Segmentação é o que separa e-mail marketing profissional de spam. Divida sua lista por interesses, comportamento de compra, estágio no funil e engajamento. Uma mensagem personalizada para 100 pessoas converte mais que uma genérica para 10.000.",
      "Automação de e-mails é indispensável. Configure sequências automáticas: boas-vindas para novos inscritos, nutrição de leads, carrinho abandonado, pós-venda e reativação de inativos. Essas automações trabalham 24/7 gerando resultados enquanto você foca em outras áreas.",
      "O assunto do e-mail determina se ele será aberto. Mantenha entre 30-50 caracteres, use urgência com moderação, personalize com o nome do destinatário e evite palavras que ativam filtros de spam (grátis, promoção, clique aqui). Teste A/B é obrigatório.",
      "Design responsivo é essencial — 60% dos e-mails são lidos no celular. Use templates limpos, um CTA principal por e-mail, imagens otimizadas e sempre inclua uma versão em texto puro. A simplicidade converte mais que layouts elaborados.",
      "Métricas-chave: taxa de abertura (média saudável: 20-30%), taxa de clique (2-5%), taxa de conversão, taxa de descadastro (abaixo de 0.5%) e receita por e-mail. Acompanhe semanalmente e ajuste sua estratégia com base nos dados.",
    ],
  },
  {
    slug: "trafego-pago-como-investir-com-inteligencia",
    title: "Tráfego pago: como investir com inteligência e maximizar resultados",
    excerpt: "Guia prático sobre Google Ads e Meta Ads para empresas que querem escalar vendas com anúncios online de forma rentável.",
    category: "Tráfego Pago",
    icon: DollarSign,
    readTime: "9 min",
    date: "15 Fev 2026",
    image: blogPaidTraffic,
    message: "Olá, quero investir em tráfego pago para minha empresa",
    content: [
      "Tráfego pago é o acelerador do marketing digital. Enquanto SEO e conteúdo orgânico constroem resultados a longo prazo, anúncios pagos geram leads e vendas desde o primeiro dia — quando bem executados. A chave é investir com estratégia, não com impulso.",
      "Google Ads é ideal para capturar demanda existente. Quando alguém pesquisa 'dentista em São Paulo' ou 'empresa de contabilidade', essa pessoa já tem intenção de compra. Anúncios de pesquisa colocam sua empresa na frente dessas pessoas no momento exato da decisão.",
      "Meta Ads (Facebook e Instagram) é perfeito para gerar demanda. Com segmentação por interesses, comportamentos e lookalike audiences, você alcança pessoas que ainda não conhecem sua empresa mas têm o perfil do seu cliente ideal. É o canal mais poderoso para construção de marca e geração de leads.",
      "O funil de anúncios é crucial: não tente vender para quem nunca ouviu falar de você. Estruture em 3 etapas — Topo (awareness com conteúdo de valor), Meio (consideração com provas sociais e cases) e Fundo (conversão com ofertas diretas). Cada etapa tem criativos e mensagens diferentes.",
      "Orçamento inicial recomendado: comece com R$30-50/dia por plataforma durante 30 dias para coletar dados. Não julgue resultados na primeira semana — os algoritmos precisam de tempo para otimizar. Após o período de aprendizado, escale o que funciona e pause o que não converte.",
      "Criativos são responsáveis por 80% do resultado. Vídeos curtos (15-30 segundos) superam imagens estáticas. Use depoimentos reais, demonstrações do produto/serviço e CTAs claros. Teste pelo menos 3-5 variações de criativo por campanha.",
      "Landing pages dedicadas são obrigatórias para campanhas pagas. Nunca direcione anúncios para a home do site. Crie páginas específicas para cada campanha com mensagem alinhada ao anúncio, formulário simplificado e prova social. Isso pode dobrar sua taxa de conversão.",
      "Métricas essenciais: CPC (custo por clique), CPL (custo por lead), CPA (custo por aquisição), ROAS (retorno sobre investimento em anúncios) e LTV (valor vitalício do cliente). O ROAS mínimo aceitável para a maioria dos negócios é 3:1 — cada R$1 investido deve retornar pelo menos R$3.",
    ],
  },
];

export const getRelatedArticles = (currentSlug: string, count = 3): BlogArticle[] => {
  const current = blogArticles.find((a) => a.slug === currentSlug);
  if (!current) return blogArticles.slice(0, count);

  // Prioritize same category, then others
  const sameCategory = blogArticles.filter((a) => a.slug !== currentSlug && a.category === current.category);
  const others = blogArticles.filter((a) => a.slug !== currentSlug && a.category !== current.category);

  return [...sameCategory, ...others].slice(0, count);
};
