"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ShieldCheck, CalendarCheck, Star, Wallet, Headset } from "@phosphor-icons/react"

const solutions = [
  {
    icon: ShieldCheck,
    title: "Guias Verificados",
    description: "Todos os guias passam por verificação de documentos, licenças e avaliações de clientes."
  },
  {
    icon: CalendarCheck,
    title: "Reserva Online",
    description: "Agende sua pescaria em poucos cliques, com confirmação instantânea e lembretes automáticos."
  },
  {
    icon: Wallet,
    title: "Pagamento Seguro",
    description: "Pague com cartão ou PIX. O valor só é liberado ao guia após a experiência."
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Leia avaliações de outros pescadores antes de reservar sua experiência."
  },
  {
    icon: CheckCircle,
    title: "Garantia GoPesca",
    description: "Reembolso total se a experiência não corresponder ao anunciado."
  },
  {
    icon: Headset,
    title: "Suporte Dedicado",
    description: "Nossa equipe está disponível para ajudar antes, durante e depois da sua pescaria."
  }
]

export function Solution() {
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} className="border border-border/50 bg-muted/30 hover:border-[#1c4194]/30 hover:bg-[#1c4194]/5 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#1c4194]/10 flex items-center justify-center mb-4">
                  <solution.icon weight="duotone" className="w-6 h-6 text-[#1c4194]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-muted-foreground text-sm">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
