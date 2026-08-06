// Fonte única de conteúdo do site. Tudo que aparece na página E nos dados
// estruturados (JSON-LD) sai daqui — evita divergência entre o que o visitante
// lê e o que o Google/IAs indexam.

export const CONTATO = {
  telefone: "(11) 94039-4084",
  telefoneE164: "+5511940394084",
  telefoneFixo: "(11) 2941-6796",
  telefoneFixoE164: "+551129416796",
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

// O assetPrefix do next.config vale só pros chunks do Next — o `src` do
// next/image não passa por ele. Por isso as imagens usam URL absoluta: assim
// funcionam também quando o site é servido em subcaminho no GitHub Pages.
// Em desenvolvimento isso apontaria pro site em produção, e imagem de artigo
// ainda não publicado apareceria quebrada na revisão local. Daí o caminho
// relativo no dev.
export const ASSET_BASE =
  process.env.NODE_ENV === "development" ? "" : SITE_URL;

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
    icone: `${SITE_URL}/img/icone-diagnostico.webp`,
  },
  {
    titulo: "Cálculo do valor pago a mais",
    descricao:
      "Traduzimos a irregularidade em número — quanto saiu do seu bolso indevidamente, com base documentada.",
    icone: `${SITE_URL}/img/icone-calculo.webp`,
  },
  {
    titulo: "Negociação direta",
    descricao:
      "Quando é possível, resolvemos diretamente com a instituição financeira, sem processo judicial.",
    icone: `${SITE_URL}/img/icone-negociacao.webp`,
  },
  {
    titulo: "Ação revisional",
    descricao:
      "Quando a negociação não resolve, advogados parceiros entram com a ação revisional cabível.",
    icone: `${SITE_URL}/img/icone-acao-revisional.webp`,
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

export const CALCULADORA_FAQ = [
  {
    pergunta: "A calculadora já mostra o valor que posso recuperar?",
    resposta:
      "Não. A pré-avaliação organiza os dados do seu contrato numa mensagem pro WhatsApp — o valor exato só sai depois da análise técnica feita pela nossa equipe.",
  },
  {
    pergunta: "Preciso enviar o contrato junto?",
    resposta:
      "Não é obrigatório nesse primeiro passo. Depois do contato, nossa equipe indica se e como enviar o contrato para a análise completa.",
  },
];

// Conteúdo único de cada página de serviço — cada uma mira uma busca
// diferente ("revisão de financiamento de veículo", "...de imóvel",
// "...de empréstimo") em vez de competir pela mesma página única. Textos
// próprios, não repetidos entre si, pra evitar conteúdo duplicado.
export const PAGINAS_SERVICO = {
  "revisao-financiamento-veiculo": {
    slug: "revisao-financiamento-veiculo",
    categoriasBlog: ["financiamento-de-veiculo", "busca-e-apreensao"],
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
    categoriasBlog: ["financiamento-imobiliario"],
    tipoCurto: "financiamento imobiliário",
    eyebrow: "Financiamento imobiliário",
    metaTitle: "Revisão de Financiamento Imobiliário",
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
    categoriasBlog: ["educacao-financeira", "direitos-do-consumidor-bancario"],
    tipoCurto: "empréstimo",
    eyebrow: "Empréstimo e crédito",
    metaTitle: "Revisão de Empréstimo Pessoal e Cheque Especial",
    metaDescription:
      "Análise técnica de contratos de empréstimo pessoal, cheque especial e cartão de crédito. Identificamos juros e tarifas cobrados fora do combinado.",
    h1: "Empréstimo pessoal, cheque especial ou cartão de crédito: seu contrato pode ter cobrança fora do combinado.",
    intro:
      "Nem todo crédito é um financiamento de bem. Empréstimo pessoal, cheque especial e cartão de crédito também são contratos financeiros — e também podem conter juros e tarifas que vale a pena revisar tecnicamente, especialmente quando a taxa muda ao longo do tempo, o contrato é renegociado ou várias linhas de crédito se acumulam. (Consignado e crédito para empresa têm páginas próprias, com critérios específicos de cada modalidade.)",
    sinais: [
      {
        titulo: "Cheque especial acima do teto legal",
        texto: "O Banco Central estabelece um teto de juros para o cheque especial — contratos acima desse limite são questionáveis.",
      },
      {
        titulo: "Juros rotativos do cartão de crédito",
        texto: "O rotativo do cartão está entre as modalidades de crédito mais caras do país; renegociações mal estruturadas podem perpetuar a dívida.",
      },
      {
        titulo: "Renegociação que embute juros antigos no novo saldo",
        texto: "Ao renegociar uma dívida, é comum que juros e encargos anteriores sejam incorporados ao novo saldo sem destaque — dificultando enxergar quanto do valor atual é, na prática, juros sobre juros.",
      },
      {
        titulo: "Empréstimo pessoal com taxa muito acima da média do seu perfil",
        texto: "O Banco Central publica a taxa média de juros por modalidade de crédito — contratos que destoam muito dessa média são candidatos à revisão técnica.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Roberto Fernandes")],
    faq: [
      {
        pergunta: "Renegociei minha dívida e agora o saldo está maior — isso pode ser revisado?",
        resposta: "Sim. Renegociações que incorporam juros e encargos anteriores ao novo saldo sem transparência também podem ser objeto de análise técnica.",
      },
      {
        pergunta: "Cheque especial e cartão de crédito têm o mesmo tipo de revisão que um empréstimo pessoal?",
        resposta: "O princípio é o mesmo — verificar se a taxa aplicada e os encargos cobrados respeitam o limite legal e o que foi contratado —, mas os parâmetros de referência mudam conforme a modalidade.",
      },
      {
        pergunta: "Tenho mais de um empréstimo ativo — dá para revisar todos juntos?",
        resposta: "Sim, é possível analisar múltiplos contratos na mesma avaliação, o que costuma dar uma visão mais clara do impacto total no orçamento.",
      },
    ],
  },

  "revisao-consignado": {
    slug: "revisao-consignado",
    categoriasBlog: ["emprestimo-e-consignado"],
    tipoCurto: "empréstimo consignado",
    eyebrow: "Empréstimo consignado",
    metaTitle: "Revisão de Empréstimo Consignado | Juros e Margem Indevida",
    metaDescription:
      "Análise técnica de consignado do INSS, servidor público ou CLT. Identificamos juros acima do teto do regime, margem consignável estourada e seguros indevidos.",
    h1: "Seu consignado pode estar com juros ou margem descontados além do que a lei permite.",
    intro:
      "O empréstimo consignado tem juros mais baixos por causa do desconto direto na folha ou no benefício — mas isso não significa que o contrato esteja livre de irregularidade. Erros no cálculo da margem consignável, taxas acima do teto do seu regime (INSS, servidor público ou CLT), renovações mal estruturadas e a venda de cartão de crédito consignado (RMC/RCC) disfarçado de empréstimo tradicional estão entre os problemas mais comuns encontrados em análise técnica — cada um desses cenários tem um jeito próprio de ser identificado e corrigido.",
    sinais: [
      {
        titulo: "Margem consignável estourada",
        texto: "A lei limita o percentual do benefício ou salário que pode ser comprometido com descontos consignados — quando esse limite é ultrapassado, parte do desconto pode ser irregular.",
      },
      {
        titulo: "Taxa acima do teto do seu regime",
        texto: "INSS, servidor público e CLT têm limites de taxa de juros diferentes entre si — contratos acima do teto vigente na data da contratação são candidatos à revisão.",
      },
      {
        titulo: "Refinanciamento em cascata",
        texto: "Renovar o consignado antes de quitar o anterior pode embutir juros sobre juros e esticar o prazo sem que o cliente perceba o custo real da operação.",
      },
      {
        titulo: "Seguro prestamista não solicitado",
        texto: "Assim como no financiamento de veículo, é comum encontrar seguros vinculados ao consignado cobrados sem confirmação clara do cliente.",
      },
      {
        titulo: "Cartão consignado (RMC/RCC) vendido como empréstimo",
        texto: "O cartão de crédito consignado costuma ter uma dinâmica de amortização diferente do empréstimo tradicional — parte do desconto mensal quita só o mínimo da fatura, fazendo a dívida durar muito mais do que o cliente imagina.",
      },
      {
        titulo: "Desconto sem autorização clara do titular",
        texto: "Contratações feitas por telefone ou aplicativo sem confirmação inequívoca do titular do benefício ou da folha estão entre os motivos mais comuns de contestação.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Marcos Oliveira"), DEPOIMENTO_POR_NOME("Roberto Fernandes")],
    faq: [
      {
        pergunta: "Aposentado ou pensionista do INSS pode revisar o consignado?",
        resposta: "Sim. A análise técnica se aplica a consignado de aposentados e pensionistas do INSS, servidores públicos e trabalhadores CLT — cada regime tem regras próprias de teto de juros e margem, e a revisão considera o enquadramento correto do seu caso.",
      },
      {
        pergunta: "Tenho vários consignados descontados no mesmo benefício — dá para revisar todos?",
        resposta: "Sim. Quando há mais de um contrato consignado ativo, a análise avalia o conjunto, porque o estouro da margem consignável costuma acontecer justamente pelo acúmulo de operações.",
      },
      {
        pergunta: "A revisão interrompe o desconto que já está sendo feito na folha ou no benefício?",
        resposta: "A análise em si não interrompe o desconto. Quando há indício de irregularidade relevante, avalia-se a medida cabível — inclusive judicial — para corrigir ou suspender a cobrança indevida.",
      },
      {
        pergunta: "Qual a diferença entre empréstimo consignado comum e cartão consignado (RMC/RCC)?",
        resposta: "O empréstimo consignado tem parcelas fixas que amortizam o saldo devedor. Já o cartão consignado desconta um valor mensal que muitas vezes cobre só uma fatura mínima, o que pode manter a dívida praticamente estável por muito mais tempo — é um dos pontos que a análise técnica verifica com atenção.",
      },
      {
        pergunta: "Descobri um desconto consignado que não reconheço no meu contracheque ou benefício — o que fazer?",
        resposta: "Esse é exatamente o tipo de situação que a análise técnica foi pensada para identificar: reunir os documentos disponíveis (extratos, contracheque, extrato do INSS) e verificar a origem do desconto antes de decidir os próximos passos.",
      },
      {
        pergunta: "A GRS atende consignado de qualquer estado ou só de São Paulo?",
        resposta: "O atendimento é nacional — o processo de análise técnica e, quando necessário, o encaminhamento jurídico não dependem de o cliente estar em São Paulo.",
      },
    ],
  },

  "revisao-credito-empresarial": {
    slug: "revisao-credito-empresarial",
    categoriasBlog: ["credito-empresarial"],
    tipoCurto: "crédito empresarial",
    eyebrow: "Crédito empresarial",
    metaTitle: "Revisão de Crédito Empresarial | Capital de Giro e Leasing PJ",
    metaDescription:
      "Análise técnica de capital de giro, antecipação de recebíveis e leasing empresarial. Identificamos juros, garantias e tarifas fora do praticado no mercado.",
    h1: "Capital de giro, antecipação de recebíveis ou leasing: sua empresa pode estar pagando encargos fora do mercado.",
    intro:
      "Crédito para pessoa jurídica costuma vir com estrutura mais complexa que o crédito para pessoa física — garantias, taxas variáveis, tarifas de estruturação e cláusulas de renovação automática. Modalidades como capital de giro, desconto de duplicatas, antecipação de recebíveis de cartão e leasing empresarial têm taxas de referência e regras próprias — o que é razoável numa dessas operações pode não valer para outra. Quando o porte da empresa não é levado em conta na negociação, é comum que o custo efetivo total fique bem acima do que uma operação equivalente deveria ter.",
    sinais: [
      {
        titulo: "Capital de giro com garantias desproporcionais",
        texto: "Empresas de pequeno e médio porte às vezes assumem avais, alienação de bens ou duplicatas muito acima do valor da operação contratada.",
      },
      {
        titulo: "Antecipação de recebíveis com deságio elevado",
        texto: "O desconto aplicado sobre duplicatas ou recebíveis de cartão pode representar uma taxa de juros efetiva muito mais alta do que a informada na proposta.",
      },
      {
        titulo: "Leasing empresarial com VRG e reajustes questionáveis",
        texto: "Contratos de arrendamento mercantil para veículos e equipamentos podem ter valor residual garantido e índices de reajuste aplicados fora do combinado.",
      },
      {
        titulo: "Tarifas de estruturação e renovação automática",
        texto: "Taxas cobradas na abertura da operação e cláusulas que renovam o contrato automaticamente em condições piores merecem atenção especial.",
      },
      {
        titulo: "Aval de sócios ou cônjuges além do necessário",
        texto: "É comum que instituições peçam avais pessoais para aprovar crédito empresarial — mas o volume e a extensão dessas garantias precisam ser compatíveis com o valor e o risco real da operação.",
      },
      {
        titulo: "Spread muito acima da taxa de referência (Selic/CDI)",
        texto: "Quando a taxa final cobrada da empresa está muito distante da taxa básica de referência do período da contratação, vale entender o que compõe essa diferença.",
      },
    ],
    testemunhos: [DEPOIMENTO_POR_NOME("Carla Mendes"), DEPOIMENTO_POR_NOME("Marcos Oliveira")],
    faq: [
      {
        pergunta: "Empresas de pequeno porte e MEI também podem revisar contratos de crédito?",
        resposta: "Sim. O porte da empresa não impede a análise técnica — pelo contrário, negócios menores costumam ser os mais afetados por garantias e tarifas desproporcionais ao valor da operação.",
      },
      {
        pergunta: "A revisão pode ser feita enquanto a empresa ainda está pagando o contrato?",
        resposta: "Sim. A análise é feita em paralelo às obrigações em curso; quando há indício relevante de irregularidade, avalia-se a medida mais adequada para corrigir a cobrança sem comprometer a operação da empresa.",
      },
      {
        pergunta: "Dá para revisar mais de uma linha de crédito da empresa ao mesmo tempo?",
        resposta: "Sim — é possível analisar o conjunto das operações de crédito da empresa (capital de giro, leasing, antecipação de recebíveis) na mesma avaliação, o que costuma revelar o impacto real no fluxo de caixa.",
      },
      {
        pergunta: "Empresa em recuperação judicial pode revisar contratos de crédito anteriores?",
        resposta: "Sim, contratos anteriores ao pedido de recuperação também podem ser objeto de análise técnica — o resultado dessa análise é um dos elementos que pode ser levado em conta na estratégia de recuperação.",
      },
      {
        pergunta: "Sócios que deram aval pessoal (fiança) também são protegidos pela revisão?",
        resposta: "A análise do contrato principal pode impactar diretamente a exigibilidade das garantias vinculadas a ele, incluindo avais e fianças de sócios — é um ponto avaliado caso a caso.",
      },
      {
        pergunta: "A revisão pode ajudar a evitar que o nome da empresa vá para cadastros de inadimplentes?",
        resposta: "Quando há indício relevante de cobrança irregular, é possível avaliar medidas para questionar a exigibilidade do valor antes que ele gere negativação — cada caso depende do estágio em que o contrato está.",
      },
    ],
  },
};
