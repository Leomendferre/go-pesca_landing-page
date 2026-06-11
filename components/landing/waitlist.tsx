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
  DropIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react"
import { waitlistSchema } from "@/lib/validations/waitlist"
import { PERFIL_EVENT, type Perfil } from "@/lib/perfil"
import type { BrazilianState, WaterType, WaitlistStatus } from "@/types/waitlist"

const ESTADOS: BrazilianState[] = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]

// Espécies clássicas de pesca esportiva no Brasil (água doce + salgada).
const PEIXES_CLASSICOS = [
  "Tucunaré", "Dourado", "Tambaqui", "Pintado", "Traíra", "Pirarucu",
  "Robalo", "Tilápia", "Pacu", "Corvina", "Garoupa", "Anchova",
  "Cavala", "Black Bass",
]

const TIPOS_AGUA: { value: WaterType; label: string }[] = [
  { value: "doce", label: "Água doce" },
  { value: "salgada", label: "Água salgada" },
  { value: "ambas", label: "Doce e salgada" },
]

const COPY: Record<Perfil, { title: string; desc: string; cta: string; toggle: string }> = {
  pescador: {
    title: "Entre na lista prioritária da GoPesca",
    desc: "Seja um dos primeiros a reservar com guias verificados e ganhe benefícios exclusivos de fundador.",
    cta: "Quero acesso antecipado 🎣",
    toggle: "Quero reservar",
  },
  guia: {
    title: "Seja um guia fundador da GoPesca",
    desc: "Anuncie de graça, sem mensalidade você só paga quando recebe uma reserva. Vagas de fundador limitadas por região.",
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
  // Exclusivos do guia
  especialidades: string[]
  tipo_agua: WaterType | ""
}

const EMPTY_FORM: FormState = {
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
  estado: "",
  tipo_usuario: "pescador",
  especialidades: [],
  tipo_agua: "",
}

export function Waitlist() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<WaitlistStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [submittedName, setSubmittedName] = useState("")
  const [peixeCustom, setPeixeCustom] = useState("")
  const successRef = useRef<HTMLDivElement | null>(null)

  const copy = COPY[form.tipo_usuario]
  const isGuia = form.tipo_usuario === "guia"

  const toggleEspecie = (nome: string) => {
    setForm((prev) => ({
      ...prev,
      especialidades: prev.especialidades.includes(nome)
        ? prev.especialidades.filter((e) => e !== nome)
        : [...prev.especialidades, nome],
    }))
  }

  const addCustomPeixe = () => {
    const nome = peixeCustom.trim()
    if (!nome) return
    const exists = form.especialidades.some((e) => e.toLowerCase() === nome.toLowerCase())
    if (!exists && form.especialidades.length < 12) {
      setForm((prev) => ({ ...prev, especialidades: [...prev.especialidades, nome] }))
    }
    setPeixeCustom("")
  }

  const removeEspecie = (nome: string) => {
    setForm((prev) => ({
      ...prev,
      especialidades: prev.especialidades.filter((e) => e !== nome),
    }))
  }

  // Espécies digitadas pelo guia que não estão na lista de chips clássicos.
  const customSpecies = form.especialidades.filter((e) => !PEIXES_CLASSICOS.includes(e))

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

    // Campos de guia só são enviados quando o perfil é guia.
    const payload = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cidade: form.cidade,
      estado: form.estado,
      tipo_usuario: form.tipo_usuario,
      especialidades: isGuia ? form.especialidades : [],
      tipo_agua: isGuia && form.tipo_agua ? form.tipo_agua : undefined,
    }

    const parsed = waitlistSchema.safeParse(payload)
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
      setPeixeCustom("")
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

              {/* Campos exclusivos do guia */}
              {isGuia && (
                <div className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 p-4">
                  {/* Espécies de especialidade */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/70">
                      <FishIcon weight="duotone" className="size-4 text-[#d9853c]" />
                      Espécies de especialidade
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {PEIXES_CLASSICOS.map((peixe) => {
                        const selected = form.especialidades.includes(peixe)
                        return (
                          <button
                            key={peixe}
                            type="button"
                            onClick={() => toggleEspecie(peixe)}
                            aria-pressed={selected}
                            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                              selected
                                ? "border-[#d9853c] bg-[#d9853c] text-white"
                                : "border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                            }`}
                          >
                            {peixe}
                          </button>
                        )
                      })}

                      {/* Espécies digitadas (custom) */}
                      {customSpecies.map((peixe) => (
                        <span
                          key={peixe}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#d9853c] bg-[#d9853c] px-3 py-1.5 text-sm font-medium text-white"
                        >
                          {peixe}
                          <button
                            type="button"
                            onClick={() => removeEspecie(peixe)}
                            aria-label={`Remover ${peixe}`}
                            className="grid place-items-center rounded-full hover:bg-white/20"
                          >
                            <XIcon weight="bold" className="size-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Adicionar espécie fora da lista */}
                    <div className="mt-2.5 flex gap-2">
                      <input
                        type="text"
                        value={peixeCustom}
                        onChange={(e) => setPeixeCustom(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCustomPeixe()
                          }
                        }}
                        placeholder="Outra espécie? Digite e adicione"
                        maxLength={40}
                        className="h-12 w-full rounded-xl border border-white/22 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addCustomPeixe}
                        className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-xl border border-white/22 bg-white/10 px-4 text-sm font-bold text-white transition-all hover:bg-white/20"
                      >
                        <PlusIcon weight="bold" className="size-4" />
                        Adicionar
                      </button>
                    </div>
                  </div>

                  {/* Tipo de água */}
                  <div>
                    <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/70">
                      <DropIcon weight="duotone" className="size-4 text-[#d9853c]" />
                      Tipo de água em que atua
                    </label>
                    <select
                      name="tipo_agua"
                      value={form.tipo_agua}
                      onChange={(e) => setField("tipo_agua", e.target.value)}
                      aria-label="Tipo de água"
                      className={`selectScrollbar h-13 w-full appearance-none rounded-xl border border-white/22 bg-white/10 px-4 text-sm transition-all focus:border-[#d9853c] focus:bg-white/15 focus:outline-none ${
                        form.tipo_agua ? "text-white" : "text-white/50"
                      }`}
                    >
                      <option value="" disabled className="bg-[#1c4194] text-white/60">
                        Selecione o tipo de água
                      </option>
                      {TIPOS_AGUA.map((agua) => (
                        <option key={agua.value} value={agua.value} className="bg-[#1c4194] text-white">
                          {agua.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

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
