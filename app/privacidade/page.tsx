import type { Metadata } from "next"
import { LegalShell } from "@/components/landing/legal-shell"
import {
  POLICY_UPDATED_AT,
  PRIVACY_EMAIL,
  CONTROLLER_NAME,
  CONTROLLER_DOC,
  DPO_NAME,
  RETENTION_DESCRIPTION,
} from "@/lib/legal"

export const metadata: Metadata = {
  title: "Política de Privacidade — GoPesca",
  description:
    "Como a GoPesca coleta, usa e protege seus dados pessoais na lista de espera, em conformidade com a LGPD.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidade" },
}

export default function PoliticaPrivacidade() {
  return (
    <LegalShell title="Política de Privacidade" updatedAt={POLICY_UPDATED_AT}>
      <p>
        Esta Política descreve como a GoPesca trata os dados pessoais coletados nesta landing page
        de lista de espera, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018
        — "LGPD"). Ao se cadastrar, você declara estar ciente das condições abaixo.
      </p>

      <h2>1. Quem é o controlador dos dados</h2>
      <p>
        O controlador é <strong>{CONTROLLER_NAME}</strong>, inscrita sob o {CONTROLLER_DOC},
        responsável por decidir como e por que seus dados são tratados.
      </p>
      <p>
        <strong>Encarregado pelo Tratamento de Dados (DPO):</strong> {DPO_NAME}. Para qualquer
        assunto relacionado a privacidade e dados pessoais, fale com a gente em{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <p>Coletamos apenas o necessário para a finalidade da lista de espera:</p>
      <ul>
        <li><strong>Dados de contato:</strong> nome, e-mail e telefone/WhatsApp.</li>
        <li><strong>Localização:</strong> cidade e estado (UF).</li>
        <li><strong>Perfil:</strong> se você é pescador ou guia de pesca.</li>
        <li>
          <strong>Somente para guias:</strong> espécies de peixe de especialidade e tipo de água
          em que atua (doce, salgada ou ambas).
        </li>
        <li>
          <strong>Dados técnicos:</strong> página de origem (referrer) e, de forma temporária e não
          armazenada, o endereço IP — usado apenas para limitar tentativas de envio e prevenir abuso.
        </li>
        <li>
          <strong>Registro de consentimento:</strong> data/hora e versão da política aceita.
        </li>
      </ul>
      <p>
        Não coletamos dados sensíveis (como origem racial, saúde, opinião política ou biometria) e
        não solicitamos dados de pagamento nesta etapa.
      </p>

      <h2>3. Para que usamos seus dados (finalidade)</h2>
      <ul>
        <li>Avisar você quando a plataforma GoPesca for lançada;</li>
        <li>Enviar novidades e condições de fundador relacionadas ao lançamento;</li>
        <li>Entender a demanda por região e perfil para priorizar o lançamento;</li>
        <li>Prevenir fraudes e abusos no formulário.</li>
      </ul>

      <h2>4. Base legal</h2>
      <p>
        O tratamento dos seus dados se baseia no seu <strong>consentimento</strong> (art. 7º, I, da
        LGPD), manifestado ao marcar a caixa de aceite no formulário. Você pode revogar esse
        consentimento a qualquer momento (ver seção 7).
      </p>

      <h2>5. Compartilhamento e operadores</h2>
      <p>
        Não vendemos seus dados. Eles são processados por fornecedores que atuam como operadores em
        nosso nome, exclusivamente para viabilizar este serviço:
      </p>
      <ul>
        <li><strong>Supabase</strong> — armazenamento seguro dos cadastros (banco de dados);</li>
        <li><strong>Vercel</strong> — hospedagem do site e métricas de acesso anônimas (sem cookies);</li>
      </ul>
      <p>
        Esses fornecedores podem processar dados em servidores fora do Brasil. Nesses casos, a
        transferência internacional observa as salvaguardas previstas nos arts. 33 e 34 da LGPD.
      </p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Mantemos seus dados {RETENTION_DESCRIPTION}. Após esse período, ou mediante solicitação de
        exclusão, os dados são eliminados ou anonimizados.
      </p>

      <h2>7. Seus direitos como titular</h2>
      <p>Nos termos do art. 18 da LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados;</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação dos dados;</li>
        <li>Solicitar a portabilidade;</li>
        <li>Revogar o consentimento e pedir a eliminação dos dados tratados com base nele;</li>
        <li>Obter informação sobre com quem compartilhamos seus dados.</li>
      </ul>
      <p>
        Para exercer qualquer direito, escreva para{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Responderemos no menor prazo possível.
      </p>

      <h2>8. Métricas de acesso (analytics)</h2>
      <p>
        Usamos o Vercel Analytics para medir visitas de forma <strong>agregada e anônima</strong>.
        Essa ferramenta não utiliza cookies nem identifica você individualmente.
      </p>

      <h2>9. Segurança</h2>
      <p>
        Adotamos medidas técnicas e administrativas para proteger seus dados, como tráfego
        criptografado (HTTPS), controle de acesso ao banco de dados e princípio do menor privilégio.
        Nenhum sistema é 100% infalível, mas trabalhamos continuamente para reduzir riscos e, em caso
        de incidente relevante, comunicaremos os titulares e a ANPD conforme a lei.
      </p>

      <h2>10. Alterações nesta política</h2>
      <p>
        Podemos atualizar esta Política. Quando houver mudança relevante, atualizamos a data acima e,
        quando necessário, solicitamos novo consentimento.
      </p>

      <h2>11. Contato</h2>
      <p>
        Dúvidas sobre privacidade? Fale com o nosso Encarregado em{" "}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
