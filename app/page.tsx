import type { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { HowItWorks } from "@/components/landing/how-it-works"
import { GuideCTA } from "@/components/landing/guide-cta"
import { Waitlist } from "@/components/landing/waitlist"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <GuideCTA />
      <Waitlist />
      <Footer />
    </main>
  )
}
