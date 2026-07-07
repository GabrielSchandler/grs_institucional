// Fonte única de conteúdo do site. Tudo que aparece na página E nos dados
// estruturados (JSON-LD) sai daqui — evita divergência entre o que o visitante
// lê e o que o Google/IAs indexam.

export const CONTATO = {
  telefone: "(11) 94039-4084",
  telefoneE164: "+5511940394084",
  whatsappUrl:
    "https://wa.me/5511940394084?text=" +
    encodeURIComponent("Olá! Vim pelo site da GRS e gostaria de entender meu contrato."),
  email: "gerencia@grssolucao.com.br",
  endereco: {
    rua: "R. Evangelina, 321",
    bairro: "Vila Carrão",
    cidade: "São Paulo",
    uf: "SP",
    cep: "03421-000",
  },
  horario: "Segunda a sexta, das 9h às 18h",
  cnpj: "63.562.890/0001-45",
  instagram: "https://www.instagram.com/grssolucaoltda/",
  facebook: "https://www.facebook.com/profile.php?id=61584917309422",
};

export const SITE_URL = "https://www.grssolucao.com.br";

export const METRICAS = [
  { valor: "10+", rotulo: "anos de atuação" },
  { valor: "R$ 4,2M+", rotulo: "recuperados para clientes" },
  { valor: "Nacional", rotulo: "atendimento em todo o Brasil" },
];

export const SERVICOS = [
  {
    titulo: "Diagnóstico do contrato",
    descricao:
      "Lemos o contrato cláusula por cláusula para identificar juros e tarifas fora do que foi combinado.",
    icone: "/img/icone-diagnostico.png",
  },
  {
    titulo: "Cálculo do valor pago a mais",
    descricao:
      "Traduzimos a irregularidade em número — quanto saiu do seu bolso indevidamente, com base documentada.",
    icone: "/img/icone-calculo.png",
  },
  {
    titulo: "Negociação direta",
    descricao:
      "Quando é possível, resolvemos diretamente com a instituição financeira, sem processo judicial.",
    icone: "/img/icone-negociacao.png",
  },
  {
    titulo: "Ação revisional",
    descricao:
      "Quando a negociação não resolve, advogados parceiros entram com a ação revisional cabível.",
    icone: "/img/icone-acao-revisional.png",
  },
];

export const DEPOIMENTOS = [
  {
    nome: "Marcos Oliveira",
    contexto: "Cliente desde 2023",
    texto:
      "A GRS Soluções transformou minha situação financeira. Tinha uma dívida enorme com o banco e eles conseguiram uma redução de quase 60%. O atendimento foi profissional e humanizado do início ao fim.",
  },
  {
    nome: "Ana Paula Santos",
    contexto: "Financiamento de veículo · Cliente desde 2022",
    texto:
      "Estava pagando juros absurdos no meu financiamento de carro e não sabia o que fazer. A equipe da GRS analisou meu contrato e encontrou cobranças indevidas. Resultado: economizei mais de R$ 15.000.",
  },
  {
    nome: "Carla Mendes",
    contexto: "Empresária · Cliente desde 2021",
    texto:
      "Minha empresa estava sufocada por juros abusivos em contratos de leasing. A GRS Soluções não apenas reduziu nossa dívida, mas também nos educou para evitar situações semelhantes no futuro.",
  },
];

export const FAQ = [
  {
    pergunta: "O que são juros abusivos?",
    resposta:
      "Juros abusivos são taxas cobradas acima do permitido por lei ou muito acima da média de mercado. No Brasil, o Código de Defesa do Consumidor e o Banco Central estabelecem limites e parâmetros que os bancos devem respeitar. Quando esses limites são ultrapassados, o consumidor tem direito à revisão do contrato.",
  },
  {
    pergunta: "Como saber se estou pagando juros abusivos?",
    resposta:
      "Os sinais mais comuns incluem: parcelas que não diminuem com o tempo, taxa de juros mensal muito acima da média divulgada pelo Banco Central para a mesma modalidade, capitalização composta não autorizada e cobrança de tarifas não previstas no contrato. A forma mais segura de verificar é com uma análise técnica do contrato.",
  },
  {
    pergunta: "Quais contratos podem ser revisados?",
    resposta:
      "Praticamente todos os contratos financeiros: financiamento de veículos e imóveis, empréstimos pessoais, cartão de crédito, cheque especial, leasing, crédito consignado e capital de giro para empresas. A GRS atende pessoa física e pessoa jurídica.",
  },
  {
    pergunta: "Quanto tempo leva o processo de revisão?",
    resposta:
      "O prazo varia conforme o caso. Negociações extrajudiciais costumam ser resolvidas em 30 a 90 dias. Ações judiciais geralmente levam de 6 meses a 2 anos. Em situações urgentes, é possível pedir tutela antecipada para suspender cobranças enquanto o processo corre.",
  },
  {
    pergunta: "A análise inicial tem custo?",
    resposta:
      "Não. A análise inicial do contrato é feita sem custo e sem compromisso: você envia o documento, nossa equipe avalia e apresenta um entendimento técnico do que está sendo cobrado antes de qualquer decisão.",
  },
  {
    pergunta: "É possível suspender as cobranças durante o processo?",
    resposta:
      "Em muitos casos, sim. Por medida judicial (tutela antecipada) é possível suspender ou limitar cobranças durante o processo. Cada situação é avaliada individualmente para definir a melhor estratégia.",
  },
];

export const MANIFESTO =
  "A justiça financeira não é privilégio. É o direito de quem paga o preço certo — pessoa física, autônomo ou empresa.";
