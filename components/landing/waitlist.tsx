"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  EnvelopeSimple,
  CheckCircle,
  Spinner as SpinnerIcon,
  User,
  MapPin,
  Fish,
} from "@phosphor-icons/react"
import { waitlistSchema, type WaitlistInput } from "@/lib/validations/waitlist"
import type { BrazilianState, FishingType, WaitlistStatus } from "@/types/waitlist"

const ESTADOS: { value: BrazilianState; label: string }[] = [
  { value: "AC", label: "Acre" }, { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" }, { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" }, { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" }, { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" }, { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" }, { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" }, { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" }, { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" }, { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" }, { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" }, { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" }, { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" }, { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
]

interface WaitlistFormState {
  nome: string
  email: string
  cidade: string
  estado: BrazilianState | ""
  tipo_pesca: FishingType[]
  tipo_usuario: "pescador" | "guia"
}

const fishingTypes: { value: FishingType; label: string; emoji: string }[] = [
  { value: "esportiva",   label: "Pesca Esportiva",   emoji: "🏆" },
  { value: "fly_fishing", label: "Fly Fishing",        emoji: "🪰" },
  { value: "mar_alto",    label: "Alto Mar",           emoji: "🌊" },
  { value: "costeira",    label: "Pesca Costeira",     emoji: "⚓" },
  { value: "agua_doce",   label: "Água Doce / Rio",    emoji: "🏞️" },
  { value: "noturna",     label: "Pesca Noturna",      emoji: "🌙" },
]

export function Waitlist() {
  const [form, setForm] = useState<WaitlistFormState>({
    nome: "",
    email: "",
    cidade: "",
    estado: "",
    tipo_pesca: [],
    tipo_usuario: "pescador",
  })
  const [status, setStatus] = useState<WaitlistStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [submittedName, setSubmittedName] = useState("")

  const handleChange = (field: keyof WaitlistFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email || !form.cidade || !form.estado || form.tipo_pesca.length === 0) return

    setStatus("loading")
    setErrorMsg("")

    const parsed = waitlistSchema.safeParse(form)
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Dados inválidos"
      setErrorMsg(firstError)
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

      setSubmittedName(form.nome)
      setStatus("success")
      setForm({ nome: "", email: "", cidade: "", estado: "", tipo_pesca: [], tipo_usuario: "pescador" })
    } catch {
      setErrorMsg("Falha de conexão. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <section className="py-20 bg-[#1c4194]" id="lista">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Seja o primeiro a saber quando lançarmos
            </h2>
            <p className="text-white/80 text-lg text-pretty">
              Entre na lista de espera e garanta acesso antecipado. Os primeiros cadastrados terão benefícios exclusivos.
            </p>
          </div>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-6 border border-white/20">
              <CheckCircle weight="fill" className="w-10 h-10 text-[#5a9d5a] shrink-0" />
              <div>
                <p className="font-bold text-white text-lg">Você está na lista, {submittedName || "pescador"}! 🎣</p>
                <p className="text-white/70 text-sm mt-1">
                  Avisaremos assim que a GoPesca estiver disponível. Fique de olho no seu e-mail.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Tipo de usuário toggle */}
              <div className="flex rounded-xl overflow-hidden border border-white/20 mb-2">
                {(["pescador", "guia"] as const).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => handleChange("tipo_usuario", tipo)}
                    className={`flex-1 py-3 text-sm font-semibold transition-all ${
                      form.tipo_usuario === tipo
                        ? "bg-[#d9853c] text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tipo === "pescador" ? "🎣 Sou Pescador" : "⚓ Sou Guia de Pesca"}
                  </button>
                ))}
              </div>

              {/* Nome */}
              <div className="relative">
                <User
                  weight="duotone"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d9853c] focus:bg-white/15 transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <EnvelopeSimple
                  weight="duotone"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d9853c] focus:bg-white/15 transition-all text-sm"
                />
              </div>

              {/* Cidade + Estado */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin
                    weight="duotone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Sua cidade"
                    value={form.cidade}
                    onChange={(e) => handleChange("cidade", e.target.value)}
                    required
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#d9853c] focus:bg-white/15 transition-all text-sm"
                  />
                </div>
                <select
                  value={form.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  required
                  className={`w-24 h-12 px-2 rounded-xl bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-[#d9853c] focus:bg-white/15 transition-all appearance-none text-center selectScrollbar ${
                    form.estado ? "text-white" : "text-white/40"
                  }`}
                >
                  <option value="" disabled className="bg-[#1c4194] text-white/40">UF</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf.value} value={uf.value} className="bg-[#1c4194] text-white">
                      {uf.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de pesca */}
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2 pl-1">
                  <Fish weight="duotone" className="inline w-4 h-4 mr-1 text-[#d9853c]" />
                  Tipo de pesca favorita
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fishingTypes.map((type) => {
                    const selected = form.tipo_pesca.includes(type.value)
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            tipo_pesca: selected
                              ? prev.tipo_pesca.filter((t) => t !== type.value)
                              : [...prev.tipo_pesca, type.value],
                          }))
                        }}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          selected
                            ? "bg-[#d9853c] border-[#d9853c] text-white"
                            : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40"
                        }`}
                      >
                        <span>{type.emoji}</span>
                        <span>{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="text-[#fca5a5] text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#d9853c] hover:bg-[#c87333] text-white font-bold h-12 text-base rounded-xl"
                disabled={status === "loading" || form.tipo_pesca.length === 0}
              >
                {status === "loading" ? (
                  <>
                    <SpinnerIcon className="mr-2 w-5 h-5 animate-spin" />
                    Entrando na lista...
                  </>
                ) : (
                  "Garantir meu lugar na lista 🎣"
                )}
              </Button>

              <p className="text-white/40 text-xs text-center">
                Sem spam. Só novidades importantes sobre o lançamento.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}