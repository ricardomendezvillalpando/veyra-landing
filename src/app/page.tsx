import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Interest } from "@/components/Interest";
import { Compliance } from "@/components/Compliance";
import { Pricing } from "@/components/Pricing";
import { PresenceLoop } from "@/components/PresenceLoop";
import { Security } from "@/components/Security";
import { SeeInAction } from "@/components/SeeInAction";
import { UseCases } from "@/components/UseCases";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <SeeInAction />
        <UseCases />
        <PresenceLoop />
        <Pricing />
        <Security />
        <Interest />
        <Compliance />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
