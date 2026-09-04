import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Interest } from "@/components/Interest";
import { Pricing } from "@/components/Pricing";
import { PresenceLoop } from "@/components/PresenceLoop";
import { Security } from "@/components/Security";
import { UseCases } from "@/components/UseCases";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <UseCases />
        <PresenceLoop />
        <Pricing />
        <Security />
        <Interest />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
