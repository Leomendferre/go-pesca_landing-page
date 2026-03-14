"use client"

import { Button } from "@/components/ui/button"
import { MapPinIcon, FishIcon, UsersIcon, ArrowRightIcon } from "@phosphor-icons/react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#173440]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <FishIcon weight="fill" className="w-4 h-4 text-[#d9853c]" />
              <span>A nova era da pesca esportiva no Brasil</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
              Encontre o <span className="text-[#d9853c]">guia perfeito</span> para sua próxima aventura de pesca
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              Conectamos pescadores a guias verificados em todo o Brasil. Reserve online, pague com segurança e viva experiências inesquecíveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-[#d9853c] hover:bg-[#c87333] text-white font-semibold px-8" asChild>
                <a href="#lista">
                  Entrar na Lista de Espera
                  <ArrowRightIcon weight="bold" className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-background-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                <a href="#lista">
                  Sou Guia de Pesca
                </a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <MapPinIcon weight="fill" className="w-5 h-5 text-[#d9853c]" />
                  <span className="text-2xl font-bold text-white">50+</span>
                </div>
                <span className="text-white/60 text-sm">Destinos</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <UsersIcon weight="fill" className="w-5 h-5 text-[#d9853c]" />
                  <span className="text-2xl font-bold text-white">100+</span>
                </div>
                <span className="text-white/60 text-sm">Guias Verificados</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <FishIcon weight="fill" className="w-5 h-5 text-[#d9853c]" />
                  <span className="text-2xl font-bold text-white">30+</span>
                </div>
                <span className="text-white/60 text-sm">Espécies</span>
              </div>
            </div>
          </div>
          
          {/* Logo/Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-[#1c4194] rounded-full opacity-20 blur-3xl" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-24%20at%2016.02.22%20%282%29-N4sEyRoiqDGAUJ4eJMQWNOi5aexbBD.jpeg"
                alt="GoPesca Logo"
                className="relative w-full h-full object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
