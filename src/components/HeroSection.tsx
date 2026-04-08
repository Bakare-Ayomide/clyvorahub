import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import appMockup from "@/assets/app-mockup.png";
import { handleDownload } from "@/lib/download";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient-bg overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="section-container w-full pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              Now available for Windows
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              The Future of{" "}
              <span className="gradient-text">Publishing, Media</span>
              {" "}& Education
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              From books to apps, news to entertainment — CLYVORA powers global content creation and distribution.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="glow" size="xl" onClick={handleDownload}>
                <Download className="size-5" />
                Download Free App
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#features">
                  Explore Platform
                  <ArrowRight className="size-5" />
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>✦ 500K+ Downloads</span>
              <span>✦ Free Forever</span>
              <span>✦ AI Powered</span>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <div className="relative z-10 animate-float">
              <img
                src={appMockup}
                alt="CLYVORA desktop app interface"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
