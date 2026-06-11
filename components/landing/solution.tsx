"use client"

import {
  ShieldCheckIcon,
  CalendarCheckIcon,
  WalletIcon,
  StarIcon,
  SealCheckIcon,
  HeadsetIcon,
  MapPinIcon,
  type Icon,
} from "@phosphor-icons/react"
import { Reveal } from "@/components/landing/reveal"

const SOLUTIONS: { icon: Icon; title: string; description: string }[] = [
  {
    icon: ShieldCheckIcon,
    title: "Guias verificados",
    description: "Mais segurança, confiança e praticidade para sua próxima pescaria.",
  },
  {
    icon: WalletIcon,
    title: "Pagamento seguro",
    description: "Mais segurança, confiança e praticidade para sua próxima pescaria.",
  },
  {
    icon: StarIcon,
    title: "Avaliações reais",
    description: "Leia experiências de outros pescadores antes de escolher seu guia.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Reserva online",
    description: "Agende em poucos cliques, com confirmação instantânea e lembretes automáticos.",
  },
  {
    icon: MapPinIcon,
    title: "Novos destinos",
    description: "Mais segurança, confiança e praticidade para sua próxima pescaria.",
  },
  {
    icon: SealCheckIcon,
    title: "Garantia GoPesca",
    description: "Reembolso total se a experiência não corresponder ao que foi anunciado.",
  },
  {
    icon: HeadsetIcon,
    title: "Suporte dedicado",
    description: "Nossa equipe ajuda antes, durante e depois da sua pescaria.",
  },
]

export function Solution() {
  return (
    <section id="solucao" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#265a2e]">
            A plataforma
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold text-[#173440] md:text-[2.6rem]">
            Tudo o que faltava para conectar pesca e confiança
          </h2>
          <p className="mt-4 text-pretty text-base text-[#16323d]/65 md:text-lg">
            Criamos a solução que une pescadores e guias de forma segura, simples e profissional.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => (
            <Reveal
              key={solution.title}
              delay={(i % 3) * 70}
              className="group rounded-2xl border border-[#16323d]/6 bg-[#f3f6f7] p-7 transition-all hover:-translate-y-1.5 hover:border-[#1c4194]/20 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-4 grid size-13 place-items-center rounded-xl bg-[#1c4194]/10">
                <solution.icon weight="duotone" className="size-6.5 text-[#1c4194]" />
              </div>
              <h3 className="mb-2.5 text-lg font-semibold text-[#173440]">{solution.title}</h3>
              <p className="text-sm text-[#16323d]/65">{solution.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
