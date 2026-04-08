import { Brain, Server, Plug, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  { icon: Brain, title: "AI-Powered Creation", desc: "Generate, edit, and enhance content with state-of-the-art AI models" },
  { icon: Server, title: "Multi-Server Distribution", desc: "Deploy content across distributed servers for maximum reliability" },
  { icon: Plug, title: "API Integrations", desc: "Connect with your existing tools through our robust API ecosystem" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time insights into content performance and audience engagement" },
];

export function FeaturesSection() {
  const ref = useScrollReveal();

  return (
    <section id="features" className="relative">
      <div className="absolute inset-0 hero-gradient-bg" />
      <div className="section-container relative z-10">
        <div ref={ref} className="animate-on-scroll">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              One Platform.{" "}
              <span className="gradient-text">Unlimited Content.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to create, distribute, and monetize — all in one place
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card-strong p-8 space-y-4 hover:border-primary/30 transition-all duration-300">
                <Icon className="size-8 text-primary" />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
