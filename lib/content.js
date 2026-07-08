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
    icone: "/img/icone-diagnostico.webp",
  },
  {
    titulo: "Cálculo do valor pago a mais",
    descricao:
      "Traduzimos a irregularidade em número — quanto saiu do seu bolso indevidamente, com base documentada.",
    icone: "/img/icone-calculo.webp",
  },
  {
    titulo: "Negociação direta",
    descricao:
      "Quando é possível, resolvemos diretamente com a instituição financeira, sem processo judicial.",
    icone: "/img/icone-negociacao.webp",
  },
  {
    titulo: "Ação revisional",
    descricao:
      "Quando a negociação não resolve, advogados parceiros entram com a ação revisional cabível.",
    icone: "/img/icone-acao-revisional.webp",
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
  {
    nome: "Roberto Fernandes",
    contexto: "Cliente desde 2023",
    texto:
      "Profissionalismo e transparência em cada etapa. A GRS Soluções me orientou sobre meus direitos e negociou com o banco de forma eficiente. Recomendo a todos que estejam com dívidas e não saibam o que fazer.",
  },
];

function DEPOIMENTO_POR_NOME(nome) {
  const found = DEPOIMENTOS.find((d) => d.nome === nome);
  if (!found) throw new Error(`Depoimento não encontrado: ${nome}`);
  return found;
}

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

// Conteúdo único de cada página de serviço — cada uma mira uma busca
// diferente ("revisão de financiamento de veículo", "...de imóvel",
// "...de empréstimo") em vez de competir pela mesma página única. Textos
// próprios, não repetidos entre si, pra evitar conteúdo duplicado.
export const PAGINAS_SERVICO = {
  "revisao-financiamento-veiculo": {
    slug: "revisao-financiamento-veiculo",
    tipoCurto: "financiamento de veículo",
    eyebrow: "Financiamento de veículo",
    metaTitle: "Revisão de Financiamento de Veículo | Juros Abusivos",
    metaDescription:
      "Análise técnica de contratos de financiamento de veículos. Identificamos juros abusivos, seguro prestamista embutido e tarifas indevidas. Consulta sem compromisso.",
    h1: "Seu financiamento de veículo pode estar com juros acima do que a lei permite.",
    intro:
      "O financiamento de veículo é um dos contratos mais revisados no Brasil — e um dos que mais concentra cobranças questionáveis. Entre taxas embutidas, seguros não solicitados e juros acima da média do mercado, é comum que o valor pago ao final do contrato seja bem maior do que deveria.",
    sinais: [
      {
        titulo: "Parcelas que não diminuem",
        texto: "Em contratos com amortização irregular, o saldo devedor demora a cair mesmo com os pagamentos em dia.",
      },
      {
        titulo: "Seguro prestamista embutido",
        texto: "Um seguro vinculado ao financiamento, cobrado junto com a parcela, muitas vezes sem explicação clara no momento da assinatura.",
      },
      {
        titulo: "Tarifa de gravame acima da média",
        texto: "A taxa cobrada para registrar o veículo como garantia do banco pode estar bem acima do praticado no mercado.",
      },
      {
        titulo: "Taxa de juros acima da média do Banco Central",
        texto: "O Banco Central publica mensalmente a taxa média de juros para financiamento de veículos — contratos muito acima dessa média são candidatos à revisão.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Ana Paula Santos")],
    faq: [
      {
        pergunta: "Posso revisar um financiamento de veículo que já foi quitado?",
        resposta: "Sim. Contratos já quitados também podem ser revisados — o prazo para questionar cobranças indevidas se estende por anos após o encerramento, e a análise segue o mesmo processo.",
      },
      {
        pergunta: "O carro pode ser tomado enquanto o contrato está sendo revisado?",
        resposta: "A revisão em si não impede a cobrança das parcelas durante o processo. Em casos com risco de busca e apreensão, é possível pedir medidas judiciais específicas para suspender a cobrança enquanto a análise corre.",
      },
      {
        pergunta: "Financiamento de moto ou caminhão também pode ser revisado?",
        resposta: "Sim — o processo de análise técnica é o mesmo para qualquer veículo financiado: carro, moto, caminhão ou máquina agrícola.",
      },
    ],
  },

  "revisao-financiamento-imovel": {
    slug: "revisao-financiamento-imovel",
    tipoCurto: "financiamento imobiliário",
    eyebrow: "Financiamento imobiliário",
    metaTitle: "Revisão de Financiamento Imobiliário | GRS Soluções",
    metaDescription:
      "Análise técnica de contratos de financiamento imobiliário. Verificamos sistema de amortização, correção monetária e seguros habitacionais cobrados a mais.",
    h1: "Financiamento de imóvel: um erro no sistema de amortização pode custar anos de parcela a mais.",
    intro:
      "Contratos de financiamento imobiliário costumam ter prazos longos — 20, 30, até 35 anos — e qualquer irregularidade pequena no início se multiplica ao longo do tempo. A análise técnica verifica se o sistema de amortização, a correção monetária e os seguros vinculados ao contrato estão de acordo com o que foi combinado.",
    sinais: [
      {
        titulo: "Sistema de amortização (SAC ou Price) aplicado errado",
        texto: "A forma como os juros incidem sobre o saldo devedor muda o valor total pago — um erro aqui afeta todas as parcelas do contrato.",
      },
      {
        titulo: "Correção monetária acima do índice correto",
        texto: "Contratos indexados por TR ou IPCA podem ter reajustes aplicados de forma incorreta ou acima do que consta no contrato.",
      },
      {
        titulo: "Seguro habitacional (MIP/DFI) fora do padrão",
        texto: "Esses seguros são obrigatórios, mas o valor cobrado precisa ser compatível com o saldo devedor e o valor do imóvel.",
      },
      {
        titulo: "Capitalização de juros não prevista em contrato",
        texto: "Juros sobre juros só são permitidos quando expressamente pactuados — quando não estão, a cobrança pode ser irregular.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Marcos Oliveira")],
    faq: [
      {
        pergunta: "Financiamento pela Caixa (SFH ou Minha Casa Minha Vida) pode ser revisado?",
        resposta: "Sim. Contratos de financiamento habitacional de qualquer instituição, inclusive programas com subsídio, podem passar por análise técnica.",
      },
      {
        pergunta: "Vale a pena revisar um financiamento com poucos anos rodados?",
        resposta: "Sim — quanto antes a irregularidade é identificada, menos tempo o erro tem para se acumular ao longo do contrato.",
      },
      {
        pergunta: "A revisão pode atrasar a quitação ou a escritura do imóvel?",
        resposta: "Não. A análise é feita em paralelo e não interfere no andamento normal do contrato com o banco.",
      },
    ],
  },

  "revisao-emprestimo": {
    slug: "revisao-emprestimo",
    tipoCurto: "empréstimo",
    eyebrow: "Empréstimo e crédito",
    metaTitle: "Revisão de Empréstimo Pessoal, Consignado e Cheque Especial",
    metaDescription:
      "Análise técnica de contratos de empréstimo pessoal, consignado, cheque especial e capital de giro. Identificamos juros e tarifas cobrados fora do combinado.",
    h1: "Empréstimo pessoal, consignado, cheque especial ou capital de giro: seu contrato pode ter cobrança fora do combinado.",
    intro:
      "Nem todo crédito é um financiamento de bem. Empréstimo pessoal, consignado, cheque especial, cartão de crédito e capital de giro para empresas também são contratos financeiros — e também podem conter juros e tarifas que vale a pena revisar tecnicamente, especialmente quando a taxa muda ao longo do tempo ou quando várias linhas de crédito se acumulam.",
    sinais: [
      {
        titulo: "Consignado com margem descontada indevidamente",
        texto: "Descontos que ultrapassam o limite legal da margem consignável no contracheque ou benefício.",
      },
      {
        titulo: "Cheque especial acima do teto legal",
        texto: "O Banco Central estabelece um teto de juros para o cheque especial — contratos acima desse limite são questionáveis.",
      },
      {
        titulo: "Juros rotativos do cartão de crédito",
        texto: "O rotativo do cartão está entre as modalidades de crédito mais caras do país; renegociações mal estruturadas podem perpetuar a dívida.",
      },
      {
        titulo: "Capital de giro (PJ) com garantias desproporcionais",
        texto: "Empresas que tomam capital de giro às vezes assumem garantias e encargos acima do praticado para o porte do negócio.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Carla Mendes"), DEPOIMENTO_POR_NOME("Roberto Fernandes")],
    faq: [
      {
        pergunta: "Empréstimo consignado pode ser revisado mesmo com desconto em folha?",
        resposta: "Sim. A revisão avalia a taxa de juros, os encargos e se a margem consignável descontada respeita o limite legal, independentemente do desconto já estar ativo em folha.",
      },
      {
        pergunta: "Empresa (PJ) também pode revisar contrato de capital de giro?",
        resposta: "Sim — a GRS atende pessoa física e jurídica. Capital de giro, antecipação de recebíveis e leasing empresarial também entram na análise técnica.",
      },
      {
        pergunta: "Tenho mais de um empréstimo ativo — dá para revisar todos juntos?",
        resposta: "Sim, é possível analisar múltiplos contratos na mesma avaliação, o que costuma dar uma visão mais clara do impacto total no orçamento.",
      },
    ],
  },
};
