import type { ReactNode } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { Brand } from "@/components/landing/brand"
import { Footer } from "@/components/landing/footer"

interface LegalShellProps {
  title: string
  updatedAt: string
  children: ReactNode
}

/**
 * Shell para páginas legais (Política de Privacidade, Termos de Uso).
 * Barra superior escura com a marca + voltar, conteúdo em fundo claro e o rodapé padrão.
 */
export function LegalShell({ title, updatedAt, children }: LegalShellProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-[#173440]">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-5 md:px-6">
          <Brand href="/" size="text-xl" />
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeftIcon weight="bold" className="size-4" />
            Voltar ao site
          </a>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto max-w-3xl px-5 py-12 md:px-6 md:py-16">
        <h1 className="font-display text-3xl font-bold text-[#173440] md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-[#16323d]/60">Última atualização: {updatedAt}</p>
        <div className="legal-content mt-8">{children}</div>
      </article>

      <Footer />
    </main>
  )
}
