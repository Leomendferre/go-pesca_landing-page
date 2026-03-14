import { createClient } from "@supabase/supabase-js"

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_WAITLIST_SUPABASE_URL!,
  process.env.WAITLIST_SUPABASE_SERVICE_ROLE_KEY!
)
