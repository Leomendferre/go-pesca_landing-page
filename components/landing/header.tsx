"use client"

import { useEffect, useState } from "react"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { Brand } from "@/components/landing/brand"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#problema", label: "O problema" },
  { href: "#solucao", label: "A plataforma" },
  { href: "#guias", label: "Para guias" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#173440]/92 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-5 md:px-6">
        <div className="flex h-[72px] items-center justify-between">
          <Brand href="#top" size="text-xl md:text-[1.35rem]" />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#lista"
              className="rounded-full border border-white/40 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-white hover:bg-white/15"
            >
              Quero reservar
            </a>
            <a
              href="#lista"
              className="rounded-full bg-[#d9853c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(217,133,60,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#c87333]"
            >
              Sou guia
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-lg p-2 text-white lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <XIcon weight="bold" className="size-7" /> : <ListIcon weight="bold" className="size-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#173440] px-5 pb-7 pt-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-3 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="#lista"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-center text-base font-bold text-white transition-all hover:bg-white/15"
            >
              Quero reservar
            </a>
            <a
              href="#lista"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-[#d9853c] px-5 py-3 text-center text-base font-bold text-white transition-all hover:bg-[#c87333]"
            >
              Sou guia de pesca
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
