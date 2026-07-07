"use client"

import {
  StarFourIcon,
  ClockIcon,
  SealPercentIcon,
  TrendUpIcon,
  CalendarCheckIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  type Icon,
} from "@phosphor-icons/react"
import { Reveal } from "@/components/landing/reveal"
import { selectPerfil } from "@/lib/perfil"

const BENEFITS: { icon: Icon; title: string; description: string }[] = [
  {
    icon: SealPercentIcon,
    title: "Comece sem pagar nada",
    description: "Cadastro e anúncios 100% gratuitos. Sem mensalidade e sem taxa de adesão.",
  },
  {
    icon: TrendUpIcon,
    title: "Aumente sua visibilidade",
    description: "Seja encontrado por milhares de pescadores em todo o Brasil.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Gestão simplificada",
    description: "Calendário integrado, reservas automáticas e confirmações instantâneas.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Receba com segurança",
    description: "Pagamentos garantidos direto na sua conta.",
  },
]

export function GuideCTA() {
  return (
    <section
      id="guias"
      className="overflow-hidden bg-gradient-to-br from-[#265a2e] to-[#1e4a25] py-16 text-white md:py-24"
    >
      <div className="container mx-auto grid items-center gap-10 px-5 md:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Visual — first on mobile, right on desktop */}
        <Reveal className="order-first lg:order-last">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <img
              src="/images/guia-de-pesca.jpg"
              alt="Guia de pesca segurando vara profissionalmente"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl border border-white/14 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 right-2 max-w-[14rem] rounded-2xl bg-white p-4 shadow-xl sm:-right-4">
              <b className="font-display text-3xl font-bold leading-none text-[#265a2e]">+38%</b>
              <span className="mt-1 block text-xs text-[#16323d]/65">
                de ocupação média na agenda dos guias parceiros*
              </span>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal as="div">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            <StarFourIcon weight="fill" className="size-4 text-[#d9853c]" />
            Para guias de pesca
          </span>

          <h2 className="mt-4 text-balance text-3xl font-bold md:text-[2.6rem]">
            Anuncie de graça, preencha sua agenda e receba com segurança.
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
            <ClockIcon weight="bold" className="size-5 shrink-0 text-[#d9853c]" />
            Vagas de guia fundador limitadas por região com destaque nas primeiras buscas.
          </div>
          <div className="mt-7 flex flex-col gap-5">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/12">
                  <benefit.icon weight="duotone" className="size-5.5 text-[#d9853c]" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-white/75">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#lista"
            onClick={() => selectPerfil("guia")}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d9853c] px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_28px_-12px_rgba(217,133,60,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#c87333]"
          >
            Cadastrar grátis como guia fundador
            <ArrowRightIcon weight="bold" className="size-5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
