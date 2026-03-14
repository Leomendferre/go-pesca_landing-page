export type FishingType =
  | "esportiva"
  | "fly_fishing"
  | "mar_alto"
  | "costeira"
  | "agua_doce"
  | "noturna"
  | "outra"

export type UserType = "pescador" | "guia"

export type BrazilianState =
  | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO"
  | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI"
  | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO"

export type WaitlistStatus = "idle" | "loading" | "success" | "error"
