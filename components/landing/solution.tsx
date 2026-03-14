"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HeadsetIcon, CheckCircleIcon, ShieldCheckIcon, CalendarCheckIcon, WalletIcon, StarIcon } from "@phosphor-icons/react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const solutions = [
  {
    icon: ShieldCheckIcon,
    title: "Guias Verificados",
    description: "Todos os guias passam por verificação de documentos, licenças e avaliações de clientes."
  },
  {
    icon: CalendarCheckIcon,
    title: "Reserva Online",
    description: "Agende sua pescaria em poucos cliques, com confirmação instantânea e lembretes automáticos."
  },
  {
    icon: WalletIcon,
    title: "Pagamento Seguro",
    description: "Pague com cartão ou PIX. O valor só é liberado ao guia após a experiência."
  },
  {
    icon: StarIcon,
    title: "Avaliações Reais",
    description: "Leia avaliações de outros pescadores antes de reservar sua experiência."
  },
  {
    icon: CheckCircleIcon,
    title: "Garantia GoPesca",
    description: "Reembolso total se a experiência não corresponder ao anunciado."
  },
  {
    icon: HeadsetIcon,
    title: "Suporte Dedicado",
    description: "Nossa equipe está disponível para ajudar antes, durante e depois da sua pescaria."
  }
]

export function Solution() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[#265a2e] font-semibold text-sm uppercase tracking-wide mb-3">
            A Solução
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            GoPesca: sua plataforma de pesca completa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Criamos a solução que faltava para conectar pescadores e guias de forma segura e profissional.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 basis-80 sm:basis-1/2 lg:basis-1/4 pl-4"
              >
                <Card className="border border-border/50 bg-muted/30 hover:border-[#1c4194]/30 hover:bg-[#1c4194]/5 transition-all h-full">
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1c4194]/10 flex items-center justify-center">
                        <solution.icon weight="duotone" className="w-6 h-6 text-[#1c4194]" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{solution.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {solutions.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === selectedIndex
                ? "bg-[#1c4194] w-6"
                : "bg-[#1c4194]/20 hover:bg-[#1c4194]/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
