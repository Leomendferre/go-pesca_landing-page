import { NextRequest, NextResponse } from "next/server"
import { waitlistSchema } from "@/lib/validations/waitlist"
import { supabaseAdmin } from "@/lib/supabase/server"
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde um momento." },
        { status: 429 }
      )
    }

    const body = await req.json()

    const parsed = waitlistSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const referrer = req.headers.get("referer") ?? null

    const { error } = await supabaseAdmin
      .from("waitlist")
      .insert({ ...parsed.data, referrer })

    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "Não foi possível cadastrar. Tente com outro e-mail." },
        { status: 409 }
      )
    }

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("[waitlist] erro:", err)
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 })
}
