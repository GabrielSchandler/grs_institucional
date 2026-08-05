// Glossário do blog. Os termos aqui aparecem repetidamente nos artigos e
// travam a leitura de quem não é do meio — cada verbete existe pra ser
// linkado de dentro do texto em vez de o artigo parar pra explicar de novo.
//
// Também é a página com melhor chance de ser citada por IA: definição curta,
// autossuficiente e com fonte. Vira JSON-LD DefinedTermSet na página.

export const GLOSSARIO = [
  {
    termo: "Alienação fiduciária",
    slug: "alienacao-fiduciaria",
    definicao:
      "Garantia em que o bem financiado fica na posse do comprador, mas a propriedade permanece com a instituição financeira até a quitação do contrato. É o arranjo usado na quase totalidade dos financiamentos de veículo no Brasil e o que permite ao credor retomar o bem pela via da busca e apreensão.",
    base: "Decreto-Lei 911/1969",
    veja: ["gravame", "busca-e-apreensao"],
  },
  {
    termo: "Amortização",
    slug: "amortizacao",
    definicao:
      "A parte da parcela que efetivamente abate o valor devido. O restante da prestação é juros e encargos. Nos primeiros meses de um contrato pela Tabela Price, a fatia de amortização é pequena — razão pela qual o saldo devedor parece não cair.",
    veja: ["tabela-price", "sac"],
  },
  {
    termo: "Busca e apreensão",
    slug: "busca-e-apreensao",
    definicao:
      "Procedimento pelo qual o credor retoma um bem alienado fiduciariamente após a comprovação da mora. Corre pela via judicial, com liminar concedida antes de o devedor ser ouvido, ou pela via extrajudicial em cartório, quando o contrato tem cláusula específica que a autorize.",
    base: "Decreto-Lei 911/1969; Lei 14.711/2023",
    veja: ["mora", "purgacao-da-mora", "alienacao-fiduciaria"],
  },
  {
    termo: "CET (Custo Efetivo Total)",
    slug: "cet",
    definicao:
      "O custo real de uma operação de crédito expresso em percentual anual, somando à taxa de juros todas as tarifas, tributos, seguros e demais despesas cobradas do cliente. É o número que permite comparar propostas — e costuma ser bem maior que a taxa anunciada.",
    base: "Resolução CMN 3.517/2007",
    veja: ["seguro-prestamista"],
  },
  {
    termo: "Comissão de permanência",
    slug: "comissao-de-permanencia",
    definicao:
      "Encargo cobrado durante o período de inadimplência. Sua cobrança é admitida, mas não pode ser cumulada com juros remuneratórios, juros de mora, multa contratual nem correção monetária — porque tem a natureza desses encargos somados.",
    base: "Súmulas 30, 296 e 472 do STJ",
    veja: ["mora"],
  },
  {
    termo: "Gravame",
    slug: "gravame",
    definicao:
      "Anotação no registro do veículo indicando que ele é garantia de um financiamento. Enquanto existe, o bem não pode ser vendido livremente. Quitado o contrato, a baixa do gravame é obrigação do credor.",
    veja: ["alienacao-fiduciaria"],
  },
  {
    termo: "Liminar",
    slug: "liminar",
    definicao:
      "Decisão judicial concedida no início do processo, antes de a parte contrária ser ouvida. Na busca e apreensão, é o que autoriza a retomada do veículo — e explica por que, do ponto de vista de quem deve, o processo parece começar já no fim.",
    veja: ["busca-e-apreensao"],
  },
  {
    termo: "Mora",
    slug: "mora",
    definicao:
      "O atraso no cumprimento da obrigação. Decorre do simples vencimento do prazo, mas, para autorizar a busca e apreensão, precisa ser comprovada — por carta registrada com aviso de recebimento ao endereço do contrato, notificação em cartório ou protesto do título.",
    base: "Súmula 72 do STJ",
    veja: ["purgacao-da-mora", "comissao-de-permanencia"],
  },
  {
    termo: "Purgação da mora",
    slug: "purgacao-da-mora",
    definicao:
      "O pagamento que interrompe o efeito do atraso e permite reaver o bem. Nos contratos regidos pela Lei 10.931/2004, o devedor tem cinco dias após a execução da liminar para pagar a integralidade da dívida apresentada pelo credor — o que inclui as parcelas ainda não vencidas, e não apenas o atraso.",
    base: "Tema Repetitivo 722 do STJ",
    veja: ["mora", "busca-e-apreensao"],
  },
  {
    termo: "SAC (Sistema de Amortização Constante)",
    slug: "sac",
    definicao:
      "Sistema em que a parcela de amortização é sempre a mesma e os juros incidem sobre um saldo que cai de forma linear. As primeiras prestações são mais altas que na Tabela Price e diminuem ao longo do contrato.",
    veja: ["amortizacao", "tabela-price"],
  },
  {
    termo: "Seguro prestamista",
    slug: "seguro-prestamista",
    definicao:
      "Seguro vinculado a uma operação de crédito, que cobre o saldo devedor em caso de morte ou invalidez do contratante. É lícito, mas o consumidor não pode ser obrigado a contratá-lo com a própria instituição financeira ou com seguradora indicada por ela — a ausência de liberdade de escolha caracteriza venda casada.",
    base: "Tema 972 do STJ",
    veja: ["cet"],
  },
  {
    termo: "Tabela Price",
    slug: "tabela-price",
    definicao:
      "Sistema de amortização em que a parcela é fixa do começo ao fim. No início, a maior parte dela é juros e uma fração pequena amortiza a dívida; com o tempo, a proporção se inverte. Não é irregular — mas explica a sensação de que as primeiras parcelas não abatem nada.",
    veja: ["amortizacao", "sac"],
  },
  {
    termo: "Taxa média de mercado",
    slug: "taxa-media-de-mercado",
    definicao:
      "Taxa de juros média praticada pelo conjunto das instituições financeiras em cada modalidade de crédito, divulgada mensalmente pelo Banco Central. É o parâmetro de comparação para avaliar um contrato — sempre considerando a modalidade correta e o mês da contratação, não o mês da consulta.",
    base: "Banco Central — Sistema Gerenciador de Séries Temporais",
    veja: ["cet"],
  },
  {
    termo: "Valor presente",
    slug: "valor-presente",
    definicao:
      "Quanto vale hoje um pagamento que só ocorreria no futuro, descontados os juros do período que não vai correr. É o critério que a norma manda usar no cálculo da quitação antecipada — por isso o valor para quitar deve ser menor que a soma simples das parcelas restantes.",
    base: "Resolução CMN 5.004/2022",
    veja: ["amortizacao"],
  },
];

export function buscarTermo(slug) {
  return GLOSSARIO.find((t) => t.slug === slug) || null;
}
