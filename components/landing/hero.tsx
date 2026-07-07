"use client"

import { ArrowRightIcon, MapPinIcon, UsersIcon, FishIcon } from "@phosphor-icons/react"
import { selectPerfil } from "@/lib/perfil"

const STATS = [
  { icon: MapPinIcon, value: "50+", label: "Destinos" },
  { icon: UsersIcon, value: "450+", label: "Guias verificados" },
  { icon: FishIcon, value: "100+", label: "Espécies" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden text-white">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-pescaria.jpg"
          alt="Pescaria ao amanhecer — vara de pesca com pôr do sol dourado"
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#173440]/85 via-[#173440]/60 to-[#1c4194]/90" />

      <div className="container relative z-[2] mx-auto flex min-h-[100svh] flex-col justify-center px-5 pb-16 pt-32 md:px-6 md:pt-36">
        <div className="max-w-3xl">
          {/* Pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm sm:text-sm">
            <span className="gp-led size-2 rounded-full bg-[#d9853c]" />
            A nova forma de reservar pescarias no Brasil
          </span>

          <h1 className="mt-5 text-balance text-[2.4rem] font-bold leading-[1.05] sm:text-5xl lg:text-[4.2rem]">
            Sua <span className="text-[#d9853c]">aventura</span>
            <br />
            na pesca começa aqui.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
            A GoPesca conecta pescadores a guias verificados e
            experiências de pesca cuidadosamente selecionadas,
            com mais segurança, praticidade e confiança em cada etapa.
          </p>

          {/* Dual path cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <PathCard
              variant="guide"
              tag="PARA GUIAS"
              title="Anuncie de graça e sem mensalidade."
              description="Mostre seu trabalho para novos pescadores, preencha sua agenda com segurança e previsibilidade."
              cta="Entrar na lista de guias"
              perfil="guia"
            />
            <PathCard
              variant="angler"
              tag="PARA PESCADORES"
              title="Encontre sua próxima grande pescaria."
              description="Descubra guias verificados, compare destinos, experiências e avaliações reais. Reserve com confiança em poucos minutos."
              cta="Garantir acesso antecipado"
              perfil="pescador"
            />
          </div>

          {/* Stats */}
          <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-5">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2">
                  <stat.icon weight="fill" className="size-6 text-[#d9853c]" />
                  <span className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</span>
                </div>
                <span className="text-sm font-semibold text-white/60">{stat.label}</span>
              </div>
            ))}

            <span className="text-xs font-semibold text-white/60 w-full text-center">* Números projetados para lançamento da plataforma.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function PathCard({
  variant,
  tag,
  title,
  description,
  cta,
  perfil,
}: {
  variant: "guide" | "angler"
  tag?: string
  title: string
  description: string
  cta: string
  perfil: "guia" | "pescador"
}) {
  const isGuide = variant === "guide"
  return (
    <a
      href="#lista"
      onClick={() => selectPerfil(perfil)}
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/16 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/40 hover:shadow-2xl ${isGuide
        ? "bg-gradient-to-br from-[#265a2e]/55 to-[#2f6e39]/20"
        : "bg-gradient-to-br from-[#1c4194]/55 to-[#4aa6de]/20"
        }`}
    >

      {isGuide ? (
        <div className="flex items-center gap-2">
          <span
            className="grid size-12 place-items-center rounded-xl bg-[#2f6e39]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white">
              <path d="M12 3v3" />
              <path d="M5.5 9.5 12 6l6.5 3.5" />
              <path d="M4 14c2.5 2 5.5 3 8 3s5.5-1 8-3" />
              <path d="M6 18c2 1.3 4 2 6 2s4-.7 6-2" />
            </svg>
          </span>

          <span className="text-[0.675rem] uppercase tracking-wider text-white">
            {tag}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className="grid size-12 place-items-center rounded-xl bg-[#2d72b9]"
          >
            <FishIcon weight="bold" className="size-6 text-white" />
          </span>

          <span className="text-[0.675rem] uppercase tracking-wider text-white">
            {tag}
          </span>
        </div>
      )}
      <h3 className="font-display text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-white/80 min-h-[60px]">{description}</p>
      <span
        className={`mt-1 inline-flex items-center gap-1.5 text-sm font-bold ${isGuide ? "text-[#d9853c]" : "text-[#4aa6de]"
          }`}
      >
        {cta}
        <ArrowRightIcon weight="bold" className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  )
}
