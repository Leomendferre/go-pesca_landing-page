"use client"

import { InstagramLogo, FacebookLogo, YoutubeLogo, WhatsappLogo } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="bg-[#0f2a35] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-24%20at%2016.02.22%20%282%29-N4sEyRoiqDGAUJ4eJMQWNOi5aexbBD.jpeg"
              alt="GoPesca"
              className="w-10 h-10 rounded-lg"
            />
            <span className="font-bold text-xl text-white">GoPesca</span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <InstagramLogo weight="fill" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <FacebookLogo weight="fill" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <YoutubeLogo weight="fill" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <WhatsappLogo weight="fill" className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/50 text-sm">
              2026 GoPesca. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
