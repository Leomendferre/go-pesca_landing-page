"use client"

import {
  StarFourIcon,
  ClockIcon,
  SealPercentIcon,
  TrendUpIcon,
  CalendarCheckIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  XIcon,
  CheckIcon,
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
    description: "Pagamentos garantidos direto na sua conta após cada pescaria.",
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
              src="https://images.unsplash.com/photo-1529230117010-b6c436154f25?auto=format&fit=crop&w=800&q=80"
              alt="Guia de pesca segurando vara profissionalmente"
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
            Anuncie de graça. Pague só quando ganhar.
          </h2>

          <p className="mt-4 max-w-xl text-pretty text-base text-white/85 md:text-lg">
            Enquanto outras plataformas cobram mensalidade para você aparecer, na GoPesca o
            cadastro é gratuito. Você só paga uma pequena comissão quando recebe uma reserva 
            se não fechar, não paga nada.
          </p>

          {/* Diferencial central: grátis vs mensalidade */}
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2">
            <div className="flex items-start gap-3 bg-white/5 p-4">
              <XIcon weight="bold" className="mt-0.5 size-5 shrink-0 text-white/50" />
              <div>
                <p className="text-sm font-semibold text-white/70 line-through decoration-white/40">
                  Mensalidade fixa
                </p>
                <p className="mt-0.5 text-xs text-white/55">
                  Outras plataformas: você paga todo mês, mesmo sem nenhuma reserva.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-[#d9853c]/15 p-4">
              <CheckIcon weight="bold" className="mt-0.5 size-5 shrink-0 text-[#d9853c]" />
              <div>
                <p className="text-sm font-bold text-white">R$ 0 por mês</p>
                <p className="mt-0.5 text-xs text-white/75">
                  GoPesca: comissão só sobre reservas concluídas. Sem risco, sem custo fixo.
                </p>
              </div>
            </div>
          </div>

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
          <p className="mt-3 text-center text-xs text-white/60">
            Sem cartão de crédito. Sem mensalidade. Você só paga quando recebe uma reserva.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
