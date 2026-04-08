import { Download, Shield, DollarSign, Sparkles, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/download";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function DownloadHighlight() {
  const ref = useScrollReveal();

  return (
    <section id="download" className="relative">
      <div className="section-container">
        <div ref={ref} className="animate-on-scroll glass-card-strong p-10 md:p-16 text-center relative overflow-hidden">
          {/* Background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold">
              <Zap className="size-4" />
              Free Forever — No Credit Card Required
            </div>

            <h2 className="text-3xl md:text-5xl font-black">
              Create, License & Download with AI —{" "}
              <span className="gradient-text">For Free</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our desktop app lets you create content, manage licenses, and download media using AI-powered tools. Join 500,000+ creators already using CLYVORA.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Button variant="glow" size="xl" onClick={handleDownload} className="text-lg px-14 py-7 h-auto animate-glow-pulse">
                <Download className="size-6" />
                Download for Windows — Free
              </Button>
              <p className="text-sm text-muted-foreground">v1.0 • Windows 10/11 • Free • 85MB • No signup required</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {[
                { icon: Shield, text: "100% Safe & Secure" },
                { icon: DollarSign, text: "No hidden fees ever" },
                { icon: Sparkles, text: "Built for creators" },
                { icon: CheckCircle, text: "500K+ downloads" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="size-3.5 text-primary" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
