export type Perfil = "pescador" | "guia"

/** Event name used to sync "Sou guia / Quero reservar" CTAs with the waitlist toggle. */
export const PERFIL_EVENT = "gp:perfil"

/**
 * Broadcasts the chosen profile so the waitlist form can switch its toggle/copy.
 * CTAs still navigate to #lista via their href; this only syncs the form state.
 */
export function selectPerfil(perfil: Perfil) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<Perfil>(PERFIL_EVENT, { detail: perfil }))
  }
}
