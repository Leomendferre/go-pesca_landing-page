import { z } from "zod"

export const waitlistSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo")
    .transform((v) => v.trim()),

  email: z
    .string()
    .email("E-mail inválido")
    .max(254)
    .transform((v) => v.trim().toLowerCase()),

  cidade: z
    .string()
    .min(2, "Cidade muito curta")
    .max(100)
    .transform((v) => v.trim()),

  estado: z.enum([
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
  ], { message: "Selecione um estado" }),

  tipo_pesca: z
    .array(
      z.enum([
        "esportiva",
        "fly_fishing",
        "mar_alto",
        "costeira",
        "agua_doce",
        "noturna",
        "outra",
      ])
    )
    .min(1, "Selecione pelo menos um tipo de pesca"),

  tipo_usuario: z.enum(["pescador", "guia"]),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>
