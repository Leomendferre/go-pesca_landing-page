"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MagnifyingGlassIcon, CreditCardIcon, ShieldWarningIcon, QuestionIcon } from "@phosphor-icons/react"

const problems = [
  {
    icon: MagnifyingGlassIcon,
    title: "Difícil encontrar guias",
    description: "Pesquisar em grupos de WhatsApp e redes sociais é trabalhoso e pouco confiável."
  },
  {
    icon: CreditCardIcon,
    title: "Pagamentos inseguros",
    description: "Transferências via PIX sem garantias deixam você vulnerável a golpes."
  },
  {
    icon: ShieldWarningIcon,
    title: "Sem verificação",
    description: "Como saber se o guia é experiente e possui as licenças necessárias?"
  },
  {
    icon: QuestionIcon,
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
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ed6c21]/10 flex items-center justify-center">
                    <problem.icon weight="duotone" className="w-6 h-6 text-[#ed6c21]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{problem.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
