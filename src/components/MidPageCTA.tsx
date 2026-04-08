import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/download";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function MidPageCTA() {
  const ref = useScrollReveal();

  return (
    <section className="border-y border-border bg-secondary/20">
      <div ref={ref} className="animate-on-scroll section-container !py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black">
              Ready to start creating? <span className="gradient-text">It's free.</span>
            </h3>
            <p className="text-muted-foreground max-w-md">
              Download CLYVORA and unlock AI-powered content creation, licensing, and distribution — all in one app.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="glow" size="xl" onClick={handleDownload}>
              <Download className="size-5" />
              Download Free App
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#features">
                Learn More
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
