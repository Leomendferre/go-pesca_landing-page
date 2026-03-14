"use client"

import { Button } from "@/components/ui/button"
import { ListIcon, X } from "@phosphor-icons/react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#173440]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-24%20at%2016.02.22%20%282%29-N4sEyRoiqDGAUJ4eJMQWNOi5aexbBD.jpeg"
              alt="GoPesca"
              className="w-10 h-10 rounded-lg"
            />
            <span className="font-bold text-xl text-white">GoPesca</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              O Problema
            </a>
            <a href="#solucao" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              A Solução
            </a>
            <a href="#guias" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Para Guias
            </a>
          </nav>
          
          {/* CTA */}
          <div className="hidden md:block">
            <Button className="bg-[#d9853c] hover:bg-[#c87333] text-white font-semibold" asChild>
              <a href="#lista">Entrar na Lista</a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X weight="bold" className="w-6 h-6" /> : <ListIcon weight="bold" className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <a href="#problema" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                O Problema
              </a>
              <a href="#solucao" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                A Solução
              </a>
              <a href="#guias" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Para Guias
              </a>
              <Button className="bg-[#d9853c] hover:bg-[#c87333] text-white font-semibold w-full" asChild>
                <a href="#lista">Entrar na Lista</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
