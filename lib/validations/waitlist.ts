import { z } from "zod"

export const waitlistSchema = z
  .object({
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

    // Telefone/WhatsApp — máscara no cliente, mas armazenamos só os dígitos (DDD + número).
    telefone: z
      .string()
      .min(1, "Telefone obrigatório")
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => v.length === 10 || v.length === 11, "Informe um celular válido com DDD"),

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

    tipo_usuario: z.enum(["pescador", "guia"]),

    consentimento: z.literal(true, {
      errorMap: () => ({ message: "É preciso aceitar a Política de Privacidade para continuar" }),
    }),

    // Campos exclusivos do guia (validados condicionalmente no superRefine abaixo).
    especialidades: z
      .array(z.string().trim().min(1).max(40))
      .max(12, "Máximo de 12 espécies")
      .optional()
      .default([]),

    tipo_agua: z.enum(["doce", "salgada", "ambas"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipo_usuario !== "guia") return

    if (!data.especialidades || data.especialidades.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["especialidades"],
        message: "Selecione ou digite ao menos uma espécie de especialidade",
      })
    }
    if (!data.tipo_agua) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tipo_agua"],
        message: "Selecione em qual tipo de água você atua",
      })
    }
  })

export type WaitlistInput = z.infer<typeof waitlistSchema>
