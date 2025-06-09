import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/layout/hero-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
    </div>
  )
}