import { FAQSection } from "@/src/components/home/FAQSection";
import { FeaturedProjectsSection } from "@/src/components/home/FeaturedProjectsSection";
import { FinalCTASection } from "@/src/components/home/FinalCTASection";
import { HeroSection } from "@/src/components/home/HeroSection";
import { HowItWorksSection } from "@/src/components/home/HowItWorksSection";
import { ImpactMissionSection } from "@/src/components/home/ImpactMissionSection";
import { SearchDiscoverySection } from "@/src/components/home/SearchDiscoverySection";
import { Footer } from "@/src/components/layout/Footer";
import { TrustProtectionSection } from "@/src/components/home/TrustProtectionSection";
import { UserPathSection } from "@/src/components/home/UserPathSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <UserPathSection />
      <SearchDiscoverySection />
      <FeaturedProjectsSection />
      <HowItWorksSection />
      <TrustProtectionSection />
      <ImpactMissionSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}
