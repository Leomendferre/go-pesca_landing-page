"use client"

import { InstagramLogoIcon, ThreadsLogoIcon } from "@phosphor-icons/react"
import { Brand } from "@/components/landing/brand"
import { PRIVACY_EMAIL } from "@/lib/legal"

export function Footer() {
  return (
    <footer className="bg-[#173440] px-0 py-14 text-white">
      <div className="container mx-auto px-5 md:px-6">
        {/* Top */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Brand size="text-[1.3rem]" />
          </div>
          <p className="max-w-[32ch] text-sm text-white/60">
            Sua aventura na pesca começa aqui.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/gopescabr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white/75 transition-all hover:-translate-y-0.5 hover:bg-[#d9853c] hover:text-white"
            >
              <InstagramLogoIcon weight="fill" className="size-5" />
            </a>
            <a
              href="https://www.threads.com/@gopescabr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white/75 transition-all hover:-translate-y-0.5 hover:bg-[#d9853c] hover:text-white"
            >
              <ThreadsLogoIcon weight="fill" className="size-5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 pt-7 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-white/50">© 2026 GoPesca. Todos os direitos reservados.</p>
          <nav className="flex gap-6">
            <a href="/termos" className="text-sm text-white/55 transition-colors hover:text-white">
              Termos de uso
            </a>
            <a href="/privacidade" className="text-sm text-white/55 transition-colors hover:text-white">
              Privacidade
            </a>
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
