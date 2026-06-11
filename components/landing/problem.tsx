"use client"

import {
  MagnifyingGlassIcon,
  CreditCardIcon,
  ShieldWarningIcon,
  QuestionIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react"
import { Reveal } from "@/components/landing/reveal"

const PROBLEMS: { icon: Icon; title: string; description: string }[] = [
  {
    icon: WhatsappLogoIcon,
    title: "Tudo acontece no WhatsApp",
    description: "Informações dispersas, difícil comparar opções e organizar reservas.",
  },
  {
    icon: ShieldWarningIcon,
    title: "Falta de confiança",
    description: "Nem sempre é fácil saber se o guia ou a experiência realmente atenderão às expectativas.",
  },
  {
    icon: CreditCardIcon,
    title: "Pagamentos inseguros",
    description: "Transferências e negociações informais geram insegurança para ambos os lados.",
  },
  {
    icon: QuestionIcon,
    title: "Descobrir novos destinos exige muito esforço",
    description: "As melhores oportunidades muitas vezes dependem apenas de indicação.",
  },
]

export function Problem() {
  return (
    <section id="problema" className="bg-[#f3f6f7] py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#ed6c21]">
            O problema
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-[#173440] md:text-[2.6rem]">
            Planejar uma pescaria não deveria ser tão difícil
          </h2>
          <p className="mt-4 text-pretty text-base text-[#16323d]/65 md:text-lg">
            Pescadores e guias perdem tempo e dinheiro com processos informais. A GoPesca
            resolve os dois lados.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, i) => (
            <Reveal
              key={problem.title}
              delay={i * 70}
              className="rounded-2xl border border-[#16323d]/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-[#ed6c21]/10">
                <problem.icon weight="duotone" className="size-6 text-[#ed6c21]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#173440]">{problem.title}</h3>
              <p className="text-sm text-[#16323d]/65">{problem.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
