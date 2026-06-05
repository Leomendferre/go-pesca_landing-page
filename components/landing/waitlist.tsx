"use client"

import { useEffect, useRef, useState } from "react"
import {
  UserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  FishIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react"
import { waitlistSchema } from "@/lib/validations/waitlist"
import { PERFIL_EVENT, type Perfil } from "@/lib/perfil"
import type { BrazilianState, WaitlistStatus } from "@/types/waitlist"

const ESTADOS: BrazilianState[] = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]

const COPY: Record<Perfil, { title: string; desc: string; cta: string; toggle: string }> = {
  pescador: {
    title: "Entre na lista prioritária da GoPesca",
    desc: "Seja um dos primeiros a reservar com guias verificados — e ganhe benefícios exclusivos de fundador.",
    cta: "Quero acesso antecipado 🎣",
    toggle: "Quero reservar",
  },
  guia: {
    title: "Seja um guia fundador da GoPesca",
    desc: "Garanta destaque na sua região e lote sua agenda desde o lançamento. Vagas de fundador são limitadas por área.",
    cta: "Quero captar mais clientes 🚀",
    toggle: "Quero captar clientes",
  },
}

/** Brazilian phone mask: (11) 99999-9999 / (11) 9999-9999 */
function formatPhone(value: string): string {
  const v = value.replace(/\D/g, "").slice(0, 11)
  if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3")
  if (v.length > 6) return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3")
  if (v.length > 2) return v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2")
  if (v.length > 0) return v.replace(/^(\d{0,2}).*/, "($1")
  return ""
}

interface FormState {
  nome: string
  email: string
  telefone: string
  cidade: string
  estado: BrazilianState | ""
  tipo_usuario: Perfil
}

const EMPTY_FORM: FormState = {
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
  estado: "",
  tipo_usuario: "pescador",
}

export function Waitlist() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<WaitlistStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [submittedName, setSubmittedName] = useState("")
  const successRef = useRef<HTMLDivElement | null>(null)

  const copy = COPY[form.tipo_usuario]

  // Sync the toggle when a "Sou guia / Quero reservar" CTA is clicked elsewhere.
  useEffect(() => {
    const handler = (e: Event) => {
      const perfil = (e as CustomEvent<Perfil>).detail
      if (perfil === "pescador" || perfil === "guia") {
        setForm((prev) => ({ ...prev, tipo_usuario: perfil }))
      }
    }
    window.addEventListener(PERFIL_EVENT, handler)
    return () => window.removeEventListener(PERFIL_EVENT, handler)
  }, [])

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const parsed = waitlistSchema.safeParse(form)
    if (!parsed.success) {
      setErrorMsg(parsed.error.errors[0]?.message ?? "Verifique os campos e tente novamente.")
      setStatus("error")
      return
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error ?? "Erro desconhecido")
        setStatus("error")
        return
      }

      setSubmittedName(form.nome.split(" ")[0] ?? "")
      setStatus("success")
      setForm({ ...EMPTY_FORM, tipo_usuario: form.tipo_usuario })
      requestAnimationFrame(() =>
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      )
    } catch {
      setErrorMsg("Falha de conexão. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <section
      id="lista"
      className="relative overflow-hidden bg-gradient-to-b from-[#1c4194] to-[#16357c] py-16 text-white md:py-24"
    >
      {/* soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(74,166,222,0.2),transparent_60%)]" />

      <div className="container relative z-10 mx-auto px-5 md:px-6">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h2 className="text-balance text-3xl font-bold md:text-[2.5rem]">{copy.title}</h2>
            <p className="mt-3 text-pretty text-base text-white/85 md:text-lg">{copy.desc}</p>
          </div>

          {status === "success" ? (
            <div
              ref={successRef}
              className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-6"
            >
              <CheckCircleIcon weight="fill" className="size-11 shrink-0 text-[#5fae5f]" />
              <div>
                <b className="text-lg">
                  {submittedName ? `${submittedName}, você` : "Você"} está na lista! 🎣
                </b>
                <p className="mt-1 text-sm text-white/75">
                  Avisaremos assim que a GoPesca estiver disponível. Fique de olho no seu e-mail.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
              {/* Profile toggle */}
              <div className="mb-1 flex overflow-hidden rounded-2xl border border-white/22">
                {(["pescador", "guia"] as const).map((key) => {
                  const active = form.tipo_usuario === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setField("tipo_usuario", key)}
                      className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold transition-colors ${
                        active ? "bg-[#d9853c] text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <FishIcon weight={active ? "fill" : "regular"} className="size-4.5" />
                      {COPY[key].toggle}
                    </button>
                  )
                })}
              </div>

              <Field icon={<UserIcon weight="duotone" className="size-5" />}>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={(e) => setField("nome", e.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  required
                  className="h-13 w-full rounded-xl border border-white/22 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none"
                />
              </Field>

              <Field icon={<EnvelopeSimpleIcon weight="duotone" className="size-5" />}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Seu melhor e-mail"
                  autoComplete="email"
                  required
                  className="h-13 w-full rounded-xl border border-white/22 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none"
                />
              </Field>

              <Field icon={<PhoneIcon weight="duotone" className="size-5" />}>
                <input
                  type="tel"
                  name="telefone"
                  inputMode="tel"
                  value={form.telefone}
                  onChange={(e) => setField("telefone", formatPhone(e.target.value))}
                  placeholder="Celular / WhatsApp (DDD + número)"
                  autoComplete="tel"
                  required
                  className="h-13 w-full rounded-xl border border-white/22 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none"
                />
              </Field>

              {/* Cidade + UF */}
              <div className="grid grid-cols-[1fr_84px] gap-3 sm:grid-cols-[1fr_96px]">
                <Field icon={<MapPinIcon weight="duotone" className="size-5" />}>
                  <input
                    type="text"
                    name="cidade"
                    value={form.cidade}
                    onChange={(e) => setField("cidade", e.target.value)}
                    placeholder="Sua cidade"
                    autoComplete="address-level2"
                    required
                    className="h-13 w-full rounded-xl border border-white/22 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none"
                  />
                </Field>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={(e) => setField("estado", e.target.value)}
                  required
                  aria-label="Estado"
                  className={`selectScrollbar h-13 w-full appearance-none rounded-xl border border-white/22 bg-white/10 px-3 text-center text-sm transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none ${
                    form.estado ? "text-white" : "text-white/50"
                  }`}
                >
                  <option value="" disabled className="bg-[#1c4194] text-white/60">
                    UF
                  </option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf} className="bg-[#1c4194] text-white">
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-[#fca5a5]">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d9853c] text-base font-bold text-white shadow-[0_14px_28px_-12px_rgba(217,133,60,0.8)] transition-all hover:bg-[#c87333] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <SpinnerGapIcon className="size-5 animate-spin" />
                    Entrando na lista...
                  </>
                ) : (
                  copy.cta
                )}
              </button>

              <p className="text-center text-xs text-white/50">
                Sem spam. Só novidades importantes sobre o lançamento.
              </p>
            </form>
          )}

          {/* Trust badges */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Trust icon={<ShieldCheckIcon weight="bold" className="size-4.5 text-[#4aa6de]" />} label="Dados protegidos" />
            <Trust icon={<ClockIcon weight="bold" className="size-4.5 text-[#4aa6de]" />} label="Acesso antecipado" />
            <Trust icon={<StarIcon weight="bold" className="size-4.5 text-[#4aa6de]" />} label="Benefícios de fundador" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45">
        {icon}
      </span>
      {children}
    </div>
  )
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/75">
      {icon}
      {label}
    </span>
  )
}
