import Link from "next/link";
import { CONTATO } from "../lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <p className="footer__brand">
            GRS <em>Soluções</em>
          </p>
          <p style={{ marginTop: 14, maxWidth: "38ch" }}>
            Análise e revisão técnica de contratos de financiamento e
            empréstimo. Pessoa física e jurídica, em todo o Brasil.
          </p>
          <p style={{ marginTop: 14 }}>CNPJ {CONTATO.cnpj}</p>
        </div>
        <div>
          <h4>Tipos de contrato</h4>
          <ul>
            <li><Link href="/calculadora">Calculadora de pré-avaliação</Link></li>
            <li><Link href="/revisao-financiamento-veiculo">Financiamento de veículo</Link></li>
            <li><Link href="/revisao-financiamento-imovel">Financiamento imobiliário</Link></li>
            <li><Link href="/revisao-emprestimo">Empréstimo e crédito</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            <li>
              <a href={CONTATO.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp {CONTATO.telefone}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTATO.telefoneFixoE164}`}>
                Telefone {CONTATO.telefoneFixo}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>
            </li>
            <li>{CONTATO.horario}</li>
          </ul>
        </div>
        <div>
          <h4>Onde estamos</h4>
          <p>
            {CONTATO.endereco.rua} — {CONTATO.endereco.bairro}
            <br />
            {CONTATO.endereco.cidade} · {CONTATO.endereco.uf} ·{" "}
            {CONTATO.endereco.cep}
          </p>
          <ul style={{ marginTop: 12 }}>
            <li>
              <a href={CONTATO.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={CONTATO.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__disclaimer">
        A GRS Soluções realiza análise técnica de contratos financeiros e
        atua em conjunto com advogados parceiros. Cada caso depende de
        análise individual — não prometemos resultados garantidos. Consulte
        nossa <Link href="/privacidade">Política de Privacidade</Link>. ©{" "}
        {new Date().getFullYear()} GRS Soluções. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
