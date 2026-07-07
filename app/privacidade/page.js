import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { CONTATO } from "../../lib/content";

export const metadata = {
  title: "Política de Privacidade",
  description: "Como a GRS Soluções coleta, usa e protege os dados de clientes e visitantes do site.",
  alternates: { canonical: "/privacidade" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <div className="legal-page">
          <div className="legal-page__inner">
            <h1 className="serif">Política de Privacidade</h1>
            <p className="updated">Última atualização: julho de 2026</p>

            <h2 className="serif">1. Quem somos</h2>
            <p>
              A GRS Soluções (CNPJ {CONTATO.cnpj}), com sede em{" "}
              {CONTATO.endereco.rua}, {CONTATO.endereco.bairro},{" "}
              {CONTATO.endereco.cidade}/{CONTATO.endereco.uf}, é responsável
              pelo tratamento dos dados pessoais coletados através deste site,
              nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018
              — LGPD).
            </p>

            <h2 className="serif">2. Quais dados coletamos</h2>
            <p>Coletamos dados que você nos fornece diretamente ao entrar em contato, entre eles:</p>
            <ul>
              <li>Nome, telefone e e-mail informados por WhatsApp, e-mail ou formulário;</li>
              <li>Conteúdo das mensagens trocadas com nossa equipe;</li>
              <li>Documentos e contratos que você opte por enviar para análise técnica.</li>
            </ul>
            <p>
              Hoje o site não utiliza cookies de rastreamento ou ferramentas
              de análise de tráfego. Caso isso mude no futuro, esta política
              será atualizada antes da mudança entrar em vigor.
            </p>

            <h2 className="serif">3. Para que usamos seus dados</h2>
            <ul>
              <li>Avaliar tecnicamente o contrato que você enviar;</li>
              <li>Entrar em contato para dar andamento ao seu atendimento;</li>
              <li>Prestar o serviço de análise, negociação ou encaminhamento jurídico;</li>
              <li>Cumprir obrigações legais e regulatórias aplicáveis à nossa atividade.</li>
            </ul>

            <h2 className="serif">4. Com quem compartilhamos</h2>
            <p>
              Não vendemos nem alugamos dados pessoais a terceiros. Seus
              dados e o conteúdo do seu contrato podem ser compartilhados com
              advogados parceiros exclusivamente quando o seu caso segue para
              negociação ou ação judicial — sempre dentro do escopo do
              atendimento que você solicitou.
            </p>

            <h2 className="serif">5. Como protegemos seus dados</h2>
            <p>
              O acesso às informações de cada caso é restrito à equipe
              diretamente envolvida no atendimento. Adotamos práticas
              razoáveis de segurança para proteger os dados contra acesso não
              autorizado, perda ou uso indevido.
            </p>

            <h2 className="serif">6. Por quanto tempo guardamos seus dados</h2>
            <p>
              Mantemos seus dados pelo tempo necessário à prestação do
              serviço e, após isso, pelo prazo exigido pela legislação
              aplicável à guarda de documentos e eventual defesa em processos
              administrativos ou judiciais.
            </p>

            <h2 className="serif">7. Seus direitos</h2>
            <p>Nos termos da LGPD, você pode, a qualquer momento, solicitar:</p>
            <ul>
              <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Revogação do consentimento e eliminação dos dados tratados com base nele.</li>
            </ul>

            <h2 className="serif">8. Como exercer seus direitos</h2>
            <p>
              Para exercer qualquer um desses direitos, escreva para{" "}
              <a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a>.
              Responderemos dentro de um prazo razoável.
            </p>

            <h2 className="serif">9. Atualizações desta política</h2>
            <p>
              Podemos atualizar esta política para refletir mudanças em
              nossas práticas ou na legislação. A data no topo desta página
              indica a versão mais recente.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
