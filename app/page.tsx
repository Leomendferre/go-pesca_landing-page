import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { GuideCTA } from "@/components/landing/guide-cta"
import { Waitlist } from "@/components/landing/waitlist"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <section id="problema">
        <Problem />
      </section>
      <section id="solucao">
        <Solution />
      </section>
      <section id="guias">
        <GuideCTA />
      </section>
      <Waitlist />
      <Footer />
    </main>
  )
}
