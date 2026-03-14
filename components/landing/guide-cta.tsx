"use client"

import { Button } from "@/components/ui/button"
import { Anchor, ChartLineUp, Calendar, CurrencyDollar, ArrowRight } from "@phosphor-icons/react"

const benefits = [
  {
    icon: ChartLineUp,
    title: "Aumente sua visibilidade",
    description: "Seja encontrado por milhares de pescadores em todo o Brasil."
  },
  {
    icon: Calendar,
    title: "Gestão simplificada",
    description: "Calendário integrado, reservas automáticas e confirmações instantâneas."
  },
  {
    icon: CurrencyDollar,
    title: "Receba com segurança",
    description: "Pagamentos garantidos direto na sua conta após cada pescaria."
  }
]

export function GuideCTA() {
  return (
    <section className="py-20 bg-[#265a2e]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <Anchor weight="fill" className="w-4 h-4 text-[#d9853c]" />
              <span>Para Guias de Pesca</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Transforme sua paixão em negócio profissional
            </h2>
            
            <p className="text-white/80 text-lg mb-8 text-pretty">
              Cadastre-se na GoPesca e conecte-se com pescadores que buscam exatamente o que você oferece. Sem burocracia, com total suporte.
            </p>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <benefit.icon weight="duotone" className="w-5 h-5 text-[#d9853c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="bg-[#d9853c] hover:bg-[#c87333] text-white font-semibold" asChild>
              <a href="#lista">
                Quero ser um Guia GoPesca
                <ArrowRight weight="bold" className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
          
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1c4194] rounded-full opacity-20 blur-3xl" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-24%20at%2016.02.22%20%281%29-IvJntw4njBWULGv1mpBMRW49Z4qslJ.jpeg"
                alt="GoPesca para Guias"
                className="relative w-64 h-64 md:w-80 md:h-80 object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
