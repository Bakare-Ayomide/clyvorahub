import { Download, Shield, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/download";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function DownloadHighlight() {
  const ref = useScrollReveal();

  return (
    <section id="download" className="relative">
      <div className="section-container">
        <div ref={ref} className="animate-on-scroll glass-card-strong p-10 md:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black">
              Create, License & Download with AI —{" "}
              <span className="gradient-text">For Free</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our desktop app lets you create content, manage licenses, and download media using AI-powered tools.
            </p>

            <Button variant="glow" size="xl" onClick={handleDownload} className="text-lg px-12 py-6 h-auto">
              <Download className="size-6" />
              Download for Windows
            </Button>

            <p className="text-sm text-muted-foreground">v1.0 • Windows • Free • 85MB</p>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {[
                { icon: Shield, text: "Secure & Safe" },
                { icon: DollarSign, text: "No hidden fees" },
                { icon: Sparkles, text: "Built for creators" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4 text-primary" />
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
