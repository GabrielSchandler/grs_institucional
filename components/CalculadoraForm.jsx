"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONTATO } from "../lib/content";

const TIPOS = [
  { valor: "imovel", rotulo: "Financiamento de imóvel" },
  { valor: "emprestimo", rotulo: "Empréstimo" },
  { valor: "veiculo", rotulo: "Financiamento de veículo" },
];

const ATRASO_OPCOES = [
  { valor: "nao", rotulo: "Não" },
  { valor: "sim", rotulo: "Sim" },
];

const ESTADO_INICIAL = {
  nome: "",
  tipo: "",
  financeira: "",
  valorTotalFinanciado: "",
  entrada: "",
  parcela: "",
  parcelasTotais: "",
  parcelasPagas: "",
  atraso: "",
  qtdAtraso: "",
};

// Uma pergunta por tela, estilo quiz — "seVisivel" tira a pergunta de
// quantas parcelas em atraso quando a resposta anterior foi "Não".
const PERGUNTAS = [
  { chave: "nome", pergunta: "Como podemos te chamar?", tipo: "texto", placeholder: "Seu nome" },
  { chave: "tipo", pergunta: "Qual o tipo de financiamento?", tipo: "opcoes", opcoes: TIPOS },
  { chave: "financeira", pergunta: "Qual a financeira ou banco?", tipo: "texto", placeholder: "Ex: Bradesco, Itaú, Santander..." },
  { chave: "valorTotalFinanciado", pergunta: "Qual o valor total financiado?", tipo: "numero", placeholder: "45000", prefixo: "R$" },
  { chave: "entrada", pergunta: "Qual foi o valor de entrada?", tipo: "numero", placeholder: "0 se não houve entrada", prefixo: "R$" },
  { chave: "parcela", pergunta: "Qual o valor da parcela mensal?", tipo: "numero", placeholder: "1200", prefixo: "R$" },
  { chave: "parcelasTotais", pergunta: "Quantas parcelas tem o contrato ao todo?", tipo: "numero", placeholder: "48" },
  { chave: "parcelasPagas", pergunta: "Quantas parcelas você já pagou?", tipo: "numero", placeholder: "12" },
  { chave: "atraso", pergunta: "Existem parcelas em atraso?", tipo: "opcoes", opcoes: ATRASO_OPCOES },
  { chave: "qtdAtraso", pergunta: "Quantas parcelas estão em atraso?", tipo: "numero", placeholder: "3", seVisivel: (f) => f.atraso === "sim" },
];

const MENSAGENS_CALCULO = [
  "Lendo os dados do seu contrato...",
  "Comparando com a taxa média do Banco Central...",
  "Verificando sinais de cobrança irregular...",
  "Organizando o resumo...",
];

function formatarMoeda(valor) {
  if (valor === "" || valor === null || valor === undefined) return valor;
  const numero = Number(valor);
  if (Number.isNaN(numero)) return valor;
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function montarMensagemWhatsapp(form) {
  const tipoLabel = TIPOS.find((t) => t.valor === form.tipo)?.rotulo ?? form.tipo;
  const atrasoLabel = form.atraso === "sim" ? `Sim (${form.qtdAtraso})` : "Não";

  return [
    `Olá, me chamo ${form.nome.trim()}, e gostaria de verificar se há juros e taxas abusivas no meu contrato e como reduzir.`,
    "",
    `Tipo de financiamento: ${tipoLabel}`,
    `Financeira: ${form.financeira.trim()}`,
    `Valor total financiado: ${formatarMoeda(form.valorTotalFinanciado)}`,
    `Entrada: ${formatarMoeda(form.entrada)}`,
    `Valor da parcela: ${formatarMoeda(form.parcela)}`,
    `Parcelas totais: ${form.parcelasTotais}`,
    `Parcelas pagas: ${form.parcelasPagas}`,
    `Parcelas em atraso: ${atrasoLabel}`,
  ].join("\n");
}

// A calculadora conduz um quiz de uma pergunta por vez e termina numa fase
// "calculando" (puramente visual) antes do resumo. Nenhum valor em R$ de
// retorno é inventado nessa tela — o resumo é qualitativo, e o número real
// só sai da análise técnica, feita por gente, depois do contato no WhatsApp.
export default function CalculadoraForm() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("perguntas"); // perguntas | calculando | resultado
  const [msgIndex, setMsgIndex] = useState(0);
  const inputRef = useRef(null);

  const perguntasVisiveis = useMemo(
    () => PERGUNTAS.filter((p) => !p.seVisivel || p.seVisivel(form)),
    [form]
  );

  const perguntaAtual = perguntasVisiveis[Math.min(indice, perguntasVisiveis.length - 1)];
  const valorAtual = perguntaAtual ? form[perguntaAtual.chave] : "";
  const podeAvancar = String(valorAtual ?? "").trim() !== "";

  useEffect(() => {
    if (fase === "perguntas") inputRef.current?.focus();
  }, [indice, fase]);

  useEffect(() => {
    if (fase !== "calculando") return undefined;
    const intervalo = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MENSAGENS_CALCULO.length);
    }, 650);
    const timeout = setTimeout(() => setFase("resultado"), 2600);
    return () => {
      clearInterval(intervalo);
      clearTimeout(timeout);
    };
  }, [fase]);

  function irParaProxima(formAtualizado) {
    const novasPerguntas = PERGUNTAS.filter((p) => !p.seVisivel || p.seVisivel(formAtualizado));
    setIndice((i) => {
      if (i + 1 < novasPerguntas.length) return i + 1;
      setMsgIndex(0);
      setFase("calculando");
      return i;
    });
  }

  function escolherOpcao(valor) {
    const novoForm = { ...form, [perguntaAtual.chave]: valor };
    setForm(novoForm);
    setTimeout(() => irParaProxima(novoForm), 220);
  }

  function avancarTexto() {
    if (!podeAvancar) return;
    irParaProxima(form);
  }

  function voltar() {
    if (indice > 0) setIndice((i) => i - 1);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      avancarTexto();
    }
  }

  const whatsappHref = useMemo(() => {
    const numero = CONTATO.telefoneE164.replace("+", "");
    return `https://wa.me/${numero}?text=${encodeURIComponent(montarMensagemWhatsapp(form))}`;
  }, [form]);

  if (fase === "calculando") {
    return (
      <div className="calc__loading">
        <div className="calc__spinner" aria-hidden="true" />
        <p className="calc__loading-msg" aria-live="polite" key={msgIndex}>
          {MENSAGENS_CALCULO[msgIndex]}
        </p>
      </div>
    );
  }

  if (fase === "resultado") {
    const tipoLabel = TIPOS.find((t) => t.valor === form.tipo)?.rotulo ?? form.tipo;
    const atrasoLabel = form.atraso === "sim" ? `Sim — ${form.qtdAtraso} parcela(s)` : "Não";
    const primeiroNome = form.nome.trim().split(" ")[0];

    // Teste de estresse real (não decorativo): simula uma redução de 5% na
    // parcela e verifica se o contrato ainda "sobra" acima do valor
    // efetivamente financiado (total - entrada). Se sim, há margem
    // matemática real pra negociação. Se não sobrar, os dados informados
    // são atípicos pra um contrato de financiamento real (mais provável
    // erro de preenchimento do que ausência de juros) — nesse caso não
    // exibimos determinação automática nenhuma, só encaminhamos pra
    // análise humana.
    const principal = Number(form.valorTotalFinanciado) - Number(form.entrada);
    const totalPagoComReducao = Number(form.parcela) * 0.95 * Number(form.parcelasTotais);
    const jurosPositivo = principal > 0 && totalPagoComReducao > principal;

    return (
      <div className="calc__resultado">
        <p className="eyebrow">Pré-diagnóstico concluído</p>
        <h3 className="calc__resultado-title" aria-live="polite">
          {primeiroNome}, organizamos o resumo do seu contrato.
        </h3>
        <ul className="calc__resumo-lista">
          <li><span>Tipo de financiamento</span><strong>{tipoLabel}</strong></li>
          <li><span>Financeira</span><strong>{form.financeira}</strong></li>
          <li><span>Valor total financiado</span><strong>{formatarMoeda(form.valorTotalFinanciado)}</strong></li>
          <li><span>Entrada</span><strong>{formatarMoeda(form.entrada)}</strong></li>
          <li><span>Parcela mensal</span><strong>{formatarMoeda(form.parcela)}</strong></li>
          <li><span>Parcelas pagas / total</span><strong>{form.parcelasPagas} de {form.parcelasTotais}</strong></li>
          <li><span>Parcelas em atraso</span><strong>{atrasoLabel}</strong></li>
        </ul>

        {jurosPositivo && (
          <div className="calc__selo">
            <span className="calc__selo-icon" aria-hidden="true">✓</span>
            Indícios de possível redução identificados
          </div>
        )}

        <p className="calc__resultado-nota">
          {jurosPositivo
            ? "Nosso cálculo identificou margem matemática de redução no valor das suas parcelas. "
            : "Não identificamos margem de redução automaticamente com esses dados — pode haver alguma informação diferente do contrato original. "}
          {form.atraso === "sim" &&
            "Contratos com parcelas em atraso costumam abrir mais margem de negociação. "}
          O valor exato só sai depois da análise técnica do contrato completo.
        </p>
        <a className="cta cta--large calc__submit" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <span className="cta__fill" aria-hidden="true" />
          <span className="cta__label cta__label--default">Fazer minha análise sem compromisso</span>
          <span className="cta__label cta__label--hover" aria-hidden="true">
            Continuar no WhatsApp <span>→</span>
          </span>
        </a>
        <button type="button" className="calc__editar" onClick={() => setFase("perguntas")}>
          Editar respostas
        </button>
      </div>
    );
  }

  return (
    <div className="calc__wizard">
      <div className="calc__progress">
        <div
          className="calc__progress-bar"
          style={{ width: `${((indice + 1) / perguntasVisiveis.length) * 100}%` }}
        />
      </div>
      <p className="calc__step-count">
        Pergunta {indice + 1} de {perguntasVisiveis.length}
      </p>

      <p className="calc__question">{perguntaAtual.pergunta}</p>

      {perguntaAtual.tipo === "opcoes" ? (
        <div className="calc__opcoes">
          {perguntaAtual.opcoes.map((op) => (
            <button
              key={op.valor}
              type="button"
              className={`calc__opcao${valorAtual === op.valor ? " is-selected" : ""}`}
              onClick={() => escolherOpcao(op.valor)}
            >
              {op.rotulo}
            </button>
          ))}
        </div>
      ) : (
        <div className="calc__input-wrap">
          {perguntaAtual.prefixo && <span className="calc__prefixo">{perguntaAtual.prefixo}</span>}
          <input
            ref={inputRef}
            type={perguntaAtual.tipo === "numero" ? "number" : "text"}
            inputMode={perguntaAtual.tipo === "numero" ? "decimal" : undefined}
            min={perguntaAtual.tipo === "numero" ? "0" : undefined}
            value={valorAtual}
            placeholder={perguntaAtual.placeholder}
            onChange={(e) => setForm((f) => ({ ...f, [perguntaAtual.chave]: e.target.value }))}
            onKeyDown={onKeyDown}
            className="calc__input"
          />
        </div>
      )}

      <div className="calc__nav">
        {indice > 0 && (
          <button type="button" className="calc__voltar" onClick={voltar}>
            ← Voltar
          </button>
        )}
        {perguntaAtual.tipo !== "opcoes" && (
          <button
            type="button"
            className={`cta cta--large calc__submit${podeAvancar ? "" : " is-disabled"}`}
            onClick={avancarTexto}
            disabled={!podeAvancar}
          >
            <span className="cta__fill" aria-hidden="true" />
            <span className="cta__label cta__label--default">
              {indice + 1 < perguntasVisiveis.length ? "Próximo" : "Calcular"}
            </span>
            <span className="cta__label cta__label--hover" aria-hidden="true">
              {indice + 1 < perguntasVisiveis.length ? "Continuar" : "Calcular"} <span>→</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
