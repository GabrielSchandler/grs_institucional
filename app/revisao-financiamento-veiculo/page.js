import ServicoPage from "../../components/ServicoPage";
import { PAGINAS_SERVICO } from "../../lib/content";

const data = PAGINAS_SERVICO["revisao-financiamento-veiculo"];

export const metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `/${data.slug}` },
  openGraph: { title: data.metaTitle, description: data.metaDescription },
};

export default function Page() {
  return <ServicoPage data={data} />;
}
