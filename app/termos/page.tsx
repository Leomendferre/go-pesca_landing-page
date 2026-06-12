import type { Metadata } from "next"
import { LegalShell } from "@/components/landing/legal-shell"
import { POLICY_UPDATED_AT, PRIVACY_EMAIL, CONTROLLER_NAME } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Termos de Uso — GoPesca",
  description: "Termos de uso da lista de espera da GoPesca.",
  robots: { index: true, follow: true },
}

export default function TermosDeUso() {
  return (
    <LegalShell title="Termos de Uso" updatedAt={POLICY_UPDATED_AT}>
      <p>
        Estes Termos regem o uso desta página de lista de espera da GoPesca, operada por{" "}
        <strong>{CONTROLLER_NAME}</strong>. Ao se cadastrar, você concorda com as condições abaixo.
      </p>

      <h2>1. Sobre a lista de espera</h2>
      <p>
        Esta página tem como única finalidade registrar o interesse de pescadores e guias no
        lançamento da plataforma GoPesca. O cadastro <strong>não cria conta, vínculo, contrato ou
        garantia de vaga</strong> na plataforma futura.
      </p>

      <h2>2. Informações fornecidas</h2>
      <p>
        Você se compromete a fornecer informações verdadeiras e atualizadas. Dados manifestamente
        falsos, ofensivos ou de terceiros sem autorização podem ser removidos.
      </p>

      <h2>3. Comunicações</h2>
      <p>
        Ao se cadastrar, você autoriza o envio de comunicações sobre o lançamento e condições de
        fundador. Você pode cancelar esse contato a qualquer momento (ver Política de Privacidade).
      </p>

      <h2>4. Propriedade intelectual</h2>
      <p>
        A marca, o logotipo, os textos e os elementos visuais da GoPesca são protegidos e não podem
        ser usados sem autorização prévia.
      </p>

      <h2>5. Limitação de responsabilidade</h2>
      <p>
        A página é fornecida "no estado em que se encontra". Não garantimos disponibilidade
        ininterrupta nem data específica de lançamento da plataforma.
      </p>

      <h2>6. Privacidade</h2>
      <p>
        O tratamento dos seus dados pessoais é descrito na nossa{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>7. Foro e contato</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Dúvidas podem ser enviadas para{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
