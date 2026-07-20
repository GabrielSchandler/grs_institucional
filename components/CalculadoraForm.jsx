"use client";

import { useMemo, useState } from "react";
import { CONTATO } from "../lib/content";

const TIPOS = [
  { valor: "imovel", rotulo: "Financiamento de imóvel" },
  { valor: "emprestimo", rotulo: "Empréstimo" },
  { valor: "veiculo", rotulo: "Financiamento de veículo" },
];

const ESTADO_INICIAL = {
  nome: "",
  tipo: "",
  financeira: "",
  parcela: "",
  parcelasTotais: "",
  parcelasPagas: "",
  atraso: "",
  qtdAtraso: "",
};

const CAMPOS_BASE = ["nome", "tipo", "financeira", "parcela", "parcelasTotais", "parcelasPagas", "atraso"];

function formatarMoeda(valor) {
  if (valor === "" || valor === null || valor === undefined) return valor;
  const numero = Number(valor);
  if (Number.isNaN(numero)) return valor;
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// A calculadora não calcula nem exibe resultado — só organiza o que a
// pessoa preencheu numa mensagem pronta pro WhatsApp, com tudo que o
// atendente precisa pra já voltar com uma simulação. O cálculo de
// verdade acontece na análise técnica, do lado de dentro.
function montarMensagem(form) {
  const tipoLabel = TIPOS.find((t) => t.valor === form.tipo)?.rotulo ?? form.tipo;
  const atrasoLabel = form.atraso === "sim" ? `Sim (${form.qtdAtraso})` : "Não";

  const linhas = [
    `Olá, me chamo ${form.nome.trim()}, e gostaria de verificar se há juros e taxas abusivas no meu contrato e como reduzir.`,
    "",
    `Tipo de financiamento: ${tipoLabel}`,
    `Financeira: ${form.financeira.trim()}`,
    `Valor da parcela: ${formatarMoeda(form.parcela)}`,
    `Parcelas totais: ${form.parcelasTotais}`,
    `Parcelas pagas: ${form.parcelasPagas}`,
    `Parcelas em atraso: ${atrasoLabel}`,
  ];

  return linhas.join("\n");
}

export default function CalculadoraForm() {
  const [form, setForm] = useState(ESTADO_INICIAL);

  const pronto =
    CAMPOS_BASE.every((campo) => String(form[campo]).trim() !== "") &&
    (form.atraso !== "sim" || String(form.qtdAtraso).trim() !== "");

  const whatsappHref = useMemo(() => {
    if (!pronto) return "#";
    const numero = CONTATO.telefoneE164.replace("+", "");
    return `https://wa.me/${numero}?text=${encodeURIComponent(montarMensagem(form))}`;
  }, [form, pronto]);

  function atualizar(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  }

  return (
    <form className="calc__form" onSubmit={(e) => e.preventDefault()}>
      <div className="calc__grid">
        <label className="calc__field">
          <span>Nome</span>
          <input type="text" value={form.nome} onChange={atualizar("nome")} placeholder="Como podemos te chamar" required />
        </label>

        <label className="calc__field">
          <span>Tipo de financiamento</span>
          <select value={form.tipo} onChange={atualizar("tipo")} required>
            <option value="" disabled>Selecione</option>
            {TIPOS.map((t) => (
              <option key={t.valor} value={t.valor}>{t.rotulo}</option>
            ))}
          </select>
        </label>

        <label className="calc__field">
          <span>Financeira</span>
          <input type="text" value={form.financeira} onChange={atualizar("financeira")} placeholder="Ex: Bradesco, Itaú, Santander..." required />
        </label>

        <label className="calc__field">
          <span>Valor da parcela (R$)</span>
          <input type="number" inputMode="decimal" min="0" value={form.parcela} onChange={atualizar("parcela")} placeholder="1200" required />
        </label>

        <label className="calc__field">
          <span>Parcelas totais</span>
          <input type="number" inputMode="numeric" min="0" value={form.parcelasTotais} onChange={atualizar("parcelasTotais")} placeholder="48" required />
        </label>

        <label className="calc__field">
          <span>Parcelas pagas</span>
          <input type="number" inputMode="numeric" min="0" value={form.parcelasPagas} onChange={atualizar("parcelasPagas")} placeholder="12" required />
        </label>

        <label className="calc__field">
          <span>Existem parcelas em atraso?</span>
          <select value={form.atraso} onChange={atualizar("atraso")} required>
            <option value="" disabled>Selecione</option>
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
          </select>
        </label>

        {form.atraso === "sim" && (
          <label className="calc__field">
            <span>Quantas parcelas em atraso</span>
            <input type="number" inputMode="numeric" min="1" value={form.qtdAtraso} onChange={atualizar("qtdAtraso")} placeholder="3" required />
          </label>
        )}
      </div>

      <a
        className={`cta cta--large calc__submit${pronto ? "" : " is-disabled"}`}
        href={whatsappHref}
        target={pronto ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-disabled={!pronto}
        onClick={(e) => {
          if (!pronto) e.preventDefault();
        }}
      >
        <span className="cta__fill" aria-hidden="true" />
        <span className="cta__label cta__label--default">Calcular</span>
        <span className="cta__label cta__label--hover" aria-hidden="true">
          Ir para o WhatsApp <span>→</span>
        </span>
      </a>
      <p className="calc__disclaimer">
        Preencha todos os campos para liberar o link. Nada é calculado por
        aqui — os dados seguem pro WhatsApp do time da GRS, que já volta com
        uma simulação a partir dessas informações.
      </p>
    </form>
  );
}
