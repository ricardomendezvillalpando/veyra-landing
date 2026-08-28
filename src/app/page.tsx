import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { Interest } from "@/components/Interest";
import { Security } from "@/components/Security";
import { SeeInAction } from "@/components/SeeInAction";
import { Testimonial } from "@/components/Testimonial";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <SeeInAction />
        <Security />
        <Testimonial />
        <Integrations />
        <Interest />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
