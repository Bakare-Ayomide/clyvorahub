import { Globe, Zap, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section-container">
      <div ref={ref} className="animate-on-scroll grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            One Ecosystem.{" "}
            <span className="gradient-text">Infinite Possibilities.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            CLYVORA is a unified ecosystem for publishing books, media, apps, music, and news. Built for scalability, designed for global reach, and powered by innovation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're an author, developer, educator, or media company — CLYVORA gives you the tools to create, license, distribute, and monetize your content across every platform.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            { icon: Globe, title: "Global Reach", desc: "Distribute content to audiences worldwide with multi-language support" },
            { icon: Zap, title: "AI-Powered", desc: "Leverage cutting-edge AI for content creation and optimization" },
            { icon: Layers, title: "All-in-One", desc: "Publishing, licensing, distribution, and monetization in one platform" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-6 flex gap-4 items-start hover:border-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
