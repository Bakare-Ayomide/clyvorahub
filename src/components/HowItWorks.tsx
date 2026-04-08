import { Sparkles, FileCheck, Globe, DollarSign } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { icon: Sparkles, title: "Create with AI", desc: "Use our AI tools to generate stunning content in minutes" },
  { icon: FileCheck, title: "License Your Content", desc: "Protect and manage your intellectual property effortlessly" },
  { icon: Globe, title: "Distribute Globally", desc: "Reach audiences on every platform around the world" },
  { icon: DollarSign, title: "Monetize Easily", desc: "Turn your content into revenue with flexible pricing" },
];

export function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section className="section-container">
      <div ref={ref} className="animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="text-center space-y-4 relative">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative">
                <Icon className="size-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h4 className="font-bold text-lg">{title}</h4>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
