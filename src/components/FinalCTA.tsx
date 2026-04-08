import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/download";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FinalCTA() {
  const ref = useScrollReveal();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient-bg" />
      <div className="section-container relative z-10">
        <div ref={ref} className="animate-on-scroll text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black">
            Start Creating with{" "}
            <span className="gradient-text">CLYVORA</span> Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of creators who are already publishing, distributing, and monetizing their content.
          </p>
          <Button variant="glow" size="xl" onClick={handleDownload} className="text-lg px-14 py-7 h-auto">
            <Download className="size-6" />
            Download Free App
          </Button>
        </div>
      </div>
    </section>
  );
}
