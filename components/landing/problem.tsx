"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MagnifyingGlass, CreditCard, ShieldWarning, Question } from "@phosphor-icons/react"

const problems = [
  {
    icon: MagnifyingGlass,
    title: "Difícil encontrar guias",
    description: "Pesquisar em grupos de WhatsApp e redes sociais é trabalhoso e pouco confiável."
  },
  {
    icon: CreditCard,
    title: "Pagamentos inseguros",
    description: "Transferências via PIX sem garantias deixam você vulnerável a golpes."
  },
  {
    icon: ShieldWarning,
    title: "Sem verificação",
    description: "Como saber se o guia é experiente e possui as licenças necessárias?"
  },
  {
    icon: Question,
    title: "Falta de informação",
    description: "Destinos, espécies, equipamentos... muitas dúvidas e poucas respostas claras."
  }
]

export function Problem() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[#d9853c] font-semibold text-sm uppercase tracking-wide mb-3">
            O Problema
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Planejar uma pescaria não deveria ser tão difícil
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Pescadores enfrentam diversos obstáculos para encontrar experiências de qualidade no Brasil.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#ed6c21]/10 flex items-center justify-center mb-4">
                  <problem.icon weight="duotone" className="w-6 h-6 text-[#ed6c21]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
