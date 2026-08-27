import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { BiometricMethods } from "@/components/BiometricMethods";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Interest } from "@/components/Interest";
import { Platform } from "@/components/Platform";
import { ProcessAnimation } from "@/components/ProcessAnimation";
import { Security } from "@/components/Security";
import { Testimonials } from "@/components/Testimonials";
import { VerificationFlow } from "@/components/VerificationFlow";
import { Verticals } from "@/components/Verticals";
import { Vision } from "@/components/Vision";

export default function Home() {
  return (
    <div className="atmosphere relative min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Vision />
        <ProcessAnimation />
        <ArchitectureFlow />
        <VerificationFlow />
        <BiometricMethods />
        <HowItWorks />
        <Platform />
        <Security />
        <Verticals />
        <Testimonials />
        <Interest />
      </main>
      <Footer />
    </div>
  );
}
