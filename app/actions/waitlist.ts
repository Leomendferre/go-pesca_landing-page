"use server"

import { waitlistSchema, type WaitlistInput } from "@/lib/validations/waitlist"
import { supabaseAdmin } from "@/lib/supabase/server"

type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitWaitlist(data: WaitlistInput): Promise<ActionResult> {
  const parsed = waitlistSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." }
  }

  const { error } = await supabaseAdmin
    .from("waitlist")
    .insert(parsed.data)

  if (error?.code === "23505") {
    return {
      success: false,
      error: "Não foi possível cadastrar. Tente com outro e-mail.",
    }
  }

  if (error) {
    console.error("[waitlist] erro:", error)
    return { success: false, error: "Erro interno. Tente novamente." }
  }

  return { success: true }
}
