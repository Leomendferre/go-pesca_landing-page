"use client"

import { useState } from "react"
import {
  FishIcon,
  MagnifyingGlassIcon,
  CalendarCheckIcon,
  UserCircleIcon,
  TrendUpIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  type Icon,
} from "@phosphor-icons/react"
import { Reveal } from "@/components/landing/reveal"
import { selectPerfil, type Perfil } from "@/lib/perfil"

type Step = { num: string; icon: Icon; title: string; description: string }

const STEPS: Record<Perfil, Step[]> = {
  pescador: [
    {
      num: "01",
      icon: MagnifyingGlassIcon,
      title: "Encontre seu guia",
      description: "Busque por destino, espécie ou tipo de pesca e compare guias verificados perto de você.",
    },
    {
      num: "02",
      icon: CalendarCheckIcon,
      title: "Reserve a data",
      description: "Escolha o dia, confirme os detalhes e pague com segurança direto pela plataforma.",
    },
    {
      num: "03",
      icon: FishIcon,
      title: "Viva a pescaria",
      description: "Aproveite a experiência. O pagamento só vai para o guia depois que tudo der certo.",
    },
  ],
  guia: [
    {
      num: "01",
      icon: UserCircleIcon,
      title: "Crie seu perfil grátis",
      description: "Cadastre seus passeios, fotos e licenças sem pagar nada. Nossa equipe verifica e te ajuda no onboarding.",
    },
    {
      num: "02",
      icon: TrendUpIcon,
      title: "Receba reservas",
      description: "Apareça para milhares de pescadores e gerencie sua agenda com confirmações automáticas.",
    },
    {
      num: "03",
      icon: CurrencyDollarIcon,
      title: "Receba com segurança",
      description: "O pagamento cai direto na sua conta após cada pescaria. Sem calote, sem burocracia.",
    },
  ],
}

export function HowItWorks() {
  const [tab, setTab] = useState<Perfil>("pescador")
  const isAngler = tab === "pescador"
  const accent = isAngler ? "#2d72b9" : "#2f6e39"

  return (
    <section
      id="como-funciona"
      className="overflow-hidden bg-gradient-to-b from-[#173440] to-[#1d404f] py-16 text-white md:py-24"
    >
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#4aa6de]">
            Como funciona
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold md:text-[2.6rem]">
            Simples para os dois lados da linha
          </h2>
          <p className="mt-4 text-pretty text-base text-white/75 md:text-lg">
            Escolha o seu perfil e veja como é fácil começar na GoPesca.
          </p>
        </Reveal>

        {/* Tabs */}
        <div className="mb-10 flex justify-center md:mb-12">
          <div className="inline-flex rounded-full border border-white/15 bg-white/8 p-1.5">
            {(["pescador", "guia"] as const).map((key) => {
              const active = tab === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:px-6 ${
                    active
                      ? key === "pescador"
                        ? "bg-[#2d72b9] text-white"
                        : "bg-[#2f6e39] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {key === "pescador" ? (
                    <FishIcon weight={active ? "fill" : "regular"} className="size-4.5" />
                  ) : (
                    <AnchorMark className="size-4.5" />
                  )}
                  {key === "pescador" ? "Sou pescador" : "Sou guia"}
                </button>
              )
            })}
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS[tab].map((step, i) => (
            <Reveal
              key={`${tab}-${step.num}`}
              delay={i * 80}
              className="rounded-2xl border border-white/12 bg-white/5 p-7"
            >
              <div className="font-display text-[2.4rem] font-bold leading-none text-white/20">
                {step.num}
              </div>
              <div
                className="my-4 grid size-12 place-items-center rounded-xl"
                style={{ backgroundColor: accent }}
              >
                <step.icon weight="bold" className="size-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-white/70">{step.description}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#lista"
            onClick={() => selectPerfil(tab)}
            className="inline-flex items-center gap-2 rounded-full bg-[#d9853c] px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_28px_-12px_rgba(217,133,60,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#c87333]"
          >
            Quero entrar na lista de espera
            <ArrowRightIcon weight="bold" className="size-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

/** Small anchor glyph for the "Sou guia" tab (matches the brand book line motif). */
function AnchorMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v3" />
      <path d="M5.5 9.5 12 6l6.5 3.5" />
      <path d="M4 14c2.5 2 5.5 3 8 3s5.5-1 8-3" />
    </svg>
  )
}
