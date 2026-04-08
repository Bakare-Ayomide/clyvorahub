import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { DownloadHighlight } from "@/components/DownloadHighlight";
import { DownloadGuide } from "@/components/DownloadGuide";
import { AboutSection } from "@/components/AboutSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CLYVORA — Publishing Knowledge. Powering Media. Inspiring Innovation." },
      { name: "description", content: "CLYVORA is a unified ecosystem for publishing, licensing, distributing, and monetizing educational content, media, and technology products." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <DownloadHighlight />
      <DownloadGuide />
      <AboutSection />
      <ServicesGrid />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
